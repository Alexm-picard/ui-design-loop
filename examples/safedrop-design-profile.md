# Design profile: SafeDrop

<!-- A filled-in example: the profile for SafeDrop, a course project (BU CS673, Team 3) that this
loop redesigned end to end. Demo credentials are deliberately left out. -->

## Product

SafeDrop is a multi-tenant equipment checkout service. Organisations (universities, labs,
departments) lend physical equipment to their members through a catalogue, requests, approvals,
pickup and return, with an audit log. Three roles: Member, Approver, Organization admin.

## Stack

- Framework and version: React 19 + Vite 8
- Router: React Router 7 (imports from `react-router`); routes in `src/router.jsx`, paths in `ROUTES` in `src/utils/constants.js`, guarded by `RequireRole`
- Language: plain JavaScript (JSX), no TypeScript; shapes as JSDoc typedefs in `src/types/api.js`
- Styling: no component library; class names over one global stylesheet, `code/frontend/src/index.css`
- Pages: `code/frontend/src/pages`; shared components: `code/frontend/src/components`
- Nav entries: `src/components/Layout.jsx` (rail) and `src/components/CommandPalette.jsx` (⌘K list)

## Design identity and tokens

- Identity: "Pegboard Daylight": a periwinkle pegboard side rail and board surfaces, white cards, one cobalt accent
- Tokens: the `:root` block of `src/index.css`: `--board`, `--pegs`, `--bg`, `--surface`, `--surface-2`, `--text`, `--text-2`, `--muted`, `--border`, `--border-board`, `--border-strong`, `--accent` (cobalt), `--accent-hover`, `--accent-soft`, semantic pairs `--ok`/`--warn`/`--danger`/`--info`/`--neutral` each with `-bg`
- Typefaces: Bricolage Grotesque (headings, big numbers), Instrument Sans (everything else), self-hosted via `@fontsource-variable`; monospace only for asset tags and ids
- Radii 12 / 20 / 22 px and pills; `--shadow` is a card hung on the board; spacing `--space-1…8`
- Light theme only
- Signature: the pegboard texture (side rail, board columns, panel headers)

## Locks

| Lock | Kind | Skills likely to dissent | Default stance |
| --- | --- | --- | --- |
| No hex codes outside `:root` in `index.css` | mechanical | none | Never relaxed |
| Server state only through `useApiResource` hooks and `src/services/*.api.js` | mechanical | none | Never relaxed |
| Request actions come from `actionsFor()` in `src/utils/requestState.js` | mechanical | none | Never relaxed |
| Two typefaces, self-hosted, no font CDN | design | frontend-design, taste-skill | Holds |
| The pegboard is the one bold element; one accent colour | design | frontend-design, taste-skill | Holds; new boldness goes into the pegboard motif |
| Light theme only | design | taste-skill | Holds (dark mode is a team decision) |
| No component library | design | pick-ui-library | Holds |
| Validation is the server's answer (`noValidate`, `fieldErrorsOf`) | design | impeccable | Holds; inline hints are fine |
| One notice live region per page; content stays on screen while reloading | accessibility | none | Holds |

## Reusable components

`AssetCard` (catalogue card), `RequestBoard` (requests by stage), `LoanTimeline`, `Drawer` (side
panel for secondary forms), `Avatar`, `DataTable`, `FormField`, `ConfirmAction`, `StatusBadge`,
`DueBadge`, `RestrictedBadge`, `LoadingState`, `ErrorState`, `Pagination`, `CommandPalette`.

## Data and state

- Reads: a `use…` hook in `src/hooks` built on `useApiResource(fetcher)`, fetcher in `useCallback`
- Writes: call the `*.api.js` function, then `reload()`
- Never `fetch` in a component; ESLint enforces `fetch` only in `src/services/`
- Every page renders `LoadingState`, `ErrorState`, an explicit empty message and one notice region (`role="status"` / `role="alert"`)
- Request dates display with `formatDateOnly` from `src/utils/format.js`

## Tests and checks

- Vitest + Testing Library + MSW; component tests in `code/frontend/tests/unit/components`, rendered with `renderWithAuth`; mocks in `tests/mocks/handlers.js`
- From `code/frontend`: `npx vitest run`, `npx eslint src tests`, `npx prettier --check src tests`

## Running the app and signing in

- `docker compose up` from the repo root (app on :5173, API on :4000); after a dependency change `docker compose up -d --build -V frontend`; after backend changes `docker compose restart backend`
- Demo data: `npm run seed` in `code/backend`
- Sign-in: organisation `org-a`; accounts and password are in the project's seed script. Quickest from a script: `POST /api/auth/login` with `{ orgSlug, email, password }` and an `Origin` header
- Roles: member, approver, admin accounts; check each role whose view differs
- Gotcha: the auth rate limiter allows 20 sign-ins per 15 minutes; `docker compose restart backend` resets it

## Screens and roles

Catalog, asset detail, my requests, request detail (all roles); requests board (approver, admin);
overview, users, groups, group detail, audit log, settings, new/edit asset (admin).

## Breakpoints and widths

- Breakpoints: 30rem, 40rem, 61.25rem (the rail becomes a bottom tab bar), 64rem
- Widths: 1280, 768, 375

## Conventions

- Every new file starts with the team's `AI-USAGE SUMMARY` header; edited files extend their "AI-Assisted Areas" line
- WCAG AA; hover styles only under `(hover: hover) and (pointer: fine)`; 44 px touch targets; every drag has a keyboard control that does the same
- Git: the loop never creates branches or commits

## Decision process

A lock is reconsidered through a Jira ticket the team ratifies, never inside one PR.
