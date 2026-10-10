#!/usr/bin/env node
// Claude Code runs this as the Stitch MCP server's `headersHelper`: it prints the request headers as
// JSON. The API key comes from an env file, never from the plugin itself:
//
//   1. <your project>/.ui-design-loop.env      (per-project override; keep it out of git)
//   2. ~/.config/ui-design-loop/.env           (one key for every project)
//
// The first file that sets STITCH_API_KEY wins. With no key it prints {} and Stitch answers 401,
// which the loop treats as "Stitch unavailable" and carries on with two Claude proposals.
import { existsSync, readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const candidates = [
  process.env.CLAUDE_PROJECT_DIR && join(process.env.CLAUDE_PROJECT_DIR, '.ui-design-loop.env'),
  join(process.cwd(), '.ui-design-loop.env'),
  join(homedir(), '.config', 'ui-design-loop', '.env'),
].filter(Boolean);

/** Read KEY=value lines; ignores blanks and # comments, strips matching quotes. */
function parse(text) {
  const out = {};
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const match = line.match(/^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/);
    if (!match) continue;
    let value = match[2].trim();
    if (/^(['"]).*\1$/.test(value)) value = value.slice(1, -1);
    out[match[1]] = value;
  }
  return out;
}

let key = '';
for (const file of candidates) {
  if (!existsSync(file)) continue;
  key = parse(readFileSync(file, 'utf8')).STITCH_API_KEY ?? '';
  if (key) break;
}

process.stdout.write(JSON.stringify(key ? { 'X-Goog-Api-Key': key } : {}));
