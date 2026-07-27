# API: Invitations

Base path: `/invitations`. Shared endpoints used by **both** sides of an
invitation (creation is institution-type-specific — see `API/University.md`,
`API/Education_Loan.md`, `API/Consultant.md`). See
`Modules/07_Invitations.md` for the full status lifecycle.

## Get a single invitation

`GET /invitations/{id}`
```json
// Response 200 — visible to the receiving student and the sending officer/org only
{
  "id": "uuid",
  "student_id": "uuid",
  "sender_org_type": "UNIVERSITY",
  "sender_org_id": "uuid",
  "status": "NEGOTIATING",
  "sent_at": "timestamp",
  "viewed_at": "timestamp",
  "expires_at": "timestamp",
  "offer": { "offer_type": "ADMISSION", "terms": { }, "value_summary": "string" },
  "negotiation": { "id": "uuid", "status": "OPEN", "messages": [ { "sender_user_id": "uuid", "message": "string", "proposed_terms": {}, "sent_at": "timestamp" } ] }
}
```

## Student actions

`POST /invitations/{id}/view` — marks `SENT → VIEWED` (called on first open;
idempotent).

`POST /invitations/{id}/accept`
```json
// Response 200
{ "status": "ACCEPTED" }
// Response 409 if category already has an ACCEPTED offer
{ "error": "CATEGORY_ALREADY_ACCEPTED", "existing_invitation_id": "uuid" }
```

`POST /invitations/{id}/reject`

`POST /invitations/{id}/negotiate`
```json
// Request
{ "message": "string", "proposed_terms": { "scholarship_percent": 50 } }
// Response 200
{ "status": "NEGOTIATING", "negotiation_id": "uuid" }
// Response 409 if already negotiated once
{ "error": "NEGOTIATION_ALREADY_USED" }
```

## Institution actions

`POST /invitations/{id}/withdraw` — sender-only; final.

`POST /invitations/{id}/negotiate/respond`
```json
// Request
{ "message": "string", "revised_terms": { "scholarship_percent": 45 }, "hold_firm": false }
// Response 200
{ "status": "NEGOTIATING" }
```

## Status history (either party, or Super Admin)

`GET /invitations/{id}/history`
```json
{ "history": [ { "from_status": "SENT", "to_status": "VIEWED", "changed_at": "timestamp" } ] }
```

## Error codes

| Code | Meaning |
|---|---|
| `INVITATION_NOT_FOUND` | 404 |
| `INVITATION_ALREADY_RESOLVED` | 409 — action attempted on a terminal-state invitation |
| `CATEGORY_ALREADY_ACCEPTED` | 409 |
| `NEGOTIATION_ALREADY_USED` | 409 |
| `NOT_AUTHORIZED_FOR_INVITATION` | 403 — caller is neither the recipient nor the sender |
