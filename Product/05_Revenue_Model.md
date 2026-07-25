# Revenue Model

## 1. Who pays

Students use SuperOffer **free of charge** in v1. Revenue comes entirely from
Institution-side subscriptions and optional add-ons. This keeps the student
pool large and attractive to paying institutions.

## 2. Subscription tiers (per organization)

Applies to University, Loan Provider, and Consultancy orgs identically in
structure, with type-specific limits.

| Tier | Target org size | Monthly search quota | Monthly invitations | AI Match depth | Seats (officers) |
|---|---|---|---|---|---|
| Starter | Small / single-branch | 200 profile views | 50 | Basic scoring | 2 |
| Growth | Mid-size | 1,000 profile views | 300 | Full scoring + factors | 10 |
| Enterprise | Large / multi-branch | Unlimited | Unlimited | Full scoring + saved segments + API access | Unlimited |

Exact numeric limits are configurable by Super Admin per org
(`Modules/10_Subscriptions_Billing.md`) — the table above is the default
plan design, not a hard-coded constant.

## 3. Add-ons

- **Featured placement**: institution's invitations are visually highlighted
  / prioritized in the student's inbox for a given campaign window.
- **Extra seats**: additional officer logins beyond tier default.
- **API access**: programmatic search/invitation creation (Enterprise only).
- **Verified badge boost**: expedited verification review.

## 4. What SuperOffer does NOT take a cut of (v1)

- Tuition payments, loan disbursement amounts, or consultant service fees are
  **not** processed through SuperOffer and are **not** commissioned. This
  keeps SuperOffer out of regulated payment/lending flows in v1 — see
  `Product/00_Product_Overview.md` §8 and
  `Product/07_Non_Functional_Requirements.md`.

## 5. Future revenue scope (explicitly out of v1)

- Success-fee model (charge institutions only on Accepted offers).
- Premium student features (e.g., "boost my visibility").
- Marketplace-facilitated payment processing with a transaction fee.
