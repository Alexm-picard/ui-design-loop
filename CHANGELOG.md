# Changelog

## 1.2.0 (2026-10-10)

- `STITCH_API_KEY` set in your shell now wins; the env files (`<project>/.ui-design-loop.env`, then
  `~/.config/ui-design-loop/.env`) are the fallback.
- The secret scan also recognises Stitch-style `AQ.` keys.

## 1.1.0 (2026-10-10)

- The Stitch API key now comes from an env file, `~/.config/ui-design-loop/.env` or a project's
  `.ui-design-loop.env`, read by `scripts/stitch-headers.mjs` (the server's `headersHelper`), instead
  of a shell variable. `.env.example` lists every setting.
- Sign-in credentials for screenshots can live in the same env file.

## 1.0.0 (2026-10-10)

- First release: the `/design` loop (Claude + Stitch proposals, synthesis spec, approval gate, code,
  Playwright verification, multi-skill critique, lock challenges), `/design-init`, the design-profile
  template, and a filled-in example profile.
