# Module: Authentication

## 1. Purpose

Establish and verify user identity for all five roles, and gate access to
role-appropriate areas of the platform.

## 2. Actors

Student, University Officer, Loan Officer, Consultant, Super Admin.

## 3. Features

- Email/phone + password registration and login.
- Social login (Google) for Students (optional, v1 nice-to-have).
- Email/phone OTP verification.
- Password reset via email/OTP.
- MFA required for Super Admin; optional (recommended) for Institution
  officers handling billing.
- Session management (JWT access token + refresh token).
- Org invitation flow: an existing officer or Super Admin can invite a new
  officer to their org by email; invitee sets password on first login.

## 4. Workflow

```
Register ──► Verify email/phone (OTP) ──► [If Institution] Org verification
   │                                          pending (Super Admin review)
   ▼
Login ──► Issue access + refresh token ──► Route to role-based dashboard
   │
   ▼
Session expiry ──► Silent refresh via refresh token, or re-login if expired
```

Password reset:
```
Request reset ──► OTP/link sent ──► Verify ──► Set new password ──► Invalidate
                                                                     old sessions
```

## 5. Business rules

- A Student account is usable immediately after email/phone verification.
- An Institution officer account is usable for login immediately, but
  **search/invitation features remain locked** until the parent org is
  `VERIFIED` by Super Admin (`Product/02_Business_Rules.md` rule #2).
- Super Admin accounts require MFA; cannot be created via public
  registration — only provisioned by another Super Admin.
- Failed login attempts are rate-limited (lockout after 5 attempts in 15
  minutes, configurable in `Modules/12_Settings.md`).
- Passwords: minimum 8 characters, at least one number and one letter
  (configurable policy).

## 6. Permissions

Public endpoint for registration/login. All other modules require a valid,
non-expired access token; role is embedded in the token claims and
re-validated server-side on every request (never trusted from client state
alone) — see `Product/03_RBAC.md` §4.

## 7. Database tables

`users`, `auth_sessions`, `otp_codes`, `password_reset_tokens`,
`org_invitations`. See `Database/Tables.md`.

## 8. APIs

See `API/Authentication.md` for the full endpoint contract
(`POST /auth/register`, `POST /auth/login`, `POST /auth/refresh`,
`POST /auth/otp/verify`, `POST /auth/password/reset`, etc.).

## 9. Notifications

Welcome email on registration · OTP codes · password changed confirmation ·
new device/location login alert (security) · org verification status change.

## 10. Reports

Login success/failure rates, MFA adoption (officers), account lockout
frequency — surfaced to Super Admin only (`Modules/09_Reports_Analytics.md`).

## 11. Edge cases

- User attempts login before completing OTP verification → allowed to log in
  but shown a persistent "verify your email/phone" banner; profile remains
  non-discoverable until verified (Student) or org remains unverifiable
  (Institution).
- Institution officer invited to an org that later fails verification → the
  officer's login still works, dashboard shows "org verification rejected,"
  read-only mode.
- Concurrent login from multiple devices → allowed by default; Super Admin
  and Institution "org-admin" sub-role logins may optionally be restricted to
  single-session (configurable, future scope).

## 12. Future scope

- SSO/SAML for large University/Enterprise orgs.
- Biometric login on mobile apps.
- Passwordless (magic link) login for Students.
