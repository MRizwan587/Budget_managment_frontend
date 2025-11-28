export interface ITransaction {
  _id: string;
  user: string;
  category: string;
  type: TransactionType;
  amount: number;
  description: string;
  date: string;
  createdAt: string;
}

export enum TransactionType {
  INCOME = 'Income',
  EXPENSE = 'Expense'
}

export interface ITransactionRequest {
  category: string;
  type: 'income' | 'expense';
  amount: number;
  description?: string;
}
