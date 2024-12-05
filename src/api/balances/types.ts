export type UserBalance = {
  userId: string;
  balance: number;
  earned: number;
  spent: number;
  payout: number;
  paidOut: number;
};

export type Payout = {
  userId: string;
  payoutAmount: number;
  payoutCount: number;
};
