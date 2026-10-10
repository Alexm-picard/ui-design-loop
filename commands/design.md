---
description: Run the multi-model UI design loop (Claude + Stitch → synthesis spec → code → Playwright) for one screen
argument-hint: <screen-name> (e.g. "dashboard", "settings", "checkout")
---

Run the UI design loop for the screen:

$ARGUMENTS

First read `.claude/design-profile.md`. If it is missing, stop and tell me to run `/design-init`.

The playbook is the `ui-design-loop` agent (`ui-design-loop:ui-design-loop`). A subagent cannot stop to ask me questions, so this main session drives the phases that need me and hands the rest to the agent:

1. **Phase 0 + 1 (agent):** invoke the `ui-design-loop` agent with "Phases 0 and 1 only for <screen>: return the Stitch project and design-system ids, the Claude proposal, the Stitch proposal, and the cliche flags." Present both proposals to me side by side.
2. **Phase 2 (here):** score both through the design skills that are installed (`ui-ux-pro-max`, `design-taste-frontend`, `emil-design-eng`; say which were missing) in a short table, ask me which elements I like from each and which flagged patterns to drop, then write the synthesis spec: tokens by name, spacing, type scale, component tree, the data it reads, the existing components it reuses, states and responsive behaviour.
3. **Phase 3 (here):** show me the spec and wait for an explicit "approve". No code before that.
4. **Phase 4 + 5 (agent):** invoke the agent again with the approved spec pasted in full and "Phases 4 and 5 only". It builds the screen under the profile's stack rules, runs the profile's test, lint and format commands, then verifies with Playwright at the profile's widths, with at most 3 self-critique iterations.
5. **Phase 6 (here):** if any skill dissented from a lock in the profile, weigh it: weak dissent is recorded and the lock holds; strong dissent gets 2–3 alternatives, a recommendation, and a choice for me. Never change the code under a lock challenge without my say-so.

If the agent can't be invoked, run every phase here in the main session, following the playbook step by step.

Do not skip the approval gate. Do not claim success without Playwright screenshots. Do not create branches or commits unless the profile allows it.
