export type TransactionType = "payout" | "spent" | "earned";
export type Transaction = {
  id: string;
  userId: string;
  createdAt: string;
  type: TransactionType;
  amount: number;
};

export type TransactionPage = {
  items: Transaction[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
};
