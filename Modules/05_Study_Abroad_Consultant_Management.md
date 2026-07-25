# Module: Study Abroad Consultant Management

## 1. Purpose

Manage Consultancy organizations, their consultants, service packages, and
the special read-access relationship a consultant gets into an active
client's other invitations.

## 2. Actors

Consultant (own org RU), Super Admin (CRUD, verification).

## 3. Features

- Org profile: name, certifications, specialization (regions, languages,
  service tiers), business documents.
- Consultant management (individual consultant profiles under the org —
  bios, specialization, languages spoken, shown to students pre-acceptance
  in the invitation detail).
- Service package catalog: package name, scope (e.g., "Shortlisting only,"
  "Full-service incl. visa"), price, typical duration.
- Client relationship tracking: once a student accepts a Consultant's
  engagement, the pairing is recorded here and drives the cross-module
  read-access grant.

## 4. Workflow

```
Org signs up ──► Submits certification/business documents ──► Super Admin
   reviews ──► VERIFIED / REJECTED (with reason)
   │
   ▼
Verified org ──► Consultants can search/invite
   │
   ▼
Student accepts a Consulting Offer ──► Client relationship created,
   Consultant gains read-only visibility into that student's University/Loan
   invitation statuses (Product/02_Business_Rules.md is silent on this; the
   grant is defined here and enforced at the API layer)
   │
   ▼
Engagement ends (student withdraws OR consultant marks complete) ──► Read
   access revoked immediately
```

## 5. Business rules

- Same verification gating as other institution types.
- Cross-module read-access grant is **strictly time-boxed** to the Active
  engagement window — enforced server-side, not just hidden in UI.
- A student can only have one Active consultant engagement at a time
  (`Product/02_Business_Rules.md` rule #8).
- Consultant cannot edit the student's University/Loan invitations — read
  only, to inform their guidance, never to act on the student's behalf.

## 6. Permissions

Consultant: RU on own org profile/catalog, CRUD on own org's offer
templates, conditional read on active clients' other invitations. Super
Admin: full CRUD + verification authority.

## 7. Database tables

`consultancies`, `consultants`, `consulting_packages`,
`consultant_client_relationships`. See `Database/Tables.md`.

## 8. APIs

See `API/Consultant.md`.

## 9. Notifications

Verification approved/rejected · new consultant joined · client's
University/Loan invitation status changed (for active clients) ·
subscription quota alerts.

## 10. Reports

Package-level funnel, average engagement duration, client outcome rate
(engagement → admission).

## 11. Edge cases

- Consultant org wants to specialize by both region and course type →
  modeled as multi-select tags on the org/consultant profile, used as
  AI Matching factors (`Modules/11_AI_Matching.md`).
- Student ends engagement immediately after accepting (buyer's remorse) →
  allowed; engagement marked `WITHDRAWN`, read-access revoked immediately,
  no penalty to student; consultant's acceptance-rate report reflects it.

## 12. Future scope

- In-platform messaging/document collaboration space for active engagements
  (SOP drafts, visa checklist).
- Consultant ratings/reviews from past clients.
