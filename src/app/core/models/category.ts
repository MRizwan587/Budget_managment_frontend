export interface ICategory {
  _id: string;
  name: string;
  type: CategoryType;
  isActive: boolean;
  user: string | null;    // null → global
  createdAt: string;
}

export enum CategoryType {
  INCOME = 'Income',
  EXPENSE = 'Expense'
}
