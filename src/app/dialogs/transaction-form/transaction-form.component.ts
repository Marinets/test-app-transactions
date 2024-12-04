import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, NonNullableFormBuilder, Validators} from '@angular/forms';
import {
  TransactionCategory,
  TransactionCategoryStrings,
  TransactionItem,
  TransactionType,
  TransactionTypeStrings
} from '../../models/transactions.model';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  standalone: false,
  styleUrl: './transaction-form.component.scss'
})
export class TransactionFormComponent {

  readonly form: FormGroup;

  TransactionTypeStrings = TransactionTypeStrings;
  TransactionCategoryStrings = TransactionCategoryStrings;

  get name(): FormControl {
    return this.form.get('name') as FormControl;
  }

  get amount(): FormControl {
    return this.form.get('amount') as FormControl;
  }

  get type(): FormControl {
    return this.form.get('type') as FormControl;
  }

  get category(): FormControl {
    return this.form.get('category') as FormControl;
  }

  get date(): FormControl {
    return this.form.get('date') as FormControl;
  }

  constructor(
    public fb: NonNullableFormBuilder,
    public dialogRef: MatDialogRef<TransactionFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TransactionItem | undefined,
  ) {
    this.form = this.fb.group({
      name: this.fb.control<string>(data ? data.name : '', Validators.required),
      amount: this.fb.control<number>(data ? data.amount : 0, Validators.required),
      type: this.fb.control<TransactionType | null>(
        { value: data ? data.type : null, disabled: false },
        Validators.required
      ),
      category: this.fb.control<TransactionCategory | null>(
        { value: data ? data.category : null, disabled: false },
        Validators.required
      ),
      date: this.fb.control<Date>(data ? data.date : new Date, Validators.required)
    });

  }

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.form.updateValueAndValidity();
      return;
    }
    this.dialogRef.close(this.form.value);
  }

}
