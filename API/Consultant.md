# API: Consultant

Base path: `/consultancy`. All endpoints require `role = CONSULTANT`, scoped
to the caller's `consultancy_id`. Mirrors `API/University.md` in shape;
differences noted below. See
`Modules/05_Study_Abroad_Consultant_Management.md`.

## Org profile & catalog

`GET/PUT /consultancy/org`
`GET/POST/PUT /consultancy/packages`
```json
{ "name": "string", "scope": "SHORTLISTING_ONLY | FULL_SERVICE", "price": 500, "currency": "USD", "typical_duration_days": 90 }
```

## Search

`POST /consultancy/search`
```json
{
  "filters": { "target_countries": ["CA"], "target_courses": ["Data Science"], "guidance_need": "FULL_SERVICE" },
  "natural_language_query": "string, optional",
  "sort": "MATCH_SCORE", "page": 1, "page_size": 25
}
```

## Invitations

`POST /consultancy/invitations`
```json
{
  "student_id": "uuid",
  "offer": {
    "offer_type": "CONSULTING",
    "terms": { "package_id": "uuid", "scope": "FULL_SERVICE", "price": 500, "currency": "USD" },
    "value_summary": "Full-service consulting package, $500"
  }
}
```
`GET /consultancy/invitations?status=`

## Active clients (cross-module read — see `Modules/05_Study_Abroad_Consultant_Management.md` §4)

`GET /consultancy/clients` — list students with an `ACTIVE`
`consultant_client_relationships` row for this consultant.
`GET /consultancy/clients/{student_id}/invitations` — **read-only** view of
that student's University/Loan invitation statuses. Returns `403` if the
relationship is not currently `ACTIVE`.

## Reports

`GET /consultancy/reports/funnel?period=`
`GET /consultancy/reports/client-outcomes?period=`

## Error codes

Same as `API/University.md`, plus:

| Code | Meaning |
|---|---|
| `CLIENT_RELATIONSHIP_NOT_ACTIVE` | 403 — attempted read of a non-active or non-existent client's invitations |
