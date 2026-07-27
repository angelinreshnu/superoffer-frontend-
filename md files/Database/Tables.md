# Table Schemas

> Conventions per `Database/Naming_Conventions.md`. All tables include
> `id uuid PK`, `created_at timestamptz`, `updated_at timestamptz` unless
> noted; omitted below for brevity except where a table has extra
> timestamp-like fields.

## Auth & Users (`Modules/01_Authentication.md`)

### `users`
| Column | Type | Notes |
|---|---|---|
| email | varchar, unique, nullable | one of email/phone required |
| phone | varchar, unique, nullable | |
| password_hash | varchar | |
| role | varchar | `STUDENT`, `UNIVERSITY_OFFICER`, `LOAN_OFFICER`, `CONSULTANT`, `SUPER_ADMIN` |
| status | varchar | `ACTIVE`, `SUSPENDED`, `DELETED` |
| email_verified_at | timestamptz, nullable | |
| phone_verified_at | timestamptz, nullable | |
| mfa_enabled | boolean | required true for `SUPER_ADMIN` |
| last_login_at | timestamptz, nullable | |

### `auth_sessions`
| Column | Type | Notes |
|---|---|---|
| user_id | uuid FK → users | |
| refresh_token_hash | varchar | |
| device_info | varchar | |
| expires_at | timestamptz | |
| revoked_at | timestamptz, nullable | |

### `otp_codes`
`user_id FK`, `code_hash`, `purpose` (`EMAIL_VERIFY`/`PHONE_VERIFY`/`LOGIN_MFA`), `expires_at`, `consumed_at`.

### `password_reset_tokens`
`user_id FK`, `token_hash`, `expires_at`, `consumed_at`.

### `org_invitations`
`org_type`, `org_id`, `invited_email`, `invited_by_user_id FK`, `status` (`PENDING`/`ACCEPTED`/`EXPIRED`), `expires_at`.

## Student Profile (`Modules/02_Student_Profile.md`)

### `students`
`user_id FK → users, unique`, `first_name`, `last_name`, `date_of_birth`,
`nationality`, `profile_photo_url`, `completion_percent int`, `deleted_at`.

### `student_academic_records`
`student_id FK`, `institution_name`, `grading_system`, `score_raw`,
`score_normalized numeric`, `curriculum`, `graduation_year`.

### `student_test_scores`
`student_id FK`, `test_type` (`IELTS`/`TOEFL`/`SAT`/`GRE`/`GMAT`/`OTHER`),
`score`, `test_date`, `expires_at`.

### `student_preferences`
`student_id FK, unique`, `target_countries text[]`, `target_courses text[]`,
`degree_level`, `intake_term`, `budget_band`, `scholarship_need boolean`.

### `student_documents`
`student_id FK`, `doc_type` (`TRANSCRIPT`/`ID`/`TEST_SCORE_REPORT`/`SOP`/`OTHER`),
`file_url`, `verification_status` (`PENDING`/`VERIFIED`/`REJECTED`),
`rejection_reason`, `verified_by_user_id FK, nullable`.

### `student_visibility_settings`
`student_id FK, unique`, `visible boolean default true`,
`visible_to_universities boolean`, `visible_to_loan_providers boolean`,
`visible_to_consultants boolean`, `blocked_org_ids uuid[]`.

## Institution Org Tables

### `universities` (`Modules/03_University_Management.md`)
`name`, `type` (`PUBLIC`/`PRIVATE`), `verification_status`
(`PENDING_VERIFICATION`/`VERIFIED`/`REJECTED`/`SUSPENDED`),
`verification_rejection_reason`, `official_domain`, `accreditation_doc_url`.

### `university_campuses`
`university_id FK`, `name`, `location`.

### `university_officers`
`user_id FK, unique`, `university_id FK`, `designation`.

### `university_programs`
`university_id FK`, `name`, `degree_level`, `intake_terms text[]`,
`seats_available int, nullable`.

### `university_offer_templates`
`university_id FK`, `name`, `default_terms jsonb`.

### `university_admission_criteria`
`university_id FK`, `program_id FK, nullable`, `min_score numeric`,
`preferred_curricula text[]`, `criteria_weights jsonb`.

### `loan_providers` / `loan_provider_officers` / `loan_products` /
`loan_offer_templates` / `loan_eligibility_criteria` (`Modules/04_Education_Loan_Management.md`)
Mirrors the University shape: org verification fields on `loan_providers`
(`type` = `BANK`/`NBFC`/`OTHER`, `license_doc_url`); `loan_products` has
`name`, `interest_rate_min numeric`, `interest_rate_max numeric`,
`max_amount numeric`, `currency`, `tenure_options int[]`,
`collateral_required boolean`, `eligible_countries text[]`.

### `consultancies` / `consultants` / `consulting_packages` /
`consultant_client_relationships` (`Modules/05_Study_Abroad_Consultant_Management.md`)
`consultancies`: org verification fields + `specialization_regions text[]`,
`specialization_languages text[]`. `consultants`: `user_id FK, unique`,
`consultancy_id FK`, `bio`, `languages text[]`.
`consulting_packages`: `consultancy_id FK`, `name`, `scope`, `price numeric`,
`currency`, `typical_duration_days int`.
`consultant_client_relationships`: `consultant_id FK`, `student_id FK`,
`invitation_id FK`, `status` (`ACTIVE`/`WITHDRAWN`/`COMPLETE`),
`activated_at`, `ended_at`.

