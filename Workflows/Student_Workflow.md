# Workflow: Student Journey

End-to-end journey stitching together `Modules/01_Authentication.md`,
`02_Student_Profile.md`, `06_Search.md` (as the "why am I discoverable"
context), `07_Invitations.md`, and `08_Notifications.md`.

```
┌─────────────────────────────────────────────────────────────────────┐
│ 1. ONBOARDING                                                         │
├─────────────────────────────────────────────────────────────────────┤
│ Register (email/phone) → Verify OTP → Land on Dashboard (0% complete) │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│ 2. PROFILE BUILDING                                                   │
├─────────────────────────────────────────────────────────────────────┤
│ Fill Personal → Academic History → Test Scores → Preferences →        │
│ Upload Documents → Set Visibility                                     │
│                                                                         │
│ Decision: Completion ≥ 70%? ── No ──► Stay hidden, reminders sent      │
│                              └─ Yes ──► Discoverable (if visibility ON)│
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│ 3. RECEIVING INVITATIONS (repeats over time)                          │
├─────────────────────────────────────────────────────────────────────┤
│ Institution finds student via Search/AI Matching → sends Invitation   │
│                        │                                               │
│                        ▼                                               │
│ Notification received → Student opens Inbox → reviews Offer detail    │
│                        │                                               │
│         ┌──────────────┼──────────────┬─────────────────┐            │
│         ▼              ▼              ▼                 ▼            │
│      Accept          Reject       Negotiate           Ignore          │
│         │              │           (once)            (auto-expire     │
│         │              │              │                 in 14 days)   │
│         │              │              ▼                              │
│         │              │      Institution counters                    │
│         │              │              │                               │
│         │              │      ┌───────┴───────┐                      │
│         │              │      ▼               ▼                      │
│         │              │   Accept          Reject/Ignore              │
│         ▼              ▼      │                                       │
│   Offer ACTIVE     Done      (loop back to Accept/Reject branch)      │
│   (category locked)                                                   │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│ 4. MULTI-CATEGORY RESOLUTION                                          │
├─────────────────────────────────────────────────────────────────────┤
│ Repeat step 3 independently per category:                             │
│   • University admission offer                                        │
│   • Education loan offer                                              │
│   • Study abroad consultant engagement                                │
│                                                                         │
│ A consultant engagement, once Active, gains read-only visibility into  │
│ the student's University/Loan invitation statuses to provide guidance  │
│ (see Modules/05_Study_Abroad_Consultant_Management.md).                │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│ 5. ONGOING                                                             │
├─────────────────────────────────────────────────────────────────────┤
│ Keep profile updated → new invitations may arrive → manage             │
│ notifications/settings → optionally export data or delete account      │
└─────────────────────────────────────────────────────────────────────┘
```

## Key decision points

1. **Discoverability gate** — profile completion + visibility toggle.
2. **Per-invitation branch** — accept / reject / negotiate / let expire.
3. **Category lock** — only one Active offer per category at a time (see
   `Product/02_Business_Rules.md` rule #8); switching requires an explicit
   withdrawal first.
