import { balancesRecords } from "../../mocks/balances";
import { UserBalance, Payout } from "./types";

const userBalanceExists = (userId: string): boolean => {
  return balancesRecords.has(userId);
};

const getUserBalance = (userId: string): UserBalance => {
  return (
    balancesRecords.get(userId) || {
      userId,
      balance: 0,
      earned: 0,
      spent: 0,
      payout: 0,
      paidOut: 0,
    }
  );
};

const getPayouts = (): Payout[] => {
  return [...balancesRecords].map((balanceRecord): Payout => {
    const userId = balanceRecord[0];
    const balance = balanceRecord[1];

    return {
      userId: userId,
      payoutAmount: balance.paidOut,
      payoutCount: balance.payout,
    };
  });
};

export { UserBalance, Payout, getPayouts, getUserBalance, userBalanceExists };
