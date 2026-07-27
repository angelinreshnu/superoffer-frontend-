# User Roles

## 1. Role list

| Role code | Display name | Belongs to org? | Doc |
|---|---|---|---|
| `STUDENT` | Student | No (individual) | `Users/Student.md` |
| `UNIVERSITY_OFFICER` | University Admission Officer | Yes — University | `Users/University_Admission_Officer.md` |
| `LOAN_OFFICER` | Education Loan Officer | Yes — Loan Provider | `Users/Education_Loan_Officer.md` |
| `CONSULTANT` | Study Abroad Consultant | Yes — Consultancy | `Users/Study_Abroad_Consultant.md` |
| `SUPER_ADMIN` | Super Admin | Yes — Platform | `Users/Super_Admin.md` |

A future `ORG_ADMIN` sub-role (manages seats/billing for a University, Loan
Provider, or Consultancy without being an individual officer) is noted as a
**Future Scope** item in `Modules/03_University_Management.md`,
`04_Education_Loan_Management.md`, and `05_Study_Abroad_Consultant_Management.md`.

## 2. Role relationships

```
SUPER_ADMIN
   │  configures & audits
   ▼
┌───────────────┬───────────────┬────────────────────┐
│ University     │ Loan Provider  │ Consultancy         │
│ (org)          │ (org)          │ (org)                │
│  └─ UNIVERSITY_ │  └─ LOAN_      │  └─ CONSULTANT        │
│     OFFICER     │     OFFICER    │                       │
└───────┬────────┴───────┬────────┴──────────┬───────────┘
        │  invitations    │ invitations        │ invitations
        └────────────────►│◄───────────────────┘
                           ▼
                       STUDENT
```

- Institution-side roles (`UNIVERSITY_OFFICER`, `LOAN_OFFICER`, `CONSULTANT`)
  belong to exactly one organization and inherit that organization's
  **Subscription** tier (`Modules/10_Subscriptions_Billing.md`), which gates
  search volume, invitation volume, and AI-matching depth.
- `STUDENT` never belongs to an organization and never pays a subscription in
  v1 (see `Product/05_Revenue_Model.md`).
- `SUPER_ADMIN` is platform-internal only; never assigned to external users.

## 3. Role → primary jobs-to-be-done

| Role | Job to be done |
|---|---|
| Student | "Help me get the best admission + funding + guidance with the least manual searching." |
| University Officer | "Help me fill my seats/scholarships with qualified, likely-to-enroll students, fast." |
| Loan Officer | "Help me find creditworthy students and convert them into disbursed loans." |
| Consultant | "Help me acquire students who already intend to study abroad." |
| Super Admin | "Keep the marketplace trustworthy, compliant, and growing." |

## 4. Permission summary (see `Product/03_RBAC.md` for the full matrix)

- **Student**: full control of own profile & documents; read/respond to
  invitations addressed to them; no visibility into other students.
- **University/Loan/Consultant officer**: read access to the student pool
  (subject to subscription limits and student consent/visibility settings);
  write access only to invitations/offers they originate; no access to other
  organizations' data.
- **Super Admin**: full read across the platform; write access to
  configuration, verification, subscriptions, and moderation actions; all
  actions are audit-logged (`Modules/12_Settings.md`).
