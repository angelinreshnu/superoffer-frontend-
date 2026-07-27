# API: Education Loan

Base path: `/loan-provider`. All endpoints require `role = LOAN_OFFICER`,
scoped to the caller's `loan_provider_id`. Mirrors `API/University.md` in
shape; differences noted below. See `Modules/04_Education_Loan_Management.md`.

## Org profile & catalog

`GET/PUT /loan-provider/org`
`GET/POST/PUT /loan-provider/products`
```json
// loan product shape
{ "name": "string", "interest_rate_min": 8.5, "interest_rate_max": 11.0, "max_amount": 50000, "currency": "USD", "tenure_options": [12,24,36], "collateral_required": false, "eligible_countries": ["CA","UK","US"] }
```
`GET/POST /loan-provider/offer-templates`
`PUT /loan-provider/eligibility-criteria`

## Search

`POST /loan-provider/search`
```json
// Request adds financing-specific filters
{
  "filters": { "target_countries": ["CA"], "admission_status": "PENDING | ACCEPTED | NONE", "financing_need": true, "guarantor_present": true },
  "natural_language_query": "string, optional",
  "sort": "MATCH_SCORE", "page": 1, "page_size": 25
}
```
Response shape identical to `API/University.md` search response.

## Invitations

`POST /loan-provider/invitations`
```json
{
  "student_id": "uuid",
  "offer": {
    "offer_type": "LOAN",
    "terms": { "interest_rate": 9.5, "processing_fee": 0, "tenure_months": 24, "conditional_on_guarantor_verification": true },
    "value_summary": "9.5% interest, no processing fee, 24-month tenure"
  }
}
```
`GET /loan-provider/invitations?status=`

## Reports

`GET /loan-provider/reports/funnel?period=`
`GET /loan-provider/reports/rate-sensitivity?period=`

## Error codes

Same as `API/University.md`, plus:

| Code | Meaning |
|---|---|
| `OFFER_MISSING_REQUIRED_TERMS` | 400 — rate/fee/tenure are mandatory fields |
| `COUNTRY_NOT_ELIGIBLE` | 400 — student's target country not in product's eligible list |
