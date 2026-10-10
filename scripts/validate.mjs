// Checks the plugin before it ships: manifests parse and agree, every agent and command has front
// matter with a description, and nothing that looks like a secret is committed.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const errors = [];
const json = (path) => {
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch (err) {
    errors.push(`${path}: ${err.message}`);
    return {};
  }
};

const plugin = json('.claude-plugin/plugin.json');
const market = json('.claude-plugin/marketplace.json');
json('.mcp.json');
if (!/^\d+\.\d+\.\d+$/.test(plugin.version ?? '')) errors.push('plugin.json: version must be semver');
if (!market.plugins?.some((p) => p.name === plugin.name)) {
  errors.push('marketplace.json does not list the plugin named in plugin.json');
}

for (const dir of ['agents', 'commands']) {
  for (const file of readdirSync(dir).filter((f) => f.endsWith('.md'))) {
    const text = readFileSync(join(dir, file), 'utf8');
    const front = text.match(/^---\n([\s\S]*?)\n---\n/);
    if (!front) errors.push(`${dir}/${file}: missing front matter`);
    else if (!/^description:\s*\S/m.test(front[1])) errors.push(`${dir}/${file}: no description`);
    if (dir === 'agents' && front && !/^name:\s*\S/m.test(front[1])) errors.push(`${dir}/${file}: no name`);
  }
}

const SECRET = /(AIza[0-9A-Za-z_-]{30,}|AQ\.[0-9A-Za-z_-]{30,}|sk-[A-Za-z0-9]{20,}|ghp_[A-Za-z0-9]{30,}|-----BEGIN [A-Z ]*PRIVATE KEY-----)/;
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    if (name === '.git' || name === 'node_modules') continue;
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (SECRET.test(readFileSync(path, 'utf8'))) errors.push(`${path}: looks like it contains a secret`);
  }
};
walk('.');

if (errors.length) {
  console.error(errors.map((e) => `✗ ${e}`).join('\n'));
  process.exit(1);
}
console.log('✓ manifests, front matter and secret scan all pass');
