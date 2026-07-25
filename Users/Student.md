# User: Student

## 1. Role overview

The Student is the individual whose profile powers the entire marketplace.
They register once, build a profile, and then primarily operate in
**receive-and-respond** mode: reviewing invitations from Universities, Loan
Providers, and Consultants, and deciding whether to accept, reject, or
negotiate.

## 2. Dashboard

- **Profile Completion** widget (%, with a checklist of missing sections).
- **Inbox**: unified list of Invitations across all institution types, sorted
  by recency by default, filterable by type (University / Loan / Consultant)
  and status (New / Negotiating / Accepted / Rejected / Expired).
- **My Offers**: the currently Accepted offer per category, if any.
- **Recommended for you**: AI-surfaced institutions the student is a strong
  match for but hasn't yet been invited by (future scope — see
  `Modules/11_AI_Matching.md` §6).
- **Notifications** bell (see `Modules/08_Notifications.md`).

## 3. Navigation

`Dashboard → Profile → Inbox (Invitations) → My Offers → Documents → Settings`

## 4. Responsibilities

- Keep the profile accurate and up to date (academics, test scores,
  preferences, documents).
- Review and respond to invitations in a timely manner (before expiry).
- Upload and maintain verifiable documents (transcripts, ID, test score
  reports).
- Manage visibility/privacy settings.

## 5. Permissions

See `Product/03_RBAC.md`. In summary: full CRUD on own profile and documents;
read/respond (accept, reject, negotiate) on invitations addressed to them; no
visibility into other students or into institutions' internal data.

## 6. Complete workflow

```
Student
  │
  ▼
Register / Login  ──────────────► See Modules/01_Authentication.md
  │
  ▼
Complete Profile ────────────────► See Modules/02_Student_Profile.md
  │  (academics, tests, preferences, documents, visibility settings)
  ▼
Become Discoverable  (completion ≥ threshold + visibility ON)
  │
  ▼
Receive Invitations ──────────────► See Modules/07_Invitations.md
  │
  ▼
Review Offer Details
  │
  ├─► Accept ──────────────────────► Offer becomes Active; category locked
  │                                    until withdrawn (Business Rules #8)
  ├─► Reject ──────────────────────► Final; Institution notified
  ├─► Negotiate (once) ────────────► Institution counters ──► Accept/Reject
  └─► Let Expire ───────────────────► Auto-expires after 14 days
  │
  ▼
(Optional) Choose a Consultant to assist through the rest of the process
  │
  ▼
Logout
```

Full workflow detail with branch conditions: `Workflows/Student_Workflow.md`.

## 7. Business rules specific to Student

- Cannot see who else was invited, or by how many other institutions a given
  institution has admitted students (no cross-student visibility) —
  `Product/02_Business_Rules.md` rule #4–6.
- One negotiation attempt per invitation — rule #10.
- Only one Accepted offer per category at a time — rule #8.
- Visibility toggle can be changed at any time but does not retroactively
  hide already-sent invitations.

## 8. Notifications received

New invitation · Institution countered a negotiation · Invitation expiring
soon (48h warning) · Invitation withdrawn by institution · Document
verification result · Profile completion reminders.
See `Modules/08_Notifications.md` for channel/timing detail.

## 9. Reports available to Student

- Personal activity summary: invitations received/accepted/rejected over
  time, profile view count (aggregate, not per-institution identity unless
  the institution invited them).

## 10. Edge cases

- Student receives two competing Accepted-eligible offers in the same
  category simultaneously → only the first "Accept" action succeeds; the
  second returns a conflict and prompts the student to withdraw the first if
  they want to switch (`Product/02_Business_Rules.md` rule #8).
- Student deletes account with pending invitations → all pending invitations
  move to `WITHDRAWN_BY_STUDENT_DELETION`, institutions notified.
- Student's profile drops below the visibility completion threshold after
  edit (e.g., removes a test score) → automatically hidden from new search
  results, but existing pending invitations are unaffected.
