# Module: Student Profile

## 1. Purpose

The structured, searchable record that represents a Student across the
entire platform — the single artifact institutions search, score, and invite
against.

## 2. Actors

Student (owner, full CRUD), Institution Officers (read, scoped via Search —
see `Modules/06_Search.md`), Super Admin (support read).

## 3. Features / Profile sections

| Section | Fields (representative, not exhaustive) |
|---|---|
| Personal | Name, DOB, nationality*, contact (private), profile photo |
| Academic history | Institutions attended, grading system + score, graduation year, curriculum |
| Standardized tests | Test type (IELTS/TOEFL/SAT/GRE/GMAT/etc.), score, date, expiry |
| Preferences | Target country/countries, target course(s)/major, degree level, intake term |
| Financial | Budget band, scholarship need (yes/no + detail), guarantor info (for loan matching) |
| Documents | Transcripts, ID, test score reports, statement of purpose draft |
| Visibility settings | Overall visible toggle, per-institution-type visibility, blocklist of specific orgs (optional) |

\*Nationality/immutable demographic fields are collected only where required
for visa/eligibility matching and are never used as AI scoring inputs beyond
that legitimate purpose (`Product/04_AI_Matching_Engine.md` §6).

## 4. Workflow

```
Create profile (post-registration) ──► Fill sections incrementally
   │
   ▼
Profile Completion % recalculated on every save
   │
   ├─► < threshold (default 70%) ──► Not discoverable in Search
   └─► ≥ threshold + visibility ON ──► Discoverable, eligible for AI Matching
   │
   ▼
Upload documents ──► Queued for verification ──► Verified / Rejected (with reason)
   │
   ▼
Edit anytime ──► Triggers AI re-score if a scoring-relevant field changed
                 (see Modules/11_AI_Matching.md §3)
```

## 5. Business rules

- Discoverability threshold and visibility toggle behavior per
  `Product/02_Business_Rules.md` rules #4–5.
- Contact details never exposed to institutions pre-acceptance (rule #6).
- A profile edit **does not** retroactively change terms of an already-sent
  Invitation (immutability of Offer terms at send time,
  `Modules/07_Invitations.md`).
- Document verification is per-document (a rejected transcript doesn't block
  an already-verified test score).

## 6. Permissions

Full CRUD: Student (own profile only). Read (scoped, via search/match
results only — never direct profile browsing): Institution officers. Support
read: Super Admin (audit-logged). See `Product/03_RBAC.md`.

## 7. Database tables

`students`, `student_academic_records`, `student_test_scores`,
`student_preferences`, `student_documents`, `student_visibility_settings`.
See `Database/Tables.md`.

## 8. APIs

See `API/Student.md` (`GET/PUT /students/me`, `POST /students/me/documents`,
`PUT /students/me/visibility`, etc.).

## 9. Notifications

Profile completion reminders (if incomplete after N days) · document
verification result · "your profile was matched to N new opportunities this
week" digest (opt-in).

## 10. Reports

Profile completion distribution, document verification turnaround time,
most-missing fields (product analytics, Super Admin view).

## 11. Edge cases

- Student uploads a document in an unsupported format → rejected at upload
  with a clear error; does not count against any quota.
- Student's grading system doesn't map cleanly to a standard scale → allow
  free-text grading system field + raw score, flagged for manual normalization
  in AI Matching input pipeline.
- Student sets visibility OFF while an invitation is pending → pending
  invitation is unaffected; only future search visibility is impacted.

## 12. Future scope

- Profile "strength score" coaching (beyond simple % complete).
- Video introduction upload.
- Portfolio/work-sample attachments for certain course types.
