# Module: Settings

## 1. Purpose

Two layers of configuration: **user-level settings** (every role) and
**platform-level settings** (Super Admin only), plus the platform's audit
logging behavior.

## 2. Actors

All roles (own settings), Super Admin (platform settings + audit log access).

## 3. Features — User-level settings (all roles)

- Profile/account details (name, contact, password/MFA).
- Notification preferences (channel + digest frequency per event category —
  see `Modules/08_Notifications.md`).
- Session/device management (view/revoke active sessions).
- (Student-specific) Visibility settings — see `Modules/02_Student_Profile.md`.
- (Institution-specific) Team/officer management, if org-admin rights held.

## 4. Features — Platform-level settings (Super Admin)

- Profile completion threshold for discoverability (default 70%).
- Invitation expiry window (default 14 days).
- AI Matching weights and score floor (`Modules/11_AI_Matching.md` §4).
- Subscription plan definitions and default quotas (`Modules/10_Subscriptions_Billing.md`).
- Authentication policy (password rules, lockout thresholds, MFA
  requirements) (`Modules/01_Authentication.md`).
- Audit log retention window per data category.

## 5. Audit logging (platform-wide behavior, configured here)

- Every Super Admin write action, and every Invitation/Offer state
  transition, is written to an **append-only** audit log:
  `{actor_id, action, entity_type, entity_id, before_state, after_state,
  timestamp}`.
- Audit entries are never edited or deleted, even by Super Admin — corrections
  are made via new entries (`Users/Super_Admin.md` §10).
- Retention: minimum per `Product/07_Non_Functional_Requirements.md` §7
  (default 7 years for financial-adjacent/loan records; shorter, configurable
  windows for other categories).

## 6. Business rules

- Changing the profile completion threshold or expiry window does not
  retroactively affect already-discoverable profiles or already-sent
  invitations — it only applies going forward.
- Only Super Admin can change platform-level settings; Institution officers
  cannot override quota/expiry rules for their own org individually (that's
  the subscription tier's job, not a settings override).

## 7. Permissions

User-level settings: self-service, own account only. Platform-level
settings and audit log: Super Admin only. See `Product/03_RBAC.md`.

## 8. Database tables

`user_settings`, `notification_preferences` (shared with
`Modules/08_Notifications.md`), `platform_settings`, `audit_log`. See
`Database/Tables.md`.

## 9. APIs

`GET/PUT /users/me/settings`, `GET/PUT /admin/platform-settings`,
`GET /admin/audit-log`. See `API/Admin.md`.

## 10. Notifications

Settings changed confirmation (security-sensitive settings only, e.g.,
password/MFA change, new device).

## 11. Edge cases

- Super Admin changes AI Matching weights mid-day → takes effect on the next
  scheduled recalculation batch, not instantly, to avoid inconsistent
  scores appearing within the same search session.
- Two Super Admins edit platform settings concurrently → last-write-wins at
  the field level, both changes audit-logged individually.

## 12. Future scope

- Per-org custom settings overrides (Enterprise tier) for expiry window and
  notification defaults.
- Self-service audit log export for Institution org-admins (their own org's
  actions only).