## Search (`Modules/06_Search.md`)

### `search_queries`
`officer_id FK → users`, `org_type`, `org_id`, `name, nullable` (if saved),
`filters jsonb`, `is_saved boolean`.

### `shortlists`
`officer_id FK`, `org_id`, `name`.

### `shortlist_items`
`shortlist_id FK`, `student_id FK`, `added_at`.

## Invitations (`Modules/07_Invitations.md`)

### `invitations`
| Column | Type | Notes |
|---|---|---|
| student_id | uuid FK | |
| sender_org_type | varchar | `UNIVERSITY` / `LOAN_PROVIDER` / `CONSULTANCY` |
| sender_org_id | uuid | polymorphic FK, see `Naming_Conventions.md` §3 |
| sender_officer_id | uuid FK → users | |
| status | varchar | `SENT`/`VIEWED`/`NEGOTIATING`/`ACCEPTED`/`REJECTED`/`EXPIRED`/`WITHDRAWN` |
| sent_at | timestamptz | |
| viewed_at | timestamptz, nullable | |
| expires_at | timestamptz | `sent_at` + 14 days default |
| resolved_at | timestamptz, nullable | terminal state timestamp |

### `offers`
`invitation_id FK, unique`, `offer_type` (`ADMISSION`/`LOAN`/`CONSULTING`),
`terms jsonb` (type-varying — see `Naming_Conventions.md` §5),
`value_summary varchar` (human-readable, e.g., "40% tuition scholarship").

### `invitation_status_history`
`invitation_id FK`, `from_status`, `to_status`, `changed_by_user_id FK`, `changed_at`.

### `negotiations`
`invitation_id FK, unique`, `initiated_by_student boolean default true`,
`status` (`OPEN`/`RESOLVED`).

### `negotiation_messages`
`negotiation_id FK`, `sender_user_id FK`, `message text`,
`proposed_terms jsonb, nullable`, `sent_at`.

## Notifications (`Modules/08_Notifications.md`)

### `notifications`
`user_id FK`, `event_type`, `payload jsonb`, `read_at timestamptz, nullable`.

### `notification_preferences`
`user_id FK, unique`, `event_category`, `channel` (`IN_APP`/`EMAIL`/`DIGEST`),
`digest_frequency` (`DAILY`/`WEEKLY`, nullable).

### `notification_delivery_log`
`notification_id FK`, `channel`, `delivered_at`, `opened_at, nullable`.

## Reports (`Modules/09_Reports_Analytics.md`)

### `analytics_events`
`event_type`, `actor_user_id FK, nullable`, `entity_type`, `entity_id`, `metadata jsonb`, `occurred_at`.

### `report_snapshots`
`scope_type` (`STUDENT`/`ORG`/`PLATFORM`), `scope_id, nullable`, `period_start`,
`period_end`, `metrics jsonb`, `generated_at`.

## Subscriptions & Billing (`Modules/10_Subscriptions_Billing.md`)

### `subscriptions`
`org_type`, `org_id`, `plan_id FK`, `status` (`ACTIVE`/`PAST_DUE`/`SUSPENDED`/`CANCELED`),
`billing_cycle` (`MONTHLY`/`ANNUAL`), `current_period_start`, `current_period_end`, `auto_renew boolean`.

### `subscription_plans`
`name` (`STARTER`/`GROWTH`/`ENTERPRISE`), `search_quota int, nullable` (null = unlimited),
`invitation_quota int, nullable`, `seat_limit int, nullable`, `price numeric`, `currency`.

### `subscription_addons`
`subscription_id FK`, `addon_type` (`FEATURED_PLACEMENT`/`EXTRA_SEATS`/`API_ACCESS`),
`quantity int`, `active_until timestamptz`.

### `quota_usage`
`subscription_id FK`, `metric` (`SEARCHES`/`INVITATIONS`), `used int`, `period_start`, `period_end`.

### `invoices`
`subscription_id FK`, `amount numeric`, `currency`, `status` (`PAID`/`FAILED`/`PENDING`), `issued_at`, `paid_at, nullable`.

### `payment_methods`
`org_type`, `org_id`, `provider_token`, `is_default boolean`.

## AI Matching (`Modules/11_AI_Matching.md`)

### `match_scores`
`student_id FK`, `target_org_type`, `target_org_id`, `score int`, `calculated_at`.

### `match_score_factors`
`match_score_id FK`, `factor_label`, `factor_score int`, `factor_weight numeric`.

### `matching_config`
`match_type` (`STUDENT_UNIVERSITY`/`STUDENT_LOAN`/`STUDENT_CONSULTANT`),
`factor_weights jsonb`, `score_floor int`, `recalculation_frequency`.

### `matching_feedback_events`
`match_score_id FK`, `actor_user_id FK`, `action` (`INVITED`/`SKIPPED`/`REJECTED_FROM_SHORTLIST`/`STUDENT_ACCEPTED`/`STUDENT_REJECTED`/`STUDENT_IGNORED`).

## Settings & Audit (`Modules/12_Settings.md`)

### `user_settings`
`user_id FK, unique`, `locale`, `timezone`.

### `platform_settings`
`key varchar unique`, `value jsonb`, `updated_by_user_id FK`.

### `audit_log`
`actor_user_id FK`, `action`, `entity_type`, `entity_id`, `before_state jsonb`,
`after_state jsonb`, `occurred_at` — **append-only, no update/delete**.
