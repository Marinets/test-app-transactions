import { Pipe, PipeTransform } from '@angular/core';
import {TransactionCategory, TransactionCategoryStrings} from '../models/transactions.model';

@Pipe({
  name: 'transactionCategory',
  standalone: true,
})
export class TransactionCategoryPipe implements PipeTransform {

  transform(value: number | string): string {
    return TransactionCategoryStrings[value as TransactionCategory] || '-';
  }

}
