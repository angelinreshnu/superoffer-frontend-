# Non-Functional Requirements

## 1. Performance

- Search results (up to 1,000-profile pool per query) return in **< 2s p95**.
- AI Match Score recalculation runs as an async batch job; no user-facing
  request should ever synchronously wait on a full re-score.
- Notification delivery (in-app) within **< 5s** of the triggering event.

## 2. Scalability

- Designed to scale horizontally per-org: search and matching queries must be
  partitionable by org without cross-org contention.
- Student pool assumed to scale to millions of profiles; search/matching
  must use indexed/pre-computed structures, not full scans, at that scale.

## 3. Security

- All data in transit over TLS 1.2+.
- Documents and PII (rule #17 in `Product/02_Business_Rules.md`) encrypted at
  rest.
- Role/org scoping enforced server-side on every request (see
  `Product/03_RBAC.md` §4) — never trust client-supplied org/role claims
  alone.
- Rate limiting on authentication and search endpoints to prevent scraping of
  the student pool.

## 4. Compliance boundary

- SuperOffer is an **introduction and negotiation** platform, not a lender,
  university, or licensed education agent. It must not present itself as
  making admission, credit, or visa decisions — those remain with the
  Institution.
- Student financial and academic data handling should follow applicable
  regional data-protection regulation for the markets SuperOffer operates in
  (e.g., data minimization, right to export/delete — rule #19 in
  `Product/02_Business_Rules.md`).
- Loan-related communication must avoid presenting itself as a binding credit
  offer until the Loan Provider's own compliant loan-agreement process takes
  over outside the platform.

## 5. Availability

- Target 99.9% uptime for core flows (login, search, invitations,
  notifications).
- Notification delivery may degrade gracefully (queued/delayed) before core
  flows do.

## 6. Accessibility & localization

- All dashboards meet WCAG 2.1 AA at minimum.
- Platform UI and notification templates support localization; student
  academic data fields should support non-Latin scripts and multiple
  transcript/grading systems (see `Modules/02_Student_Profile.md`).

## 7. Auditability

- Every state-changing admin action, and every Invitation/Offer state
  transition, is logged immutably (rule #18, `Product/02_Business_Rules.md`).
- Audit logs are retained for a minimum compliance window (default 7 years for
  financial-adjacent records such as loan invitations; configurable per data
  category by Super Admin).
