/* This will be used to store data from the transactions.
 * As the fetch rate is limited, and as we must ensure data "freshness" we will process and
 * store balance in the cache.
 *
 * The cache can either store the transactions or already aggregated data based on our needs.
 * Here I decided to store the updated balance per user as:
 *  - We know we have 1000 transactions per call (so not a huge amount of transaction to process
 *  per call)
 *  - We know we can't make more than 5 calls per minutes (1 per 12 seconds). So we have a low risk of
 *  being a bottleneck
 */
import { UserBalance } from "../api/balances";
import { balancesRecords } from "../mocks/balances";
import { Transaction } from "../api/transactions/types";
import { processTransactions } from "./transactionProcessor";

export const pushTransactions = async (
  transactions: Transaction[],
): Promise<void[]> => {
  const promises = processTransactions(transactions).map((balanceProcessor) => {
    balanceProcessor.then((balance) => {
      storeBalance(balance.userId, balance);
    });
  });

  return Promise.all(promises);
};

export const storeBalance = (
  userId: string,
  latestBalance: UserBalance,
): void => {
  balancesRecords.set(userId, latestBalance);
};
