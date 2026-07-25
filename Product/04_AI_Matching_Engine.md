# AI Matching Engine (Product-Level)

> Implementation-level detail lives in `Modules/11_AI_Matching.md`. This file
> covers the product intent, inputs, and business configuration.

## 1. Purpose

Reduce search effort on both sides of the marketplace by ranking:
- **For institutions**: which students in the pool are the best fit for a
  given program / loan product / consulting specialization.
- **For students**: which incoming invitations are most worth their
  attention, and (in a later phase) proactive "you might be eligible for..."
  suggestions before an institution even searches.

## 2. Inputs by match type

### Student ↔ University
- Academic record (grades, curriculum, standardized test scores)
- Target course/major and degree level
- Target country/region preference
- Budget band and scholarship need
- University's admission criteria, available seats/programs, historical
  admit profile

### Student ↔ Loan Provider
- Financial profile (declared budget need, co-applicant/guarantor info)
- Admission status (accepted/pending/none)
- Target country (affects loan product eligibility)
- Loan provider's risk criteria and product eligibility rules

### Student ↔ Consultant
- Target country/course
- Stated need for guidance (SOP help, visa help, full-service)
- Consultant's specialization (regions, service tiers, languages)

## 3. Output

A **Match Score** (0–100) plus a small set of human-readable **factors**
(e.g., "Strong academic fit," "Budget within scholarship range," "Country
specialization match") shown to the institution alongside the score — never a
black-box number alone. See `Modules/11_AI_Matching.md` for the scoring
breakdown and `Modules/06_Search.md` for how scores surface in search UI.

## 4. Configuration (Super Admin, see `Modules/12_Settings.md`)

- Minimum profile completion required to be eligible for matching (default 70%).
- Recalculation frequency (default: daily + on significant profile edit).
- Feature weighting per match type (e.g., how much test scores vs. budget fit
  matter for University matches) — tunable without a deployment.
- Score floor below which a student is not surfaced to an institution at all
  (default: 40) to keep results relevant.

## 5. Feedback loop

- Institution actions (invite, skip, reject) and student actions (accept,
  reject, ignore) are logged as **matching feedback signals** and factored
  into future score calibration — see `Modules/11_AI_Matching.md` §5.
- This is explicitly a **ranking/recommendation** system, not an automated
  decision system: no invitation, offer, or admission decision is ever made
  by the AI itself — it only orders and surfaces candidates for a human
  officer to act on.

## 6. Fairness & transparency guardrails

- Match scores must never use protected attributes prohibited by applicable
  education/lending non-discrimination law (e.g., disability, religion, race,
  national origin beyond what's inherently required for visa/country
  eligibility). See `Product/07_Non_Functional_Requirements.md` §Compliance.
- Officers can always view *why* a score was given (factor list), and
  students can always see *why* they were matched to an invitation, on
  request.
