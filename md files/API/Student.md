# API: Student

Base path: `/students`. All endpoints require a valid access token with
`role = STUDENT` and act on the caller's own record unless noted (Super
Admin support endpoints are under `API/Admin.md`). See
`Modules/02_Student_Profile.md`.

## Profile

`GET /students/me`
```json
// Response 200
{
  "id": "uuid", "first_name": "string", "last_name": "string",
  "date_of_birth": "date", "nationality": "string",
  "completion_percent": 72,
  "academic_records": [ { "institution_name": "string", "grading_system": "string", "score_raw": "string", "graduation_year": 2024 } ],
  "test_scores": [ { "test_type": "IELTS", "score": "7.5", "test_date": "date" } ],
  "preferences": { "target_countries": ["CA","UK"], "target_courses": ["Data Science"], "degree_level": "Masters", "intake_term": "Fall 2027", "budget_band": "20000-30000 USD", "scholarship_need": true },
  "visibility": { "visible": true, "visible_to_universities": true, "visible_to_loan_providers": true, "visible_to_consultants": true }
}
```

`PUT /students/me` — partial update of any profile section above (same
shape, send only changed sections). Triggers `completion_percent`
recalculation and, if scoring-relevant fields changed, an AI Matching
recalculation event (see `Modules/11_AI_Matching.md` §3).

## Documents

`POST /students/me/documents` — multipart upload.
```json
// Request (form fields)
{ "doc_type": "TRANSCRIPT | ID | TEST_SCORE_REPORT | SOP | OTHER", "file": "<binary>" }
// Response 201
{ "id": "uuid", "doc_type": "TRANSCRIPT", "verification_status": "PENDING" }
```
`GET /students/me/documents` — list own documents with verification status.
`DELETE /students/me/documents/{document_id}`

## Visibility

`PUT /students/me/visibility`
```json
{ "visible": true, "visible_to_universities": true, "visible_to_loan_providers": false, "visible_to_consultants": true, "blocked_org_ids": ["uuid"] }
```

## Invitations inbox (see also `API/Invitations.md` for shared actions)

`GET /students/me/invitations?status=&type=` — unified inbox across
University/Loan/Consultant invitations.

## Error codes

| Code | Meaning |
|---|---|
| `PROFILE_INCOMPLETE_FIELD` | 400, on update with invalid/missing required sub-fields |
| `DOCUMENT_TYPE_UNSUPPORTED` | 415 |
| `DOCUMENT_TOO_LARGE` | 413 |
