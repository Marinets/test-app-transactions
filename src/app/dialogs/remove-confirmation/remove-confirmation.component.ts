import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {TransactionItem} from '../../models/transactions.model';

@Component({
  selector: 'app-remove-confirmation',
  templateUrl: './remove-confirmation.component.html',
  standalone: false,
  styleUrl: './remove-confirmation.component.scss'
})
export class RemoveConfirmationComponent {

  public text?: string;

  constructor(
    public dialogRef: MatDialogRef<RemoveConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TransactionItem,
  ) {
    this.text = `Are you sure that you want to delete transaction: ${this.data.name}`
  }

  submit() {
    this.dialogRef.close(true);
  }

}
