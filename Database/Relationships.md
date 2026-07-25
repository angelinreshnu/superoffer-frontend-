# Relationships & Cardinality

Companion to `ERD.md` (visual) and `Tables.md` (columns). This file spells
out cardinality and referential-integrity rules that aren't obvious from the
diagram alone.

## 1. Identity

- `users` 1:0..1 `students` (only when `role = STUDENT`)
- `users` 1:0..1 `university_officers` (only when `role = UNIVERSITY_OFFICER`)
- `users` 1:0..1 `loan_provider_officers` (only when `role = LOAN_OFFICER`)
- `users` 1:0..1 `consultants` (only when `role = CONSULTANT`)
- A `SUPER_ADMIN` user has no extending profile table — role alone is
  sufficient since Super Admins act on the platform, not as a marketplace
  participant.

## 2. Org ownership

- `universities` 1:N `university_officers`, 1:N `university_programs`,
  1:N `university_offer_templates`, 1:N `university_campuses`
- `loan_providers` 1:N `loan_provider_officers`, 1:N `loan_products`,
  1:N `loan_offer_templates`
- `consultancies` 1:N `consultants`, 1:N `consulting_packages`
- Each org type has exactly one `subscriptions` row active at a time
  (1:1 for the *current* period; historically 1:N via `invoices` history).

## 3. Student profile composition

- `students` 1:N `student_academic_records` (a student may list multiple
  prior institutions)
- `students` 1:N `student_test_scores` (multiple test types/attempts)
- `students` 1:1 `student_preferences`
- `students` 1:N `student_documents`
- `students` 1:1 `student_visibility_settings`
- Deleting a student (`Product/02_Business_Rules.md` rule #19) cascades to
  all of the above via `deleted_at` soft-delete, **except** anonymized
  records required for institution-side compliance reporting, which are
  retained per `Product/07_Non_Functional_Requirements.md` §7.

## 4. Invitations — the central join

- `invitations.student_id` → `students.id` (N:1 — a student receives many)
- `invitations.sender_org_id` → polymorphic, resolved via
  `sender_org_type` to `universities` / `loan_providers` / `consultancies`
  (N:1 — an org sends many)
- `invitations.sender_officer_id` → `users.id` (N:1 — an officer sends many;
  used for officer-level activity reporting)
- `invitations` 1:1 `offers` — enforced at the application layer as
  "always created together, never independently" (rule #7,
  `Product/02_Business_Rules.md`), even though physically two tables for
  schema clarity.
- `invitations` 1:N `invitation_status_history` (append-only trail)
- `invitations` 1:0..1 `negotiations` (created only if the student exercises
  their one-time negotiation right)
- `negotiations` 1:N `negotiation_messages`

## 5. Consultant cross-visibility

- `consultant_client_relationships.student_id` → `students.id`
- `consultant_client_relationships.consultant_id` → `consultants.id`
- `consultant_client_relationships.invitation_id` → `invitations.id`
  (the consulting invitation that, once Accepted, created this relationship)
- While `status = ACTIVE`, the API layer permits the associated consultant
  read access to that student's *other* `invitations` rows
  (`sender_org_type IN ('UNIVERSITY','LOAN_PROVIDER')`) — this is the single
  authorization rule in the whole schema that grants cross-org read access,
  and it must be checked against this table on every such request, not
  cached.

## 6. Matching

- `match_scores.student_id` → `students.id`; `target_org_id`/`target_org_type`
  polymorphic same as invitations.
- `match_scores` 1:N `match_score_factors` (the human-readable breakdown).
- `matching_feedback_events.match_score_id` → `match_scores.id`, used to
  recalibrate `matching_config.factor_weights` over time (human-reviewed,
  per `Modules/11_AI_Matching.md` §5).

## 7. Subscriptions & quota

- `subscriptions.plan_id` → `subscription_plans.id` (N:1 — many orgs share a
  plan definition)
- `subscriptions` 1:N `quota_usage` (one row per metric per billing period)
- `subscriptions` 1:N `subscription_addons`, 1:N `invoices`

## 8. Referential integrity notes for implementers

- Prefer `ON DELETE RESTRICT` for foreign keys into `invitations`/`offers`
  (financial/legal-adjacent records must never be silently cascade-deleted)
  — deletion flows always go through explicit status transitions
  (`WITHDRAWN`, soft-delete) instead.
- `audit_log` and `invitation_status_history` have no delete path at all,
  application or database level.
