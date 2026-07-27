# Workflow: Super Admin Journey

Stitches `Modules/01_Authentication.md`, org management modules
(`03`, `04`, `05`), `09_Reports_Analytics.md`, `10_Subscriptions_Billing.md`,
`11_AI_Matching.md`, `12_Settings.md`.

```
┌─────────────────────────────────────────────────────────────────────┐
│ 1. LOGIN (elevated auth)                                              │
├─────────────────────────────────────────────────────────────────────┤
│ Login with MFA ──► land on platform health dashboard                  │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│ 2. VERIFICATION QUEUE (recurring)                                     │
├─────────────────────────────────────────────────────────────────────┤
│ New org submission arrives ──► review business/accreditation docs      │
│    │                                                                    │
│    ├─► Approve ──► org VERIFIED, officers unlocked, notified           │
│    └─► Reject ──► reason required, org notified, can resubmit          │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│ 3. MODERATION & SUPPORT (recurring)                                   │
├─────────────────────────────────────────────────────────────────────┤
│ Review flagged content/disputes/deletion requests ──► take action      │
│ (suspend/reinstate account, resolve dispute, action deletion request)  │
│    │                                                                    │
│    ▼                                                                    │
│ Every action written to append-only Audit Log                          │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│ 4. CONFIGURATION (as needed)                                          │
├─────────────────────────────────────────────────────────────────────┤
│ Adjust AI Matching weights/floor → adjust profile completion threshold │
│ → adjust invitation expiry window → adjust auth policy →               │
│ manage subscription plan definitions and manual overrides              │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│ 5. MEASUREMENT & REPORTING (recurring)                                │
├─────────────────────────────────────────────────────────────────────┤
│ Review platform-wide funnel, revenue by tier, AI matching effectiveness│
│ → identify issues → loop back to Configuration or Moderation as needed │
└─────────────────────────────────────────────────────────────────────┘
```

## Key decision points

1. **Verification decision** — approve vs. reject, always with a documented
   reason on rejection.
2. **Moderation action severity** — suspend vs. warn vs. reverse; every path
   is audit-logged identically.
3. **Configuration timing** — most config changes (e.g., AI Matching
   weights) apply prospectively on the next scheduled cycle, not
   retroactively, to avoid inconsistent in-session results (see
   `Modules/12_Settings.md` §11).
