# ui-design-loop

A [Claude Code](https://claude.com/claude-code) plugin that redesigns a web app one screen at a time,
with two models and a human in the loop:

1. **Two proposals.** Claude writes one design for the screen; [Google Stitch](https://stitch.withgoogle.com)
   (Gemini) draws another, using your project's own tokens.
2. **You pick.** You choose what you like from each, and Claude writes a synthesis spec.
3. **Approval gate.** No code is written until you say "approve".
4. **Code in your stack.** Built with your framework, styling and data-fetching rules, with tests,
   lint and formatting passing.
5. **Proof.** Playwright screenshots at desktop, tablet and phone widths, a console-error check, a
   no-sideways-scroll check, and a critique through several design skills (execution quality, an
   AI-cliché audit, taste, worst-case data) before anything is called done.

Your project's design decisions ("locks": fonts, palette, theme, no component library…) are
defended. When the design skills disagree with one, the loop doesn't quietly change it: it brings you
the disagreement with alternatives and lets you decide.

## Install

```text
/plugin marketplace add Alexm-picard/ui-design-loop
/plugin install ui-design-loop@ui-design-loop
```

### Stitch API key (an env file)

Create an API key in your Stitch account settings at <https://stitch.withgoogle.com>, then put it in
an env file. The plugin reads it from there, so nothing goes in your shell profile or in a
repository:

```sh
mkdir -p ~/.config/ui-design-loop
cp .env.example ~/.config/ui-design-loop/.env     # or create it by hand
chmod 600 ~/.config/ui-design-loop/.env
```

```dotenv
# ~/.config/ui-design-loop/.env
STITCH_API_KEY=your-key-here
```

That file serves every project. To use a different key in one project, put a
`.ui-design-loop.env` file at that project's root instead (and add it to that project's
`.gitignore`); it takes precedence. [`.env.example`](.env.example) lists every setting.

Restart Claude Code, then check `/mcp`: `stitch` and `playwright` should be connected. Without a key
the loop still runs: it says Stitch is unavailable and writes a second, deliberately different Claude
proposal instead.

### Optional design skills

The loop uses these when installed and falls back to written principles when not. The more you
install, the more independent opinions it weighs:

```sh
npx skills@latest add nextlevelbuilder/ui-ux-pro-max-skill   # ui-ux-pro-max: design strategy
npx skills@latest add Leonxlnx/taste-skill                   # design-taste-frontend: anti-generic taste
npx skills@latest add anthropics/skills                      # pick frontend-design
npx skills@latest add pbakaus/impeccable                     # impeccable: AI-cliché audit
npx skills@latest add emilkowalski/skills                    # emil-design-eng, break-ui, review-animations, find-animation-opportunities
```

When an installer asks which skills to add from a multi-skill repo, pick the ones in the comment.

## Use it

**1. Describe your project once.** In your repository:

```text
/design-init
```

Claude reads your codebase and drafts `.claude/design-profile.md`: your stack, where tokens live,
your design identity and locks, reusable components, how data is fetched, which test and lint
commands must pass, how to run the app and sign in, breakpoints, and conventions. It marks anything
it couldn't find as `TODO:` for you. You can also copy [`templates/design-profile.md`](templates/design-profile.md)
and fill it in by hand; [`examples/safedrop-design-profile.md`](examples/safedrop-design-profile.md)
is a complete one.

Never put real passwords in the profile. Put a sign-in account in the same env file
(`DESIGN_LOOP_EMAIL`, `DESIGN_LOOP_PASSWORD`) and have the profile point there.

**2. Start your app**, then run the loop on a screen:

```text
/design settings
```

You'll get both proposals side by side, a scoring table, a spec to approve, the implementation, and
screenshots with the critique.

## What's in the repo

| Path | What it is |
| --- | --- |
| `commands/design.md` | `/design <screen>`: drives the loop and the steps that need you |
| `commands/design-init.md` | `/design-init`: drafts your project's design profile |
| `agents/ui-design-loop.md` | The playbook: phases, skill lenses, how locks are challenged, hard rules |
| `templates/design-profile.md` | The profile template |
| `examples/safedrop-design-profile.md` | A filled-in profile for a real project |
| `.mcp.json` | The Stitch and Playwright MCP servers the loop drives |
| `scripts/stitch-headers.mjs` | Reads the Stitch key from your env file for each request |
| `.env.example` | Every setting the env file can hold |
| `.claude-plugin/` | Plugin and marketplace manifests |

## Hard rules the loop follows

- It never skips the approval gate.
- It never claims success without Playwright screenshots.
- It never breaks your profile's mechanical rules (token discipline, data-fetching boundaries,
  security), whatever a skill says.
- It never changes code over a disagreement with one of your locks without your say-so.
- By default it never creates branches or commits.

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| Stitch tools fail with 401 or 403 | No key found. Check `~/.config/ui-design-loop/.env` (or the project's `.ui-design-loop.env`) has a `STITCH_API_KEY=` line, then restart Claude Code. |
| Stitch fails to start at all | The key helper needs Node.js on your `PATH` (`node --version`). |
| Stitch takes minutes | That's normal for Stitch. The loop polls instead of retrying, for up to about five minutes. |
| Playwright can't find a browser | Run `npx playwright install chromium` once. |
| Two `stitch` or `playwright` servers in `/mcp` | You also configured them yourself. Either works; disable one in `/mcp` if you like. |
| "No design profile" | Run `/design-init` in the repository first. |
| `/design` clashes with another command | Use `/ui-design-loop:design`. |

## Updating

```text
/plugin marketplace update ui-design-loop
```

## License

[MIT](LICENSE)
