# API: Authentication

Base path: `/auth`. Public endpoints unless noted. See
`Modules/01_Authentication.md` for business logic.

## Register

`POST /auth/register`
```json
// Request
{
  "email": "string, optional (email or phone required)",
  "phone": "string, optional",
  "password": "string, min 8 chars",
  "role": "STUDENT | UNIVERSITY_OFFICER | LOAN_OFFICER | CONSULTANT",
  "org_invitation_token": "string, required if role != STUDENT and joining via invite"
}
// Response 201
{ "user_id": "uuid", "otp_required": true }
```

## Verify OTP

`POST /auth/otp/verify`
```json
// Request
{ "user_id": "uuid", "code": "string", "purpose": "EMAIL_VERIFY | PHONE_VERIFY | LOGIN_MFA" }
// Response 200
{ "verified": true }
```

## Login

`POST /auth/login`
```json
// Request
{ "identifier": "email or phone", "password": "string" }
// Response 200
{
  "access_token": "jwt",
  "refresh_token": "string",
  "expires_in": 3600,
  "role": "STUDENT",
  "mfa_required": false
}
// Response 423 (locked)
{ "error": "ACCOUNT_LOCKED", "retry_after_seconds": 900 }
```

## Refresh token

`POST /auth/refresh`
```json
// Request
{ "refresh_token": "string" }
// Response 200
{ "access_token": "jwt", "expires_in": 3600 }
```

## Password reset

`POST /auth/password/reset-request`
```json
{ "identifier": "email or phone" }
```
`POST /auth/password/reset-confirm`
```json
{ "reset_token": "string", "new_password": "string" }
```

## Sessions (authenticated)

`GET /auth/sessions` — list active sessions for current user.
`DELETE /auth/sessions/{session_id}` — revoke a session.

## Error codes

| Code | Meaning |
|---|---|
| `INVALID_CREDENTIALS` | 401 |
| `ACCOUNT_LOCKED` | 423, rate-limit lockout |
| `EMAIL_ALREADY_REGISTERED` | 409 |
| `OTP_EXPIRED` / `OTP_INVALID` | 400 |
| `ORG_INVITATION_INVALID_OR_EXPIRED` | 400 |
| `MFA_REQUIRED` | 401, must complete `LOGIN_MFA` OTP step |
