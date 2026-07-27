# Workflow: Study Abroad Consultant Journey

Stitches `Modules/01_Authentication.md`,
`05_Study_Abroad_Consultant_Management.md`, `06_Search.md`,
`11_AI_Matching.md`, `07_Invitations.md`, `09_Reports_Analytics.md`,
`10_Subscriptions_Billing.md`.

```
┌─────────────────────────────────────────────────────────────────────┐
│ 1. ORG ONBOARDING (one-time)                                          │
├─────────────────────────────────────────────────────────────────────┤
│ Org signs up → submits certification/business docs → Super Admin       │
│ verifies → VERIFIED → consultants unlocked, choose subscription tier   │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│ 2. PACKAGE SETUP (as needed)                                          │
├─────────────────────────────────────────────────────────────────────┤
│ Define service packages (scope, price, duration) → create offer        │
│ templates                                                              │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│ 3. DISCOVERY (repeats)                                                 │
├─────────────────────────────────────────────────────────────────────┤
│ Consultant searches by target country/course + stated guidance need    │
│ ──► results ranked by Match Score ──► review profile                   │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│ 4. INVITATION                                                          │
├─────────────────────────────────────────────────────────────────────┤
│ Define Consulting Offer (package scope, price) ──► send                │
│    │                                                                    │
│    ▼                                                                    │
│ Track status: Sent → Viewed → [Negotiating] → Accepted/Rejected/Expired│
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼ (if Accepted)
┌─────────────────────────────────────────────────────────────────────┐
│ 5. ACTIVE ENGAGEMENT                                                   │
├─────────────────────────────────────────────────────────────────────┤
│ Engagement becomes Active ──► gain read-only visibility into client's  │
│ University/Loan invitation statuses ──► guide student (shortlisting,   │
│ SOP/LOR, visa prep — off-platform or via future collaboration tools)   │
│    │                                                                    │
│    ├─► Student withdraws early ──► access revoked immediately          │
│    └─► Engagement completes (student admitted) ──► marked Complete,    │
│         access revoked, outcome recorded for reporting                 │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│ 6. MEASUREMENT                                                         │
├─────────────────────────────────────────────────────────────────────┤
│ Review funnel + active client + outcome-rate reports → adjust package  │
│ strategy → monitor subscription quota usage                            │
└─────────────────────────────────────────────────────────────────────┘
```

## Key decision points

1. **Verification gate** — as with other institution types.
2. **Engagement activation** — the one moment that grants the platform's
   single cross-module read-access exception (see
   `Modules/05_Study_Abroad_Consultant_Management.md` §4).
3. **Engagement termination** — either party can end it; access revocation
   is immediate and non-negotiable, regardless of who initiated it.
