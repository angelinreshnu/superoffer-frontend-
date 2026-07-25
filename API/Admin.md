# API: Admin

Base path: `/admin`. All endpoints require `role = SUPER_ADMIN` and MFA on
the session. See `Users/Super_Admin.md`, `Modules/12_Settings.md`.

## Verification queue

`GET /admin/verifications?org_type=&status=PENDING_VERIFICATION`
`POST /admin/verifications/{org_type}/{org_id}/approve`
`POST /admin/verifications/{org_type}/{org_id}/reject`
```json
// Request (reject)
{ "reason": "string, required" }
```

## User & org moderation

`POST /admin/users/{user_id}/suspend`
```json
{ "reason": "string, required" }
```
`POST /admin/users/{user_id}/reinstate`
`GET /admin/users?role=&status=`

## Platform settings

`GET /admin/platform-settings`
`PUT /admin/platform-settings`
```json
{
  "profile_completion_threshold": 70,
  "invitation_expiry_days": 14,
  "auth_lockout_threshold": 5,
  "auth_lockout_window_minutes": 15
}
```

## AI Matching configuration

`GET /admin/matching-config`
`PUT /admin/matching-config`
```json
{
  "match_type": "STUDENT_UNIVERSITY",
  "factor_weights": { "academic_fit": 0.35, "test_score_fit": 0.20, "course_alignment": 0.20, "country_intake_alignment": 0.15, "budget_fit": 0.10 },
  "score_floor": 40,
  "recalculation_frequency": "DAILY"
}
```

## Subscriptions

`GET /admin/subscriptions?org_type=&status=`
`PUT /admin/subscriptions/{id}/override`
```json
{ "search_quota": null, "invitation_quota": null, "note": "comped pilot partner" }
```

## Reports

`GET /admin/reports/platform-funnel?period=`
`GET /admin/reports/revenue?period=`
`GET /admin/reports/matching-effectiveness?period=`

## Audit log

`GET /admin/audit-log?actor_id=&entity_type=&from=&to=`
```json
// Response 200
{
  "entries": [
    { "actor_user_id": "uuid", "action": "VERIFICATION_APPROVED", "entity_type": "university", "entity_id": "uuid", "before_state": {}, "after_state": {}, "occurred_at": "timestamp" }
  ]
}
```
Read-only; there is intentionally no update/delete endpoint for this
resource (append-only, per `Database/Naming_Conventions.md` §1 and
`Product/02_Business_Rules.md` rule #18).

## Error codes

| Code | Meaning |
|---|---|
| `MFA_REQUIRED_FOR_ADMIN` | 401 |
| `REJECTION_REASON_REQUIRED` | 400 |
| `AUDIT_LOG_IMMUTABLE` | 405, if a client mistakenly attempts write |
