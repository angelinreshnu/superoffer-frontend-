# API: University

Base path: `/university`. All endpoints require `role = UNIVERSITY_OFFICER`
and are scoped to the caller's `university_id`, gated by org verification
status and subscription quota. See `Modules/03_University_Management.md`,
`Modules/06_Search.md`.

## Org profile & catalog

`GET /university/org` / `PUT /university/org` — org profile (name, campuses,
accreditation docs).
`GET /university/programs` / `POST /university/programs` / `PUT /university/programs/{id}`
`GET /university/offer-templates` / `POST /university/offer-templates`
`PUT /university/admission-criteria` — feeds AI Matching weights input for this org.

## Search

`POST /university/search`
```json
// Request
{
  "filters": { "target_countries": ["CA"], "degree_level": "Masters", "min_test_score": {"type":"IELTS","value":7.0}, "budget_band": "20000-30000" },
  "natural_language_query": "string, optional — overrides/augments filters",
  "sort": "MATCH_SCORE | RECENCY | COMPLETION",
  "page": 1, "page_size": 25
}
// Response 200
{
  "results": [
    {
      "student_id": "uuid",
      "match_score": 87,
      "match_factors": [ { "label": "Strong academic fit", "score": 92 } ],
      "profile_preview": { "target_countries": ["CA"], "degree_level": "Masters", "test_scores": [ {"test_type":"IELTS","score":"7.5"} ], "completion_percent": 85 }
    }
  ],
  "total_results": 143,
  "quota_remaining": 812
}
```
`POST /university/shortlists` / `GET /university/shortlists` /
`POST /university/shortlists/{id}/items`

## Invitations (creation — response actions live in `API/Invitations.md`)

`POST /university/invitations`
```json
// Request
{
  "student_id": "uuid",
  "offer": {
    "offer_type": "ADMISSION",
    "terms": { "scholarship_percent": 40, "fee_waiver": false, "fast_track": true, "program_id": "uuid" },
    "value_summary": "40% tuition scholarship, fast-track admission"
  }
}
// Response 201
{ "invitation_id": "uuid", "status": "SENT", "expires_at": "timestamp" }
```
`GET /university/invitations?status=` — list own org's sent invitations.

## Reports

`GET /university/reports/funnel?period=`

## Error codes

| Code | Meaning |
|---|---|
| `ORG_NOT_VERIFIED` | 403 |
| `QUOTA_EXCEEDED` | 402, upgrade required |
| `DUPLICATE_INVITATION` | 409, same program cycle already invited |
| `OFFER_TERMS_INVALID` | 400 |
