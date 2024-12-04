import {Component, OnDestroy} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {
  TransactionCategory,
  TransactionCategoryStrings,
  TransactionCreate,
  TransactionItem,
  TransactionType,
  TransactionTypeStrings
} from '../../models/transactions.model';
import {MatTableDataSource} from '@angular/material/table';
import {TransactionsStateService} from '../../services/transactions-state.service';
import {firstValueFrom, Subject, takeUntil} from 'rxjs';
import {RemoveConfirmationComponent} from '../../dialogs/remove-confirmation/remove-confirmation.component';
import {TransactionFormComponent} from '../../dialogs/transaction-form/transaction-form.component';
import * as uuid from 'uuid';
import {FormControl, FormGroup, NonNullableFormBuilder, Validators} from '@angular/forms';
import {Sort} from '@angular/material/sort';

@Component({
  selector: 'app-transactions-page',
  templateUrl: './transactions-page.component.html',
  standalone: false,
  styleUrl: './transactions-page.component.scss'
})
export class TransactionsPageComponent implements OnDestroy {

  public totalValue: number = 0;
  public TransactionTypeStrings = TransactionTypeStrings;
  public TransactionCategoryStrings = TransactionCategoryStrings;

  readonly onDestroy$ = new Subject<void>();
  public TransactionType = TransactionType;
  public displayedColumns: string[] = ['name', 'amount', 'category', 'date', 'actions'];

  public sorting?: Sort;
  public dataSource: MatTableDataSource<TransactionItem> = new MatTableDataSource<TransactionItem>([]);

  readonly form: FormGroup;

  get type(): FormControl {
    return this.form.get('type') as FormControl;
  }

  get category(): FormControl {
    return this.form.get('category') as FormControl;
  }

  constructor(
    public fb: NonNullableFormBuilder,
    private dialog: MatDialog,
    private transactionsStateService: TransactionsStateService
  ) {
    this.form = this.fb.group({
      type: this.fb.control<TransactionType | null>(
        { value: null, disabled: false }
      ),
      category: this.fb.control<TransactionCategory | null>(
        { value: null, disabled: false }
      )
    });
    this.form.valueChanges.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe((res: { type: TransactionType | null, category: TransactionCategory | null }) => {
      this.filterList({ type: res.type, category: res.category });
    })
    this.transactionsStateService.transactions$.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe((transactions: TransactionItem[]) => {
      this.filterList({ transactions });
    })
  }

  public sortTable(sorting: Sort): void {
    this.sorting = sorting;
    this.filterList({ sorting });
  }

  private sortList(
    list: TransactionItem[],
    sorting?: Sort
  ): TransactionItem[] {
    if (!sorting || sorting.direction === '') {
      return list;
    }
    return list.sort((a, b) => {
      const aValue = a[sorting.active as keyof TransactionItem];
      const bValue = b[sorting.active as keyof TransactionItem];
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        const aCoef: number = (a.type === TransactionType.INCOME ? 1 : -1);
        const bCoef: number = (b.type === TransactionType.INCOME ? 1 : -1);
        return sorting.direction === 'asc' ?
          aCoef * aValue - bCoef * bValue :
          bCoef * bValue - aCoef * aValue;
      }
      if (aValue instanceof Date && bValue instanceof Date) {
        return sorting.direction === 'asc'
          ? aValue.getTime() - bValue.getTime()
          : bValue.getTime() - aValue.getTime();
      }
      return 0;
    });
  }

  calculateTotal(transactions: TransactionItem[]): number {
    return transactions.reduce((total, transaction) => {
      const amount = transaction.type === TransactionType.INCOME
        ? transaction.amount
        : -transaction.amount;
      return total + amount;
    }, 0);
  }

  private filterList(data: {
    type?: TransactionType | null,
    category?: TransactionCategory | null,
    sorting?: Sort,
    transactions?: TransactionItem[]
  }): void {
    const type = data.type ?? this.type.value;
    const category = data.category ?? this.category.value;
    const sorting = data.sorting ?? this.sorting;
    const list = data.transactions ?? this.transactionsStateService.transactions$.value;

    let filteredList = list.filter(transaction => {
      const matchesType = type !== null ? transaction.type === type : true;
      const matchesCategory = category !== null ? transaction.category === category : true;
      return matchesType && matchesCategory;
    });

    if (sorting) {
      filteredList = this.sortList(filteredList, sorting);
    }

    this.totalValue = this.calculateTotal(filteredList);

    this.dataSource.data = filteredList;
  }

  clearFilter(): void {
    this.form.patchValue({ type: null, category: null });
  }

  public async removeTransaction(data: TransactionItem): Promise<void> {
    const config: MatDialogConfig<TransactionItem> = {
      width: '400px',
      data
    }
    const dialogRef = this.dialog.open(RemoveConfirmationComponent, config);
    const result: boolean | undefined = await firstValueFrom(dialogRef.afterClosed());
    if (result && data.id) {
      this.transactionsStateService.removeTransaction(data.id);
    }
  }

  public async editTransaction(event: TransactionItem): Promise<void> {
    const result: TransactionCreate | undefined = await this.openTransactionForm(event);
    if (result) {
      this.transactionsStateService.editTransaction(event.id, result);
    }
  }

  public async createTransaction(): Promise<void> {
    const result: TransactionCreate | undefined = await this.openTransactionForm();
    if (result) {
      this.transactionsStateService.createTransaction({
        id: uuid.v4(),
        ...result
      });
    }
  }

  private async openTransactionForm(data?: TransactionItem): Promise<TransactionCreate | undefined> {
    const config = {
      width: '400px',
      data
    } as MatDialogConfig<TransactionCreate | undefined>
    const dialogRef = this.dialog.open(TransactionFormComponent, config);
    return await firstValueFrom(dialogRef.afterClosed());
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

}
