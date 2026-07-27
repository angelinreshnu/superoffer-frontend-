# Role-Based Access Control (RBAC)

## 1. Permission legend

`C` = Create · `R` = Read · `U` = Update · `D` = Delete · `-` = No access
`Own` = scoped to the actor's own record/org only

## 2. Core matrix

| Resource | Student | University Officer | Loan Officer | Consultant | Super Admin |
|---|---|---|---|---|---|
| Own user account | CRUD | CRUD | CRUD | CRUD | CRUD |
| Own Student Profile | CRUD | - | - | - | RU (support only) |
| Other Student Profiles | - | R (search results, scoped) | R (search results, scoped) | R (search results, scoped) | R |
| University org record | R (public view) | RU (own org) | - | - | CRUD |
| Loan Provider org record | R (public view) | - | RU (own org) | - | CRUD |
| Consultancy org record | R (public view) | - | - | RU (own org) | CRUD |
| Search (student pool) | - | R (own org quota) | R (own org quota) | R (own org quota) | R (unrestricted) |
| Invitation (create) | - | C (own org) | C (own org) | C (own org) | - |
| Invitation (respond: accept/reject/negotiate) | U (own, addressed to them) | R (own sent) | R (own sent) | R (own sent) | R |
| Offer terms | R (own invitations) | CRU (own org, pre-accept) | CRU (own org, pre-accept) | CRU (own org, pre-accept) | R |
| Notifications | R (own) | R (own) | R (own) | R (own) | R (all, for support) |
| Reports & Analytics | R (own activity) | R (own org) | R (own org) | R (own org) | R (platform-wide) |
| Subscriptions & Billing | - | RU (own org, if org-admin) | RU (own org, if org-admin) | RU (own org, if org-admin) | CRUD |
| AI Matching configuration | - | - | - | - | CRUD |
| Platform Settings | - | - | - | - | CRUD |
| Audit Log | - | - | - | - | R |
| User verification / moderation | - | - | - | - | CRUD |

## 3. Notes

- "Own" scoping is enforced at the API layer via org/user ID on every request
  — no client-side-only enforcement (see `API/*.md` auth sections).
- University/Loan/Consultant officers **never** see each other's
  organizations' invitations or offers to a shared student. Each institution
  only sees the invitations it originated.
- A Student sees **all** invitations addressed to them, across all
  institution types, in one unified inbox (`Modules/07_Invitations.md`).
- Super Admin's read access to Student Profiles is restricted in the UI to a
  support/moderation context and is itself audit-logged (rule #18 in
  `Product/02_Business_Rules.md`).

## 4. Enforcement layers

1. **Authentication** confirms identity (`Modules/01_Authentication.md`).
2. **Authorization middleware** checks role + org ownership on every request
   before it reaches business logic.
3. **Row-level scoping** in the data layer ensures an org's queries can
   structurally never return another org's private records (defense in
   depth, not just app-layer checks).
