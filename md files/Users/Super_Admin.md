# User: Super Admin

## 1. Role overview

Platform-internal operator role. Responsible for keeping the marketplace
trustworthy (verification, moderation), configured correctly (AI matching
weights, quotas), monetized (subscriptions), and healthy (reports, audit).

## 2. Dashboard

- **Verification queue**: pending Institution org verifications.
- **Platform health**: active users by role, invitation volume, acceptance
  rate trends.
- **Subscription overview**: revenue, tier distribution, upcoming renewals.
- **Support/moderation queue**: flagged profiles, disputed invitations,
  account deletion requests.
- **System configuration** shortcuts (AI matching weights, quota defaults).

## 3. Navigation

`Dashboard → Users → Universities → Loan Providers → Consultants → AI Matching Config → Subscriptions → Reports → Platform Settings → Audit Log`

## 4. Responsibilities

- Review and approve/reject Institution org verification submissions.
- Manage (suspend/reinstate) any user or org account for policy violations.
- Configure AI Matching weights, thresholds, and refresh cadence.
- Manage subscription plans, pricing, and manual overrides (e.g., comped
  Enterprise access).
- Run and export platform-wide reports.
- Review audit logs for compliance/support investigations.
- Configure global platform settings (invitation expiry window, profile
  completion threshold, notification defaults — see `Modules/12_Settings.md`).

## 5. Permissions

Full read across the platform; full CRUD on configuration, verification, and
subscription resources; moderation actions (suspend/reinstate) on any
account. See `Product/03_RBAC.md`. All actions audit-logged without
exception (rule #18, `Product/02_Business_Rules.md`).

## 6. Complete workflow (verification example)

```
Super Admin
  │
  ▼
Login (elevated auth, e.g., MFA required) ─► See Modules/01_Authentication.md
  │
  ▼
Open Verification Queue
  │
  ▼
Review submitted business/accreditation documents
  │
  ├─► Approve ───► Org status: VERIFIED, officers unlocked
  └─► Reject ────► Org notified with reason, resubmission allowed
  │
  ▼
(Ongoing) Monitor platform health, respond to flags, configure system
  │
  ▼
Logout
```

Full workflow: `Workflows/Admin_Workflow.md`.

## 7. Business rules specific to this role

- Every write action is audit-logged with actor, before/after state, and
  timestamp — no exceptions (rule #18).
- Access to individual Student Profile detail is restricted to a
  support/moderation context, itself logged (rule #17).
- Rejecting a verification always requires a reason (rule #3,
  `Product/02_Business_Rules.md`).

## 8. Notifications received

New verification submission · flagged content/dispute raised · subscription
payment failures · system health alerts.

## 9. Reports available

Full platform analytics: acceptance funnel by institution type, revenue by
tier, AI matching effectiveness (score vs. outcome correlation), verification
turnaround time. See `Modules/09_Reports_Analytics.md`.

## 10. Edge cases

- An Institution disputes a moderation action → Super Admin can view full
  audit trail for that org/action and reverse it, which itself creates a new
  audit entry (audit log is append-only, never edited/deleted).
- A Student requests account deletion while holding an Active accepted offer
  → deletion proceeds per rule #19, but the counterpart institution is
  notified and the transaction record is retained anonymized for their
  compliance needs.
