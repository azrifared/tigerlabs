This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This application should cover below functionalities

1. Include 2 pages
    - **Claim list**: Table format with the following fields
        - Claim id
        - Status
        - Claim amount
        - Holder name
        - Policy number
        - Insured item
        - Description
        - Incident date
        - Processing fee
        - Total amount (Claim amount + Processing fee)
        - Created at
    - **Create claim page**, which contains:
        - Policy number
        - Holder name
        - Insured item
        - Claim amount: string, 2 decimal point. e.g: "15.50"
        - Description
        - Incident date
        - Processing fee: string, 2 decimal point. e.g: "15.50"
2. Able to search by:
    - `claim id`; or
    - `holder name`; or
    - `policy number `
3. Able to filter by `status` (select). Statuses are:
    - `Submitted`
    - `Approved`
    - `Processed`
    - `Completed`
    - `Rejected`
4. Use any CSS framework
5. Use any framework or library. We recommend React.
6. Integrate with third party library. At least date picker
7. Able to sort by
    - `newly created`
    - `latest created`
    - `smallest claim amount`
    - `largest claim amount`
    - `smallest processing fee`
    - `largest processing fee`
    - `smallest total amount`
    - `largest total amount`
8. Include validation for all fields is required.
9. Include validation for incident date to be more than 6 months and less than tomorrow