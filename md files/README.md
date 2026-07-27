# SuperOffer — Product Documentation

SuperOffer is a **reverse education marketplace**. Instead of students hunting for
universities, loans, and consultants, verified institutions come to students —
searching profiles, and sending **Invitations** that carry a concrete **Offer**
(a scholarship, a loan rate, or a consulting engagement). Students compare,
negotiate, and accept — all in one place.

This repository is the single source of truth for product, engineering, and AI
coding assistants (Cursor, Claude Code, Codex) building the platform. It is
organized in layers so that any change touches the fewest files possible.

## How to read this documentation

| Layer | Answers | Folder |
|---|---|---|
| Product | Why does this exist, and what are the rules of the business? | `Product/` |
| Users | What can each type of user do, screen by screen? | `Users/` |
| Modules | How does each feature actually work internally? | `Modules/` |
| Workflows | What is the end-to-end journey across modules? | `Workflows/` |
| Database | What does the data look like? | `Database/` |
| API | How do clients talk to the backend? | `API/` |

**Rule of thumb:** `Users/*.md` files describe *what a role does* and link out to
`Modules/*.md` for *how it works*. Never duplicate module logic inside a user
doc — reference it instead. This keeps the docs maintainable as the product
evolves: change a feature once, in one module file.

## Folder Index

```
SuperOffer/
│
├── README.md                          ← you are here
│
├── Product/                           ← business definition
│   ├── 00_Product_Overview.md
│   ├── 01_User_Roles.md
│   ├── 02_Business_Rules.md
│   ├── 03_RBAC.md
│   ├── 04_AI_Matching_Engine.md
│   ├── 05_Revenue_Model.md
│   ├── 06_Glossary.md
│   └── 07_Non_Functional_Requirements.md
│
├── Users/                             ← role-centric docs
│   ├── Student.md
│   ├── University_Admission_Officer.md
│   ├── Education_Loan_Officer.md
│   ├── Study_Abroad_Consultant.md
│   └── Super_Admin.md
│
├── Modules/                           ← feature-centric docs
│   ├── 01_Authentication.md
│   ├── 02_Student_Profile.md
│   ├── 03_University_Management.md
│   ├── 04_Education_Loan_Management.md
│   ├── 05_Study_Abroad_Consultant_Management.md
│   ├── 06_Search.md
│   ├── 07_Invitations.md
│   ├── 08_Notifications.md
│   ├── 09_Reports_Analytics.md
│   ├── 10_Subscriptions_Billing.md
│   ├── 11_AI_Matching.md
│   └── 12_Settings.md
│
├── Workflows/                         ← end-to-end journeys
│   ├── Student_Workflow.md
│   ├── University_Workflow.md
│   ├── Education_Loan_Workflow.md
│   ├── Consultant_Workflow.md
│   └── Admin_Workflow.md
│
├── Database/                          ← data model
│   ├── ERD.md
│   ├── Tables.md
│   ├── Relationships.md
│   └── Naming_Conventions.md
│
└── API/                                ← integration contract
    ├── Authentication.md
    ├── Student.md
    ├── University.md
    ├── Education_Loan.md
    ├── Consultant.md
    ├── Invitations.md
    └── Admin.md
```

## Core concept, in one paragraph

A **Student** builds one rich profile once. **Universities**, **Education Loan
Providers**, and **Study Abroad Consultants** — collectively called
**Institutions** — search and get AI-ranked matches against that pool of
profiles, then send an **Invitation** attached to a concrete **Offer**. The
Student reviews all incoming invitations side by side, can **negotiate** terms
once, and ultimately **accepts** a single offer per category (one university
admission, one loan, one consultant engagement can be "active" at a time,
though a student may hold multiple *pending* invitations simultaneously).

## Documentation philosophy

- **Product/** defines the business — the rules that are true no matter who
  is using the product.
- **Users/** defines what each actor can do — task-oriented, dashboard by
  dashboard.
- **Modules/** defines how each feature behaves internally — the
  implementation contract.
- **Workflows/** stitches modules together into a real, chronological journey.
- **Database/** and **API/** are the concrete technical contracts derived from
  everything above.

When a feature changes, update the **Module** file (source of truth) and the
**API** file if the contract changed. User docs and workflow docs should only
need updates when the *sequence of steps a human takes* changes, not when
internal logic changes.
