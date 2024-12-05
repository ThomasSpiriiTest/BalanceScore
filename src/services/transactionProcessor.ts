import { Transaction } from "../api/transactions/types";
import { getUserBalance, UserBalance } from "../api/balances";

const computeLatestBalancePromise = async (
  userId: string,
  transactions: Transaction[],
): Promise<UserBalance> => {
  const latestBalance = getUserBalance(userId);

  transactions.forEach((transaction) => {
    switch (transaction.type) {
      case "earned":
        latestBalance.earned += transaction.amount;
        latestBalance.balance += transaction.amount;
        break;
      case "spent":
        latestBalance.spent += transaction.amount;
        latestBalance.balance -= transaction.amount;
        break;
      case "payout":
        latestBalance.paidOut += transaction.amount;
        latestBalance.payout += 1;
        latestBalance.balance -= transaction.amount;
        break;
    }
  });

  return latestBalance;
};

const getTransactionsPerUserId = (
  transactions: Transaction[],
): Record<string, Transaction[]> => {
  return transactions.reduce<Record<string, Transaction[]>>(
    (acc, transaction) => {
      acc[transaction.userId] = acc[transaction.userId] || [];
      acc[transaction.userId].push(transaction);

      return acc;
    },
    {},
  );
};

export const processTransactions = (
  transactions: Transaction[],
): Promise<UserBalance>[] => {
  const transactionBatchesPerUser: Record<string, Transaction[]> =
    getTransactionsPerUserId(transactions);

  return Object.entries(transactionBatchesPerUser).map(
    (transactionBatchPerUser) => {
      const userId = transactionBatchPerUser[0];
      const transactionBatch = transactionBatchPerUser[1];

      return computeLatestBalancePromise(userId, transactionBatch);
    },
  );
};
