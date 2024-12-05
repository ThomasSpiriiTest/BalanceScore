import { UserBalance } from "../api/balances";

// This is our mocked storage of Balances. It would be a DB in a real scenario
export const balancesRecords = new Map<string, UserBalance>([
  [
    "1",
    { userId: "1", balance: 5, earned: 20, spent: 5, payout: 2, paidOut: 10 },
  ],
  [
    "2",
    { userId: "2", balance: 10, earned: 30, spent: 10, payout: 3, paidOut: 15 },
  ],
]);
