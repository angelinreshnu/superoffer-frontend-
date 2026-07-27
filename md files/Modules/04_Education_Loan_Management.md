# Module: Education Loan Management

## 1. Purpose

Manage Education Loan Provider organizations, their officers, loan products,
and eligibility criteria used for matching and offer creation.

## 2. Actors

Loan Officer (own org RU), Super Admin (CRUD, verification).

## 3. Features

- Org profile: name, type (bank/NBFC/specialized lender), license/registration
  documents, service regions.
- Officer management (see Future Scope for org-admin sub-role).
- Loan product catalog: product name, interest rate range, max loan amount,
  tenure options, collateral requirement (yes/no), eligible countries/courses.
- Offer templates built from loan products (rate, fee, tenure) that officers
  customize per invitation.
- Eligibility criteria profile: feeds AI Matching — target credit/guarantor
  profile, minimum admission status required (e.g., "must have at least a
  pending admission offer"), country restrictions.

## 4. Workflow

```
Org signs up ──► Submits license/registration documents ──► Super Admin
   reviews ──► VERIFIED / REJECTED (with reason)
   │
   ▼
Verified org ──► Officers can search/invite
   │
   ▼
Org maintains loan product catalog + offer templates (ongoing)
   │
   ▼
Org subscription tier gates quota
```

## 5. Business rules

- Same verification gating as University Management (rule #2).
- Loan offer terms must always disclose: interest rate, fee structure,
  tenure, and any conditionality (e.g., "requires verified guarantor") before
  being sendable — enforced as required fields on the Offer object
  (`Modules/07_Invitations.md`).
- Offers are explicitly indicative/pre-approval; final loan agreement and
  disbursement happen off-platform through the lender's own compliant
  process (`Product/07_Non_Functional_Requirements.md` §4).

## 6. Permissions

Loan Officer: RU on own org profile/catalog, CRUD on own org's offer
templates. Super Admin: full CRUD + verification authority.

## 7. Database tables

`loan_providers`, `loan_provider_officers`, `loan_products`,
`loan_offer_templates`, `loan_eligibility_criteria`. See `Database/Tables.md`.

## 8. APIs

See `API/Education_Loan.md`.

## 9. Notifications

Verification approved/rejected · new officer invited/joined · subscription
quota alerts.

## 10. Reports

Product-level funnel (which loan products convert best), rate-sensitivity
analysis (acceptance rate by rate offered).

## 11. Edge cases

- Loan product's eligible countries change (regulatory reason) → existing
  sent invitations referencing the old product config are unaffected (terms
  locked at send time); new invitations use updated criteria.
- Lender wants to offer a co-branded product with a University (e.g.,
  partnership discount) → out of v1 scope; noted below.

## 12. Future scope

- University–Lender partnership/co-branded offer linking.
- `ORG_ADMIN` sub-role.
- Real-time eligibility pre-check API integration with the lender's own
  underwriting system.
