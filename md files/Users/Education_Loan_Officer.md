# User: Education Loan Officer

## 1. Role overview

Represents an Education Loan Provider org (bank/NBFC/specialized lender).
Searches students who have financing needs, evaluates eligibility signals,
and sends Invitations bundled with a loan Offer (interest rate, processing
fee, repayment terms).

## 2. Dashboard

- **Org subscription status** widget.
- **Sent Invitations** by status.
- **Eligibility funnel**: students matched vs. invited vs. accepted.
- **Recommended Students** ranked by Match Score + declared financial need.

## 3. Navigation

`Dashboard → Search Students → Eligibility Review → Invitations → Reports → Org Settings`

## 4. Responsibilities

- Search/filter students by financing need, target country, admission status.
- Evaluate student (and guarantor, if provided) eligibility signals available
  on the profile.
- Send loan Invitations with clear terms.
- Respond to negotiation requests (e.g., rate reduction ask).
- Track disbursement-relevant outcomes for reporting (note: actual
  disbursement happens off-platform — see `Product/00_Product_Overview.md` §8).

## 5. Permissions

See `Product/03_RBAC.md`. Same shape as University Officer, scoped to Loan
Provider org and loan-type invitations only.

## 6. Complete workflow

```
Loan Officer
  │
  ▼
Login (org must be Verified) ────────► See Modules/01_Authentication.md
  │
  ▼
Search Students (financing-need filters, AI NL search) ─► See Modules/06_Search.md
  │
  ▼
Evaluate eligibility (profile + guarantor info if present)
  │
  ▼
Send Invitation + Loan Offer ─────────► See Modules/07_Invitations.md
  │
  ▼
Track status ── Viewed → Negotiating → Accepted / Rejected / Expired
  │
  ├─► If Negotiating: review counter-request (e.g., lower rate), respond
  │
  ▼
Report on outcomes ───────────────────► See Modules/09_Reports_Analytics.md
  │
  ▼
Logout
```

Full workflow: `Workflows/Education_Loan_Workflow.md`.

## 7. Business rules specific to this role

- Loan Offers must clearly state: interest rate, processing fee (or waiver),
  repayment tenure, and any conditions (e.g., "subject to guarantor
  verification") — enforced at the Offer schema level
  (`Modules/04_Education_Loan_Management.md`, `Modules/07_Invitations.md`).
- Cannot present terms as a final binding credit decision on-platform
  (`Product/07_Non_Functional_Requirements.md` §4) — offers are indicative
  pending the lender's own compliant process.
- Same quota, contact-detail, and accept/edit rules as other institution
  roles (`Product/02_Business_Rules.md` rules #6, #9–#11, #20).

## 8. Notifications received

Student viewed/accepted/rejected/negotiated invitation · invitation expiring
soon · quota nearing limit · org verification status changes.

## 9. Reports available

Funnel report, average approval-adjacent turnaround time, offer terms vs.
acceptance rate correlation (e.g., does a 0.5% rate drop meaningfully change
acceptance).

## 10. Edge cases

- Student's declared financial need changes after invitation sent (profile
  edit) → invitation terms are unaffected (locked at send time); officer sees
  a flag that profile data has changed since invite.
- Guarantor information is incomplete → loan officer can still send an
  Invitation but must mark the Offer as "conditional on guarantor
  verification," visible to the student.
