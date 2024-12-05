import { sample } from "lodash";
import { v4 as uuidv4 } from "uuid";
import { Transaction, TransactionType } from "../api/transactions/types";

const userIds = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
const types = ["payout", "spent", "earned"];

export const getNewTransaction = (): Transaction => {
  return {
    id: uuidv4(),
    userId: sample(userIds) as string,
    createdAt: new Date().toISOString(),
    type: sample(types) as TransactionType,
    amount: Math.floor(Math.random() * 100),
  };
};

export const getNewTransactions = (count: number): Transaction[] => {
  return Array.from({ length: count }, () => getNewTransaction());
};
