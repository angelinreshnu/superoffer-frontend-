# Module: University Management

## 1. Purpose

Manage University organizations, their officers, programs, and
admission-related offer templates on the platform.

## 2. Actors

University Officer (own org RU), Super Admin (CRUD, verification).

## 3. Features

- Org profile: name, type (public/private), locations/campuses,
  accreditation documents, official domain (for officer email verification).
- Officer management: invite/remove officers under the org (org-admin
  sub-role in Enterprise tier — see Future Scope).
- Program catalog: courses/majors offered, degree levels, intakes, seat
  availability (informational, not real-time seat-locking in v1).
- Offer templates: reusable scholarship/fee-waiver/fast-track templates
  officers can start an Invitation from (speeds up sending consistent offers).
- Admission criteria profile: feeds AI Matching (`Modules/11_AI_Matching.md`)
  — target score ranges, preferred curricula, historical admit profile.

## 4. Workflow

```
Org signs up ──► Submits accreditation/business documents ──► Super Admin
   reviews ──► VERIFIED / REJECTED (with reason)
   │
   ▼
Verified org ──► Officers can search/invite (Modules/06_Search.md,
                  Modules/07_Invitations.md)
   │
   ▼
Org maintains program catalog + offer templates (ongoing)
   │
   ▼
Org subscription tier gates quota (Modules/10_Subscriptions_Billing.md)
```

## 5. Business rules

- Officer accounts can only be created under a `VERIFIED` org, or exist in
  `PENDING` limbo (read-only dashboard) if the org isn't verified yet
  (`Product/02_Business_Rules.md` rule #2).
- Program catalog entries are informational for matching; SuperOffer does not
  guarantee seat availability — actual admission decision remains with the
  University off-platform after acceptance.
- Offer templates cannot be sent as-is without an officer explicitly
  confirming per-student terms (prevents accidental mass-generic offers).

## 6. Permissions

See `Product/03_RBAC.md`. University Officer: RU on own org profile/catalog,
CRUD on own org's offer templates. Super Admin: full CRUD + verification
authority.

## 7. Database tables

`universities`, `university_officers`, `university_programs`,
`university_offer_templates`, `university_admission_criteria`. See
`Database/Tables.md`.

## 8. APIs

See `API/University.md`.

## 9. Notifications

Verification approved/rejected · new officer invited/joined · subscription
quota alerts.

## 10. Reports

Program-level funnel (which programs get the most accepted offers), officer
activity within org.

## 11. Edge cases

- University wants to represent multiple campuses under one legal entity →
  modeled as one `universities` org record with multiple `campus` sub-records
  (see `Database/Tables.md`), sharing one subscription.
- Accreditation document expires → Super Admin can flag org for
  re-verification without fully suspending existing invitations.

## 12. Future scope

- `ORG_ADMIN` sub-role for billing/seat management separate from admissions
  officers.
- Real-time seat availability sync via API integration.
