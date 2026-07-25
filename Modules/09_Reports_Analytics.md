# Module: Reports & Analytics

## 1. Purpose

Give every actor visibility into outcomes relevant to their role — from a
student's personal activity to platform-wide business metrics for Super
Admin.

## 2. Actors

All roles, scoped to their own data (Students, Institution officers) or
platform-wide (Super Admin).

## 3. Features

- **Student reports**: invitations received/accepted/rejected over time,
  aggregate profile view count.
- **Institution reports**: funnel (sent → viewed → accepted), average
  response time, match-score-band conversion, program/product/package-level
  breakdowns, team activity (Enterprise tier).
- **Super Admin reports**: platform-wide funnel by institution type, revenue
  by subscription tier, AI matching effectiveness (score vs. outcome
  correlation), verification turnaround time, notification delivery health.
- Export to CSV for all report types.
- Scheduled report emails (e.g., weekly funnel summary) — opt-in.

## 4. Workflow

```
Event occurs (invitation state change, login, search, etc.)
   │
   ▼
Written to event log (append-only)
   │
   ▼
Aggregated into role-scoped report views (scheduled batch, e.g., hourly)
   │
   ▼
User opens Reports tab ──► sees pre-aggregated dashboard ──► optional CSV export
```

## 5. Business rules

- Institution reports never expose another institution's data, even in
  aggregate benchmarks, in v1 (anonymized cross-org benchmarks are Future
  Scope — see `Modules/06_Search.md` §12).
- Student reports never expose which specific institution viewed their
  profile unless that institution went on to send an invitation.
- Report data respects the same visibility/deletion rules as source data —
  a deleted student's data is excluded/anonymized in reports going forward
  (`Product/02_Business_Rules.md` rule #19).

## 6. Permissions

Own-scope read for Students and Institution officers; platform-wide read for
Super Admin. See `Product/03_RBAC.md`.

## 7. Database tables

Reports are computed from core tables (`invitations`, `offers`, `students`,
etc.) plus a denormalized `analytics_events` event log and materialized
`report_snapshots` for performance. See `Database/Tables.md`.

## 8. APIs

`GET /reports/{scope}` (role-scoped), `GET /reports/{scope}/export`.

## 9. Notifications

Scheduled report ready (email, if opted in).

## 10. Edge cases

- Institution requests a report for a period with zero activity → returns an
  empty-state report, not an error.
- Super Admin exports a platform-wide report containing PII-adjacent
  aggregates → export action itself is audit-logged (rule #18).

## 11. Future scope

- Custom/ad-hoc report builder.
- Anonymized cross-org benchmarking ("how does my acceptance rate compare to
  similar universities").
- Predictive analytics (e.g., forecasted acceptance likelihood before
  sending).
