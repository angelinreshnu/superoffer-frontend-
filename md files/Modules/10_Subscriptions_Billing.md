# Module: Subscriptions & Billing

## 1. Purpose

Manage Institution org subscription plans, quota enforcement, billing
cycles, and payment status — the platform's monetization mechanism (see
`Product/05_Revenue_Model.md` for business context).

## 2. Actors

Institution officers with org-admin billing rights (v1: any officer can view;
billing changes may be restricted — see Future Scope for dedicated
`ORG_ADMIN`), Super Admin (full control, manual overrides).

## 3. Features

- Plan selection: Starter / Growth / Enterprise (see
  `Product/05_Revenue_Model.md` §2 for default limits).
- Quota tracking: searches (profile views), invitations sent, seats used —
  reset each billing cycle.
- Add-on purchases: featured placement, extra seats, API access.
- Billing cycle management: monthly/annual, auto-renew toggle.
- Payment method management and invoice history.
- Manual Super Admin overrides (comped access, custom limits) for
  partnerships/pilots.

## 4. Workflow

```
Org selects/changes plan ──► Payment processed (external payment provider)
   │
   ▼
Subscription record activated/updated ──► Quota counters reset for new cycle
   │
   ▼
Officer actions (search, invite) ──► Decrement quota in real time
   │
   ├─► Quota exhausted ──► New actions blocked, upgrade prompt shown
   │
   ▼
Billing cycle renews ──► Payment retried on failure (dunning) ──► Suspend
   access after grace period if unresolved
```

## 5. Business rules

- Expired/suspended subscription retains read access to existing
  invitations/offers but blocks new searches/invitations
  (`Product/02_Business_Rules.md` rule #20).
- Quota is enforced server-side on every relevant request — never assume
  client-side quota display is authoritative.
- Add-ons apply for the remainder of the current billing cycle unless
  specified otherwise; do not retroactively affect already-consumed quota.
- Only Super Admin can grant manual overrides, and doing so is audit-logged.

## 6. Permissions

Institution officers: read own org's subscription status; update (plan
change, payment method) if granted billing rights. Super Admin: full CRUD,
including manual overrides.

## 7. Database tables

`subscriptions`, `subscription_plans`, `subscription_addons`,
`quota_usage`, `invoices`, `payment_methods`. See `Database/Tables.md`.

## 8. APIs

`GET /orgs/{id}/subscription`, `PUT /orgs/{id}/subscription/plan`,
`POST /orgs/{id}/subscription/addons`, `GET /orgs/{id}/invoices`.

## 9. Notifications

Payment successful/failed · quota nearing limit (e.g., 80% used) · quota
exhausted · subscription renewed/expiring/suspended.

## 10. Reports

Revenue by tier, churn rate, quota utilization distribution (Super Admin
view, product analytics).

## 11. Edge cases

- Org downgrades mid-cycle to a tier with a lower seat count than officers
  currently active → downgrade is scheduled for next cycle start, not
  applied immediately, to avoid abruptly locking out active officers.
- Payment fails repeatedly → org enters a grace period (default 7 days,
  configurable) with a persistent warning before quota access is suspended.

## 12. Future scope

- Usage-based billing option (pay per invitation sent).
- Dedicated `ORG_ADMIN` sub-role solely for billing, separate from
  admissions/lending/consulting officers.
- Self-service invoicing/PO-based billing for Enterprise.
