---
description: Draft this project's .claude/design-profile.md for the UI design loop by reading the codebase
argument-hint: (optional) path to the frontend, e.g. "apps/web"
---

Create `.claude/design-profile.md` for this repository so the `ui-design-loop` can work on it.

Frontend location hint: $ARGUMENTS

1. If `.claude/design-profile.md` already exists, show me what you would change and wait for my go-ahead before rewriting it.
2. Read the codebase to fill in the template's sections (the template is the plugin's `templates/design-profile.md`; its section headings are repeated below). Look at the package manifest, the framework and router, the global stylesheet or theme file and its tokens, the component folder, how data is fetched and mutated, the test setup and its commands, lint and format configs, any README or docs that explain how to run the app and sign in, and existing file-header or comment conventions.
3. Write only what the code or docs show. Where you could not find something (credentials, team decision process, locks nobody has written down), leave a clear `TODO:` for me rather than guessing.
4. **Never write a real password or API key into the profile.** For sign-in, name the environment variables to read (for example `DESIGN_LOOP_EMAIL` / `DESIGN_LOOP_PASSWORD`), or point to where demo credentials are documented.
5. Propose 4–8 **locks**: the design decisions already visible in the code (typefaces, palette, theme, component library or none, validation approach, accessibility rules) with a default stance for each. Mark the purely mechanical ones (token discipline, data-fetching boundaries, security, typing) as mechanical.
6. Show me the draft and list every `TODO:`. Save it once I approve.

Sections to fill: Product · Stack · Design identity and tokens · Locks · Reusable components · Data and state · Tests and checks · Running the app and signing in · Screens and roles · Breakpoints and widths · Conventions · Decision process.
