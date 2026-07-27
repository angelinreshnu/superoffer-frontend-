# Workflow: Education Loan Journey

Stitches `Modules/01_Authentication.md`, `04_Education_Loan_Management.md`,
`06_Search.md`, `11_AI_Matching.md`, `07_Invitations.md`,
`09_Reports_Analytics.md`, `10_Subscriptions_Billing.md`.

```
┌─────────────────────────────────────────────────────────────────────┐
│ 1. ORG ONBOARDING (one-time)                                          │
├─────────────────────────────────────────────────────────────────────┤
│ Org signs up → submits license/registration docs → Super Admin         │
│ verifies → VERIFIED → officers unlocked, choose subscription tier      │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│ 2. PRODUCT SETUP (as needed)                                          │
├─────────────────────────────────────────────────────────────────────┤
│ Define loan products (rate range, tenure, collateral) → define         │
│ eligibility criteria (feeds AI Matching) → create offer templates      │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│ 3. DISCOVERY (repeats)                                                 │
├─────────────────────────────────────────────────────────────────────┤
│ Officer searches by financing need/country/admission status ──► results │
│ ranked by Match Score ──► review profile + guarantor info if present   │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│ 4. INVITATION                                                          │
├─────────────────────────────────────────────────────────────────────┤
│ Define Offer terms (rate, fee, tenure, conditions) ──► send            │
│    │                                                                    │
│    ▼                                                                    │
│ Track status: Sent → Viewed → [Negotiating] → Accepted/Rejected/Expired│
│    │                                                                    │
│    └─► If Negotiating (e.g., rate reduction ask): respond with revised │
│         terms or hold firm ──► resolve                                 │
│    │                                                                    │
│    └─► If Accepted: mark as conditional pending guarantor verification │
│         if applicable; actual loan agreement/disbursement proceeds      │
│         off-platform through lender's own process                      │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│ 5. MEASUREMENT                                                         │
├─────────────────────────────────────────────────────────────────────┤
│ Review funnel + rate-sensitivity report → adjust product/offer         │
│ strategy → monitor subscription quota usage                            │
└─────────────────────────────────────────────────────────────────────┘
```

## Key decision points

1. **Verification gate** — as with University.
2. **Conditionality flag** — offers can be sent conditional on guarantor
   verification rather than blocked entirely (see
   `Modules/04_Education_Loan_Management.md` §5, edge case).
3. **Off-platform handoff** — SuperOffer's role ends at "Accepted"; actual
   loan agreement/disbursement is explicitly out of platform scope
   (`Product/00_Product_Overview.md` §8).
