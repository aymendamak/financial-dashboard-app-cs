export interface Transaction {
  id: number;
  date: Date;
  description: string;
  amount: number;
  category: string;
  type: string;
}

export interface TransactionCreateError {
  msg: string;
}
