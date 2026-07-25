# Module: Search

## 1. Purpose

Let Institution officers find relevant students in the pool, via advanced
structured filters and/or AI-powered natural language search.

## 2. Actors

University Officer, Loan Officer, Consultant (all read-only, org-scoped),
Super Admin (unrestricted, for support).

## 3. Features

- **Advanced filters**: target country, course/major, degree level, test
  scores (range), budget band, admission status, intake term — filter set
  varies slightly by institution type (loan providers add financing-need
  filters; consultants add "guidance need" filters).
- **AI natural language search**: free-text query (e.g., "Master's in Data
  Science students targeting Canada with IELTS 7+") parsed into structured
  filters + semantic ranking — see `Modules/11_AI_Matching.md` for scoring.
- **Saved searches**: store a filter set + name for reuse.
- **Shortlists**: save specific student results into a named list for later
  action (does not consume additional search quota).
- **Result ranking**: default sort by AI Match Score; secondary sort options
  (recency, profile completion).

## 4. Workflow

```
Officer opens Search ──► Enters filters OR natural-language query
   │
   ▼
Query parsed (NL → structured filters, if applicable)
   │
   ▼
Pool queried, scoped to: (a) students meeting visibility threshold, (b) org's
   quota remaining
   │
   ▼
Results ranked by Match Score, returned with factor explanations
   │
   ▼
Officer: view profile (limited/no-contact-info view) ──► shortlist and/or
   send invitation (Modules/07_Invitations.md)
```

## 5. Business rules

- A "search" consumes quota based on **profile views**, not queries — running
  the same saved search twice without opening new profiles doesn't
  double-charge quota (`Product/05_Revenue_Model.md`).
- Only students meeting the visibility/discoverability threshold appear
  (`Product/02_Business_Rules.md` rule #4).
- Students who have explicitly hidden themselves from an institution type
  (rule #5) are excluded from that type's search results entirely — not just
  down-ranked.
- Contact details never appear in search results (rule #6).

## 6. Permissions

Read-only for Institution officers, scoped to their own org's quota and
allowed filter depth (tier-gated — deeper filters/segments on higher tiers).
Super Admin: unrestricted read, for support/investigation only.

## 7. Database tables

`search_queries` (saved searches), `shortlists`, `shortlist_items`. Search
itself runs against `students` + `student_*` tables via an indexed/denormalized
read model (see `Database/Tables.md` and `Database/ERD.md`).

## 8. APIs

See relevant institution API files (`API/University.md`, `API/Education_Loan.md`,
`API/Consultant.md`) — search endpoints are namespaced per institution type
but share the same underlying contract shape.

## 9. Notifications

None directly (search is a pull action), though "new matching students
available" digest notifications are sent based on saved search criteria
(opt-in, see `Modules/08_Notifications.md`).

## 10. Reports

Search-to-invitation conversion rate, most-used filters, saved search
performance.

## 11. Edge cases

- Officer's quota runs out mid-search-session → already-open results remain
  viewable; new profile views blocked with an upgrade prompt.
- Natural language query is ambiguous/unparseable → falls back to keyword
  search across profile text fields with a "did you mean to use filters?"
  prompt, never a hard error.

## 12. Future scope

- Boolean/complex filter combinations (AND/OR/NOT groups).
- Search-as-you-type profile preview.
- Cross-org benchmark search insights (anonymized, e.g., "typical accepted
  profile for this program").
