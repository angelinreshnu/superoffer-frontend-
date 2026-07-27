# Database Naming Conventions

Read this before `ERD.md`, `Tables.md`, and `Relationships.md` — it defines
the shared vocabulary used across all three.

## 1. General

- Tables: `snake_case`, plural nouns (`students`, `invitations`, `offers`).
- Columns: `snake_case`, singular (`first_name`, `status`, `created_at`).
- Primary keys: `id` (UUID, not auto-increment int, to avoid enumeration
  attacks on a marketplace that must not leak record counts).
- Foreign keys: `<referenced_table_singular>_id`
  (e.g., `student_id`, `invitation_id`, `org_id`).
- Timestamps: every table has `created_at`, `updated_at` (UTC). Soft-delete
  where applicable uses `deleted_at` (nullable) rather than hard delete, to
  satisfy audit/compliance retention (`Product/07_Non_Functional_Requirements.md` §7).

## 2. Enums

Stored as `varchar` with an application-level enum constraint (not native DB
enum, to allow adding statuses without a migration). Always upper snake case
values, e.g., `status: SENT | VIEWED | NEGOTIATING | ACCEPTED | REJECTED |
EXPIRED | WITHDRAWN`.

## 3. Polymorphic / multi-type references

Where an entity can belong to one of several org types (e.g., an Invitation
sender can be a University, Loan Provider, or Consultancy), use a pair of
columns:

```
sender_org_type   varchar   -- 'UNIVERSITY' | 'LOAN_PROVIDER' | 'CONSULTANCY'
sender_org_id     uuid      -- FK resolved against the matching org table
```

This is preferred over three nullable FK columns for extensibility (adding a
4th institution type later doesn't require a schema change to `invitations`).

## 4. Money & rates

- Monetary amounts: `numeric(12,2)` + a separate `currency` column
  (ISO 4217, e.g., `USD`), never `float`.
- Interest rates / percentages: `numeric(5,2)` representing a percentage
  value (e.g., `9.50` = 9.5%).

## 5. JSON columns

Used sparingly, only for genuinely variable/schema-light data:
- `offers.terms` (type-specific fields that vary by offer type)
- `match_scores.factors` (list of factor label + sub-score)
- `audit_log.before_state` / `after_state`

Anything queried/filtered on directly (status, dates, foreign keys) must be
a real column, never buried in JSON.

## 6. Indexing conventions

- Every foreign key column is indexed.
- Composite index on `(status, expires_at)` for `invitations` (powers the
  expiry sweep job).
- Full-text/vector index on searchable student profile fields to support
  `Modules/06_Search.md` AI natural-language search.
