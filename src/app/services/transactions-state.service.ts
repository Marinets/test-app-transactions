import { Injectable } from '@angular/core';
import {TransactionCreate, TransactionItem} from '../models/transactions.model';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionsStateService {

  public static readonly TRANSACTION_LIST = 'test_transactions_list';
  transactions$ = new BehaviorSubject<TransactionItem[]>([]);

  constructor() {
    if (typeof localStorage !== 'undefined') {
      const transactionList = localStorage.getItem(TransactionsStateService.TRANSACTION_LIST);
      if (transactionList) {
        try {
          const parsedList = JSON.parse(transactionList);
          if (Array.isArray(parsedList)) {
            this.transactions$.next(parsedList.map((transaction) => {
              return {
                ...transaction,
                date: new Date(transaction.date)
              }
            }));
          }
        } catch (err) {
          console.error('JSON is not valid')
        }
      }
    }
  }

  updateTransactionLocalStorage(list: TransactionItem[]): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(TransactionsStateService.TRANSACTION_LIST, JSON.stringify(list));
    }
  }

  createTransaction(transaction: TransactionItem): void {
    const list = this.transactions$.value;
    list.push(transaction);
    this.transactions$.next(list);
    this.updateTransactionLocalStorage(list)
  }

  removeTransaction(id: string): void {
    const list = this.transactions$.value;
    const index = list.findIndex((transaction: TransactionItem) => transaction.id = id);
    if (index > -1) {
      list.splice(index, 1);
      this.transactions$.next(list);
      this.updateTransactionLocalStorage(list)
    }
  }

  editTransaction(id: string, transaction: TransactionCreate): void {
    const list = this.transactions$.value;
    const index = list.findIndex((transaction: TransactionItem) => transaction.id === id);
    if (index > -1) {
      list[index] = { id, ...transaction };
      this.transactions$.next(list);
      this.updateTransactionLocalStorage(list)
    }
  }

}
