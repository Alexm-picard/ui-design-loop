# Design profile: <Product name>

<!--
Copy to .claude/design-profile.md in your repository (or run /design-init to draft it).
The ui-design-loop reads this file before every run and treats it as binding.
Never put real passwords or API keys here: name the environment variables to read instead.
-->

## Product

<!-- One paragraph: what the product is, who uses it, what the main screens are for. -->

## Stack

- Framework and version:
- Router:
- Language (and type rules):
- Styling (global stylesheet, CSS modules, Tailwind, a component library…):
- Where pages live:
- Where shared components live:
- How a new route is registered:
- How a nav entry is added:

## Design identity and tokens

- Identity in one line:
- Where tokens live (file and block):
- Typefaces and their roles:
- Palette (token names and what each is for):
- Radii, shadows, spacing scale:
- Theme (light only, dark, both):
- Signature element (the one bold thing), if any:

## Locks

<!-- Deliberate decisions the loop defends. "Mechanical" locks are never relaxed. -->

| Lock | Kind | Skills likely to dissent | Default stance |
| --- | --- | --- | --- |
| No hex codes outside the token block | mechanical | none | Never relaxed |
| | | | |

## Reusable components

<!-- Components to reuse before inventing new ones, one line each on what they are for. -->

## Data and state

- How reads happen (hooks, loaders, a query library…):
- How writes happen and how the screen refreshes afterwards:
- Where API calls live:
- Loading / empty / error / notice conventions:

## Tests and checks

- Test framework and where component tests live:
- Mocking approach (MSW, fixtures…):
- Commands that must pass (tests, lint, format, type-check), and the directory to run them from:

## Running the app and signing in

- Start command(s) and URLs:
- Seed or demo data:
- Sign-in: <!-- e.g. "read DESIGN_LOOP_EMAIL / DESIGN_LOOP_PASSWORD", or "see README → Demo accounts" -->
- Roles whose views differ, and how to sign in as each:
- Gotchas (rate limits, services that need restarting…):

## Screens and roles

<!-- The routes the loop may be asked about, and which roles can see each. -->

## Breakpoints and widths

- Breakpoints in the stylesheet:
- Widths to screenshot (default 1280, 768, 375):

## Conventions

- File headers or attribution comments:
- Accessibility requirements (WCAG level, specific rules):
- Copy and tone:
- Git: <!-- default: the loop never creates branches or commits -->

## Decision process

<!-- How a lock is formally reconsidered: a ticket, a team vote, an ADR… -->
