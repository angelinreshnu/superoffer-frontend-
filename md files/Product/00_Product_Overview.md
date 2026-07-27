# Product Overview

## 1. What is SuperOffer

SuperOffer is a B2B2C marketplace platform that inverts the traditional
education-admissions search. Rather than a student searching hundreds of
university websites, loan comparison sites, and consultant directories, verified
**Institutions** (Universities, Education Loan Providers, Study Abroad
Consultants) search a pool of Student profiles and proactively send
**Invitations** bundled with a concrete, negotiable **Offer**.

## 2. Problem statement

- Students spend months manually researching universities, loan products, and
  consultants, with no way to compare real, personalized offers side by side.
- Universities, lenders, and consultants spend heavily on broad marketing to
  reach a small number of qualified, relevant students.
- Neither side has visibility into the other's real interest until very late
  in the process (e.g., after a full application is submitted).

## 3. Solution

- A single, structured **Student Profile** (academics, test scores, target
  countries/courses, financial need, documents) becomes the "resume" that all
  institutions search against.
- **AI Matching** ranks students for institutions and ranks incoming offers
  for students, so both sides only spend time on high-relevance connections.
- **Invitations + Offers** give students a concrete, comparable artifact
  (e.g., "40% tuition scholarship" or "9.5% interest, 0 processing fee")
  instead of generic marketing.
- Built-in **Negotiation** lets a student request better terms once per
  invitation without leaving the platform.

## 4. Target users

| User | Primary goal on SuperOffer |
|---|---|
| Student | Build one profile, receive and compare real offers, accept the best one |
| University Admission Officer | Find qualified students fast, fill seats/scholarships efficiently |
| Education Loan Officer | Find creditworthy students, grow disbursed loan volume |
| Study Abroad Consultant | Acquire clients who have already expressed genuine intent |
| Super Admin | Keep the marketplace trustworthy, monetized, and healthy |

See `Product/01_User_Roles.md` for role details and `Users/*.md` for full
per-role documentation.

## 5. Platform pillars

1. **Profile** — the structured, verifiable student record (`Modules/02_Student_Profile.md`)
2. **Search & AI Matching** — discovery in both directions (`Modules/06_Search.md`, `Modules/11_AI_Matching.md`)
3. **Invitations & Offers** — the core transaction unit (`Modules/07_Invitations.md`)
4. **Notifications & Reports** — keeping every actor informed and measurable (`Modules/08_Notifications.md`, `Modules/09_Reports_Analytics.md`)
5. **Subscriptions & Billing** — how institutions pay to access the marketplace (`Modules/10_Subscriptions_Billing.md`)

## 6. High-level architecture (product-level, not infra)

```
                     ┌────────────────────┐
                     │   AI Matching       │
                     │   Engine            │
                     └─────────▲──────────┘
                               │ scores
        ┌──────────────┐      │      ┌──────────────────┐
        │  Student      │◄─────┴─────►│ Institutions       │
        │  Profiles     │  search/    │ (Univ / Loan /      │
        │  (pool)       │  match      │  Consultant)         │
        └──────┬────────┘             └─────────┬───────────┘
               │                                  │
               │        Invitations + Offers      │
               └────────────────►◄────────────────┘
                       Negotiation / Accept
                               │
                     ┌─────────▼─────────┐
                     │ Notifications /     │
                     │ Reports / Audit      │
                     └────────────────────┘
```

## 7. Success metrics (north star candidates)

- **Match-to-Accept rate**: % of invitations that end in an accepted offer.
- **Time-to-first-offer**: days from profile completion to first invitation.
- **Institution ROI**: cost per accepted offer vs. traditional acquisition.
- **Profile completion rate** and **document verification rate**.
- **Negotiation resolution rate**: % of negotiations resulting in acceptance
  rather than abandonment.

## 8. What SuperOffer is NOT (v1 scope guardrails)

- Not a general job/gig marketplace — education admissions, financing, and
  consulting only.
- Not a payment processor for tuition or loan disbursement — SuperOffer
  facilitates the *offer and agreement*, not the money movement (see
  `Product/07_Non_Functional_Requirements.md` for compliance boundary).
- Not a public social network — all discovery happens through structured
  search/match, not public browsing/feeds.
