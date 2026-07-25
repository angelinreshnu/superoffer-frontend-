# User: Study Abroad Consultant

## 1. Role overview

Represents a Study Abroad Consultancy org. Searches students who have
expressed intent to study abroad, sends Invitations offering a consulting
engagement (SOP/LOR help, university shortlisting, visa support), and — once
engaged — guides the student through the rest of the admissions process
using platform tools.

## 2. Dashboard

- **Org subscription status** widget.
- **Sent Invitations** by status.
- **Active Clients**: students with an Accepted consultant engagement.
- **Recommended Students** ranked by Match Score + stated need for guidance.

## 3. Navigation

`Dashboard → Search Students → Invitations → Active Clients → Reports → Org Settings`

## 4. Responsibilities

- Search students by target country/course and stated guidance needs.
- Send Invitations describing the consulting package/service tier.
- Once engaged (offer Accepted), track the student's progress toward
  admission (shortlisting, application prep, visa prep) within the platform's
  shared context (read access to the student's University/Loan invitation
  statuses **only for students who accepted this consultant's engagement**).
- Respond to negotiation requests (e.g., package scope/price).

## 5. Permissions

See `Product/03_RBAC.md`. Scoped to Consultancy org and consulting-type
invitations. Additionally: once a student accepts a Consultant's engagement,
the Consultant gains **read-only** visibility into that student's
University/Loan invitation statuses (not full profile edit rights) to
provide informed guidance — this is the one cross-module read exception in
the platform, documented in `Modules/05_Study_Abroad_Consultant_Management.md`.

## 6. Complete workflow

```
Consultant
  │
  ▼
Login (org must be Verified) ─────────► See Modules/01_Authentication.md
  │
  ▼
Search Students (intent/need filters, AI NL search) ─► See Modules/06_Search.md
  │
  ▼
Send Invitation + Consulting Offer ────► See Modules/07_Invitations.md
  │
  ▼
Track status ── Viewed → Negotiating → Accepted / Rejected / Expired
  │
  ├─► If Accepted: engagement becomes Active
  │        │
  │        ▼
  │   Guide student (shortlist support, SOP/LOR, visa prep)
  │        │
  │        ▼
  │   Track student's admission/loan progress (read-only)
  │
  ▼
Report on outcomes ────────────────────► See Modules/09_Reports_Analytics.md
  │
  ▼
Logout
```

Full workflow: `Workflows/Consultant_Workflow.md`.

## 7. Business rules specific to this role

- A student may have at most one **Active** consultant engagement at a time
  (rule #8, `Product/02_Business_Rules.md`).
- Cross-module read visibility into a client's University/Loan invitations is
  granted only for the duration of the Active engagement; revoked
  immediately on withdrawal/completion.
- Same quota, contact-detail, and accept/edit rules as other institution
  roles.

## 8. Notifications received

Student viewed/accepted/rejected/negotiated invitation · invitation expiring
soon · client's University/Loan invitation status changes (for active
clients only) · quota nearing limit · org verification status changes.

## 9. Reports available

Funnel report, active client count, average time from engagement to
admission outcome.

## 10. Edge cases

- Student ends the consultant engagement mid-process → Consultant's
  read-only visibility into that student's other invitations is revoked
  immediately; historical reports remain (aggregated, not detailed).
- Consultant's org verification lapses mid-engagement → existing active
  engagements continue uninterrupted; no new invitations can be sent until
  reverified.
