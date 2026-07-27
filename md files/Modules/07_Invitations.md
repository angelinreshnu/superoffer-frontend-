# Module: Invitations

## 1. Purpose

The core transaction unit of the platform: how an Institution reaches out to
a Student with a concrete Offer, and how that offer moves through review,
negotiation, and resolution.

## 2. Actors

Student (recipient, responds), University Officer / Loan Officer / Consultant
(sender), Super Admin (read, for support/dispute resolution).

## 3. Features

- Invitation creation from a shortlist, search result, or offer template.
- Offer object embedded in every invitation (type-specific schema — see
  `Modules/03_University_Management.md`, `04_Education_Loan_Management.md`,
  `05_Study_Abroad_Consultant_Management.md` for the terms each type carries).
- Status lifecycle tracking with full history.
- One-time student-initiated negotiation thread.
- Auto-expiry.
- Withdrawal (institution-initiated) and rejection (student-initiated).

## 4. Status lifecycle

```
                 ┌────────────┐
                 │   SENT      │
                 └─────┬──────┘
                       │ student opens
                       ▼
                 ┌────────────┐
                 │  VIEWED     │
                 └──┬───┬──┬──┘
        ┌───────────┘   │   └───────────────┐
        ▼               ▼                   ▼
 ┌─────────────┐  ┌────────────┐     ┌──────────────┐
 │ NEGOTIATING  │  │  ACCEPTED   │     │  REJECTED     │
 └──────┬──────┘  └────────────┘     └──────────────┘
        │ institution responds
        ▼
 ┌───────────────────────────┐
 │ ACCEPTED / REJECTED /       │
 │ (no further negotiation)    │
 └───────────────────────────┘

 Any non-terminal state ──(14 days no action)──► EXPIRED
 Any non-terminal state ──(institution action)──► WITHDRAWN
```

## 5. Business rules

All from `Product/02_Business_Rules.md` §3, restated in implementation terms:

- Every invitation has exactly one Offer, created atomically with it.
- 14-day default expiry timer starts at `SENT`, resets are **not** allowed
  (prevents indefinite quota lockup).
- Negotiation: student may transition `VIEWED → NEGOTIATING` exactly once per
  invitation. While `NEGOTIATING`, the institution may respond with revised
  terms any number of times, but the student's side of the thread is capped
  at their one initiating message + follow-up replies **within that same
  thread** (no re-opening a closed negotiation).
- `ACCEPTED` is terminal and immutable for offer terms. A new invitation must
  be created to change terms.
- Accepting a new invitation in a category that already has an `ACCEPTED`
  offer is blocked until the existing one is explicitly withdrawn by the
  student (rule #8).
- `REJECTED` and `WITHDRAWN` are terminal, non-reversible.

## 6. Permissions

Institution officer: create (own org only), read own sent invitations, and
respond within negotiation. Student: read all invitations addressed to them,
respond (accept/reject/negotiate). Super Admin: read all, for
dispute/support only.

## 7. Database tables

`invitations`, `offers`, `invitation_status_history`, `negotiations`,
`negotiation_messages`. See `Database/Tables.md`.

## 8. APIs

See `API/Invitations.md`.

## 9. Notifications

Covers every status transition — see `Modules/08_Notifications.md` §3 for
the full event → notification map.

## 10. Reports

Funnel by status, average time in each status, negotiation resolution rate.
See `Modules/09_Reports_Analytics.md`.

## 11. Edge cases

- Student negotiates, institution never responds before 14-day expiry →
  invitation moves to `EXPIRED` from `NEGOTIATING` (expiry timer is not
  paused by negotiation — flagged in UI so institutions know negotiating
  invitations still count down).
- Institution withdraws an invitation the student is mid-negotiation on →
  moves directly to `WITHDRAWN`; negotiation thread preserved for
  history/audit but locked.
- Student tries to negotiate twice → second attempt rejected at the API
  layer with a clear error; UI should disable the option after first use.

## 12. Future scope

- Configurable expiry window per institution tier.
- Multi-round structured negotiation (beyond one-time) for Enterprise tier.
- Bulk invitation sending from a shortlist with per-student term
  customization.
