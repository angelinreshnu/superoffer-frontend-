# Global Business Rules

These rules apply platform-wide. Module-specific rules live in the relevant
`Modules/*.md` file and must not contradict this document — this file wins in
case of conflict.

## 1. Identity & Verification

1. A Student account requires a verified email **or** phone before the
   profile can be marked "complete."
2. An Institution account (University / Loan Provider / Consultancy) must be
   verified by a Super Admin (business registration / accreditation document
   review) before any officer under it can search students or send
   invitations. Status: `PENDING_VERIFICATION → VERIFIED → SUSPENDED`.
3. A rejected verification must include a reason, visible to the org's primary
   contact, and can be resubmitted once documents are corrected.

## 2. Profile Visibility

4. A Student profile is only discoverable in Search/AI Matching once
   **Profile Completion ≥ 70%** (configurable by Super Admin, see
   `Modules/12_Settings.md`) and the student has toggled
   "Visible to Institutions" **on** (default: on).
5. Students can restrict visibility by institution type (e.g., hide from Loan
   Providers if they don't need financing) — see `Modules/02_Student_Profile.md`.
6. Contact details (email/phone) are never shown directly to an Institution.
   All communication is routed through the platform (`Modules/08_Notifications.md`)
   until an Offer is **Accepted**, after which limited contact-detail sharing
   is permitted for onboarding purposes.

## 3. Invitations & Offers

7. An Invitation must always carry exactly one Offer. There is no
   "invitation without an offer."
8. A Student may hold unlimited **pending** invitations concurrently, but only
   **one Accepted offer per category** at a time:
   - one Accepted university admission offer,
   - one Accepted loan offer,
   - one Accepted consultant engagement.
   Accepting a new offer in a category that already has an Accepted offer
   requires the student to explicitly withdraw the prior one first.
9. An Invitation expires automatically after **14 days** if no action is
   taken (configurable per org tier). Expired invitations move to
   `EXPIRED` and free up the institution's invitation quota.
10. A Student may **negotiate exactly once** per Invitation. The institution
    may counter any number of times within that single negotiation thread,
    but the student's initiating "request changes" action is a one-time right
    per invitation (prevents endless back-and-forth abuse).
11. An Accepted offer cannot be edited by the institution. To change terms,
    the institution must issue a new Invitation (student must first withdraw
    the old acceptance).
12. Withdrawing an invitation (institution-initiated) or rejecting one
    (student-initiated) is final and cannot be reversed; a new invitation
    must be created to re-engage.

## 4. Search & Matching

13. Search and AI-Matching results are always scoped to the officer's own
    organization's subscription entitlements (result count, refresh
    frequency, filter depth) — see `Modules/10_Subscriptions_Billing.md`.
14. AI Match Scores are recalculated on a schedule (default: daily) and
    whenever a student meaningfully updates their profile (see
    `Modules/11_AI_Matching.md` for triggers).
15. An institution may **save** a search or a shortlist; saved shortlists do
    not consume additional quota beyond the original search.

## 5. Notifications

16. Every state change on an Invitation (sent, viewed, negotiated, accepted,
    rejected, expired, withdrawn) generates a Notification to the affected
    counterpart(s). Notifications are never silently suppressed, only
    batched/digested per user preference (`Modules/12_Settings.md`).

## 6. Data & Compliance

17. Documents uploaded by a Student (transcripts, ID, test scores) are
    encrypted at rest and only accessible to: the student, institutions the
    student has an active/accepted relationship with, and Super Admin for
    moderation/support.
18. All destructive or state-changing admin actions are recorded in the
    Audit Log (`Modules/12_Settings.md`) with actor, before/after state, and
    timestamp — no exceptions.
19. A Student may request full data export or account deletion at any time;
    deletion cascades to profile data but preserves anonymized transaction
    records required for institution reporting/compliance (see
    `Product/07_Non_Functional_Requirements.md`).

## 7. Subscriptions & Access

20. An Institution with an expired or suspended subscription retains read
    access to invitations already sent/accepted, but cannot create new
    searches or invitations until the subscription is reactivated.
