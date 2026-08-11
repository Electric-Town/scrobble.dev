# Knowledge-first release QA

Date: 11 August 2026  
Scope: homepage, Learn, Build, Draft profiles, Projects, FAQ, Contribute and Floppy  
Status: release candidate

This is a role-based review, not a claim that named public figures participated in or endorsed the site.

## Outcome

The release candidate passes the knowledge, interaction, accessibility and machine-surface gates. One medium design defect was found and fixed: single-column articles reserved an empty desktop sidebar. They now use a centred 78-character reading measure.

The design-review score moved from 99 to 100 after that correction. The functional QA score is 100 for the tested scope. Automated checks do not replace assistive-technology testing.

## Browser evidence

- Eight representative routes returned without console errors at mobile, tablet and desktop widths.
- The native mobile menu opened and navigated to Build.
- Project search, media filtering, URL-backed state, sorting, result counts, live announcements and Reset all behaved as labelled.
- The project table retained a keyboard-focusable horizontal scroll region at small widths.
- All 23 discovered internal links returned a successful response.
- The eight required external destinations for Scrobble.dev, Floppy, FloppyDesktop, OKF and sponsors returned successful responses when checked.
- At 320 CSS pixels, including WCAG text-spacing overrides, tested pages had no global horizontal overflow. Wide tables remained contained in their labelled scroll regions.
- Axe-core 4.13.0 reported zero WCAG A/AA violations on eight representative routes.
- Reduced-motion CSS removes the only smooth-scroll behaviour. The interface has no essential animation.

## Panel convergence

### Red team and blue team

The red team challenged unsupported authority, stale project facts, scope leakage, duplicated machine copy and a production state that could drift from GitHub. The blue-team controls are explicit unknown states, checked dates, a pinned OKF validator, one project registry, a generated-output scope guard, a release fingerprint and scheduled drift detection.

### 50 role and user lenses

The final contract was tested through researcher, maintainer, tracker user, implementer, metadata, governance, security, privacy, accessibility, localization, mobile and first-visit lenses. The earlier blockers were resolved by five primary destinations, five homepage bands, progressive disclosure for secondary catalogue filters, literal labels, stable breadcrumbs and contextual contribution links.

### Journalism and AI-slop review

The narrator is Scrobble.dev as a maintained field guide. Project claims are attributed to project sources; proposals are labelled as proposals; unknowns remain visible. The public copy avoids invisible-expert claims, generic slogans, repeated card grids, marketing superlatives, fake consensus and decorative motion.

### Frontier review

Human HTML, catalogue JSON, CSV, OKF Markdown and JSON-LD use one project registry. Machine-readable surfaces do not outrank visible evidence. The release fingerprint makes deployment provenance inspectable without granting production write access to GitHub.

### ADHD and AuDHD review

The direct answer appears first. Each page keeps one reading path, no more than five primary choices, visible current context, predictable controls and 44-pixel targets. Optional catalogue depth uses one labelled disclosure; definitions, safety boundaries and conclusions remain visible.

## Principle review

- Nielsen: system status, real-world language, user control, consistency, error prevention, recognition, efficient filtering, minimalism, recovery and contextual help are present.
- Gestalt: proximity, common region, continuation and hierarchy group related tasks without turning each fact into a card.
- WCAG: semantic landmarks, headings, native controls, visible focus, visited-link distinction, labelled scroll regions, non-colour state and reflow checks are present.
- Editorial consistency: status, checked dates, sources, contribution routes and proposal labels use the same vocabulary across human and machine views.

## Automated release gates

- Astro: 28 files, zero errors, warnings or hints.
- Repository tests: 19 passed.
- OKF v0.2: 11 Markdown files validated against pinned revision `374e0bc4c644310ff56cdf9c0fe81eccdec862b0`.
- Public scope guard: passed.
- Sites worker: 32 files exposed across 42 routes and verified by a runnable worker test.
