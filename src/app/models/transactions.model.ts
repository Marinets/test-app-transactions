
export interface TransactionCreate {
  name: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  date: Date;
}

export interface TransactionItem extends TransactionCreate {
  id: string;
}

export enum TransactionType {
  INCOME,
  EXPENSES
}

type TransactionTypeDictionary = {
  [key in TransactionType]: string;
};

export const TransactionTypeStrings: TransactionTypeDictionary = {
  [TransactionType.INCOME]: 'Income',
  [TransactionType.EXPENSES]: 'Expenses',
}

export enum TransactionCategory {
  GROCERIES,
  SALARY,
  ENTERTAINMENT
}

type TransactionCategoryDictionary = {
  [key in TransactionCategory]: string;
};

export const TransactionCategoryStrings: TransactionCategoryDictionary = {
  [TransactionCategory.GROCERIES]: 'Groceries',
  [TransactionCategory.SALARY]: 'Salary',
  [TransactionCategory.ENTERTAINMENT]: 'Entertainment',
}
