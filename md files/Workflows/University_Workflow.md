# Workflow: University Journey

Stitches `Modules/01_Authentication.md`, `03_University_Management.md`,
`06_Search.md`, `11_AI_Matching.md`, `07_Invitations.md`,
`09_Reports_Analytics.md`, `10_Subscriptions_Billing.md`.

```
┌─────────────────────────────────────────────────────────────────────┐
│ 1. ORG ONBOARDING (one-time)                                          │
├─────────────────────────────────────────────────────────────────────┤
│ Org signs up → submits accreditation docs → Super Admin verifies       │
│    │                                                                    │
│    ├─► REJECTED ──► resubmit with corrections                          │
│    └─► VERIFIED ──► officers unlocked, choose subscription tier        │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│ 2. CATALOG SETUP (as needed)                                          │
├─────────────────────────────────────────────────────────────────────┤
│ Build program catalog → define admission criteria (feeds AI Matching)  │
│ → create reusable offer templates                                      │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│ 3. DISCOVERY (repeats — the core recurring loop)                      │
├─────────────────────────────────────────────────────────────────────┤
│ Officer searches (filters or AI NL query) ──► results ranked by Match  │
│ Score ──► review profiles (no contact info) ──► shortlist (optional)   │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│ 4. INVITATION                                                          │
├─────────────────────────────────────────────────────────────────────┤
│ Start from template or blank ──► define Offer terms (scholarship %,    │
│ fee waiver, fast-track, etc.) ──► send                                 │
│    │                                                                    │
│    ▼                                                                    │
│ Track status: Sent → Viewed → [Negotiating] → Accepted/Rejected/Expired│
│    │                                                                    │
│    └─► If Negotiating: review student's counter-request ──►            │
│         respond with revised terms or hold firm ──► resolve            │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│ 5. MEASUREMENT                                                         │
├─────────────────────────────────────────────────────────────────────┤
│ Review funnel report → adjust program criteria/offer strategy →        │
│ monitor subscription quota usage → upgrade tier if needed              │
└─────────────────────────────────────────────────────────────────────┘
```

## Key decision points

1. **Verification gate** — nothing else is possible until `VERIFIED`.
2. **Quota gate** — search/invitation actions blocked once tier quota is
   exhausted; resolved by upgrade or next billing cycle.
3. **Negotiation branch** — hold firm vs. counter; no hard rule on which to
   choose, purely an institution business decision.
