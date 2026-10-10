#!/usr/bin/env node
// Claude Code runs this as the Stitch MCP server's `headersHelper`: it prints the request headers as
// JSON. The API key is never stored in the plugin itself. It is looked for, in order:
//
//   1. STITCH_API_KEY in the shell environment Claude Code was started from
//   2. <your project>/.ui-design-loop.env      (per-project; keep it out of git)
//   3. ~/.config/ui-design-loop/.env           (one key for every project)
//
// The first non-empty value wins. With no key it prints {} and Stitch answers 401, which the loop
// treats as "Stitch unavailable" and carries on with two Claude proposals.
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

// A shell variable wins; the env files are the fallback.
let key = (process.env.STITCH_API_KEY ?? '').trim();
for (const file of key ? [] : candidates) {
  if (!existsSync(file)) continue;
  key = parse(readFileSync(file, 'utf8')).STITCH_API_KEY ?? '';
  if (key) break;
}

process.stdout.write(JSON.stringify(key ? { 'X-Goog-Api-Key': key } : {}));
