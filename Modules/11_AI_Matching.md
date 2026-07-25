# Module: AI Matching

## 1. Purpose

Implementation-level detail for the ranking system introduced in
`Product/04_AI_Matching_Engine.md`. Produces the Match Score and factor
explanations used throughout Search and Invitations.

## 2. Actors

Consumed by University Officer / Loan Officer / Consultant (via Search
results) and by Student (via "why was I invited" / future "recommended for
you"). Configured by Super Admin.

## 3. Inputs & recalculation triggers

- Recalculated on a scheduled batch (default: daily) for the full active
  pool.
- Recalculated on-demand when a student edits a scoring-relevant field:
  academic record, test scores, preferences (country/course/degree/intake),
  or financial/budget info.
- Institution-side criteria changes (e.g., University updates admission
  criteria) trigger recalculation of that org's scores against the pool on
  the next scheduled batch (not instantly, to control compute cost).

## 4. Scoring approach (product-level contract; algorithm is an implementation detail)

Score = weighted combination of factor sub-scores, each 0–100, combined per
match type:

**Student ↔ University**
| Factor | Default weight |
|---|---|
| Academic fit (grades/curriculum vs. admission criteria) | 35% |
| Test score fit | 20% |
| Course/major alignment | 20% |
| Country/intake alignment | 15% |
| Budget/scholarship fit | 10% |

**Student ↔ Loan Provider**
| Factor | Default weight |
|---|---|
| Financial need/eligibility signal fit | 40% |
| Admission status (has offer / pending / none) | 25% |
| Country eligibility fit | 20% |
| Guarantor completeness | 15% |

**Student ↔ Consultant**
| Factor | Default weight |
|---|---|
| Stated guidance need vs. consultant specialization | 40% |
| Country/course specialization overlap | 35% |
| Language/communication fit | 15% |
| Budget fit for service tier | 10% |

Weights are configurable by Super Admin (`Modules/12_Settings.md`) without a
deployment. A score below the configured floor (default 40) is not surfaced.

## 5. Feedback loop

- Officer actions (invite / skip / reject-from-shortlist) and student actions
  (accept / reject / ignore) are logged as feedback signals.
- Feedback is used to periodically recalibrate factor weights (Super
  Admin-reviewed, not fully automatic in v1 — a human approves weight
  changes suggested by the feedback analysis).

## 6. Business rules

- AI Matching never makes an accept/reject/admission decision itself — it
  only ranks and explains (`Product/04_AI_Matching_Engine.md` §5).
- Scores and factors must never rely on legally protected attributes beyond
  what's inherently required for visa/country eligibility
  (`Product/04_AI_Matching_Engine.md` §6).
- A student below the profile completion threshold is excluded from matching
  entirely, regardless of score (`Product/02_Business_Rules.md` rule #4).

## 7. Permissions

Institution officers see scores + factors only for students returned in
their own search results. Students see scores/factors only for institutions
that have actually invited them (not a general "browse your score against
everyone" feature in v1). Super Admin: full configuration access.

## 8. Database tables

`match_scores`, `match_score_factors`, `matching_config`,
`matching_feedback_events`. See `Database/Tables.md`.

## 9. APIs

Scores are returned embedded in Search results (`API/University.md`,
`API/Education_Loan.md`, `API/Consultant.md`); configuration endpoints under
`API/Admin.md`.

## 10. Notifications

None directly; scores feed into Search result display and (future) proactive
match digest notifications (`Modules/08_Notifications.md`).

## 11. Edge cases

- A brand-new student profile has too few filled fields to score reliably →
  treated as below the floor by default rather than given an artificially
  neutral score, to avoid misleading institutions.
- Institution's admission criteria are left mostly blank → falls back to
  platform-wide default criteria for that course/degree level rather than
  scoring everyone as a poor fit.

## 12. Future scope

- Proactive "recommended for you" surfacing for students before any
  invitation exists.
- Explainability drill-down UI (per-factor breakdown, not just top-line
  factors list).
- Org-specific custom weighting (Enterprise tier).
