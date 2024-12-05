import { TransactionPage } from "./types";
import { pushTransactions } from "../../services/balancesCache";
import { getNewTransactions } from "../../mocks/transactions";

const getFakeTransactions = async (
  number: number,
): Promise<TransactionPage> => {
  return {
    items: [...getNewTransactions(number)],
    meta: {
      totalItems: 1200,
      itemCount: number,
      itemsPerPage: number,
      totalPages: 400,
      currentPage: 1,
    },
  };
};

const triggerTransactionFetch = () => {
  /* Once the app the running we will start fetching transaction every 10 sec */
  console.log("Transactions API fetched in 10 seconds");

  setInterval(() => {
    console.log("Transactions API is ready to be fetched");
    getFakeTransactions(100).then((transactionPage) => {
      console.log("Transactions API fetched. Pushing transactions to cache");
      return pushTransactions(transactionPage.items);
    });
  }, 10000);
};

export { triggerTransactionFetch };
