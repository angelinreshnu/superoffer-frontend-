# User: University Admission Officer

## 1. Role overview

Represents a University org. Searches the student pool, evaluates AI match
scores, shortlists candidates, and sends Invitations bundled with an
admission-related Offer (scholarship %, fee waiver, fast-track admission,
etc.).

## 2. Dashboard

- **Org subscription status** widget (quota usage: searches, invitations
  remaining this cycle).
- **Active Shortlists**.
- **Sent Invitations** (status breakdown: Sent / Viewed / Negotiating /
  Accepted / Rejected / Expired).
- **Recommended Students** (AI-surfaced, ranked by Match Score).
- **Team** (other officers under the same University org, Enterprise tier).

## 3. Navigation

`Dashboard → Search Students → Shortlists → Invitations → Reports → Org Settings`

## 4. Responsibilities

- Search/filter the student pool using advanced filters and/or AI natural
  language search.
- Build and maintain shortlists.
- Send Invitations with a clearly defined Offer.
- Respond to student negotiation requests.
- Track invitation outcomes and report on admissions funnel performance.

## 5. Permissions

See `Product/03_RBAC.md`. Read access to the student pool scoped to org
subscription quota; create/update access only to invitations/offers
originated by their own org; no access to other universities' or other
institution types' invitations to the same student.

## 6. Complete workflow

```
University Officer
  │
  ▼
Login (org must be Verified) ────────► See Modules/01_Authentication.md
  │
  ▼
Search Students (filters or AI NL search) ──► See Modules/06_Search.md
  │
  ▼
Review Match Scores & Profiles ──────► See Modules/11_AI_Matching.md
  │
  ▼
Shortlist candidates (optional)
  │
  ▼
Send Invitation + Offer ─────────────► See Modules/07_Invitations.md
  │
  ▼
Track status ── Viewed → Negotiating → Accepted / Rejected / Expired
  │
  ├─► If Negotiating: review counter-request, respond with revised terms
  │                    or hold firm
  │
  ▼
Report on outcomes ──────────────────► See Modules/09_Reports_Analytics.md
  │
  ▼
Logout
```

Full workflow: `Workflows/University_Workflow.md`.

## 7. Business rules specific to this role

- Cannot exceed monthly search/invitation quota tied to org subscription tier
  (`Product/05_Revenue_Model.md`, `Modules/10_Subscriptions_Billing.md`).
- Cannot view a student's contact details until an offer is Accepted
  (`Product/02_Business_Rules.md` rule #6).
- Cannot edit an Accepted offer — must issue a new invitation after the
  student withdraws (rule #11).

## 8. Notifications received

Student viewed invitation · Student accepted/rejected/negotiated · Invitation
expiring soon · Quota nearing limit · Org verification status changes.

## 9. Reports available

Funnel report (sent → viewed → accepted), average time-to-response, top
match-score bands converting best, shortlist performance.

## 10. Edge cases

- Officer sends invitation, then org subscription lapses before student
  responds → invitation remains valid/visible to student, but officer's org
  cannot send *new* invitations until reactivated (rule #20).
- Two officers in the same org shortlist the same student → shared
  visibility of shortlist within org (Enterprise tier), no duplicate
  invitations allowed to the same student for the same program cycle.
