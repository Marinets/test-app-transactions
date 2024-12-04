import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule, MatDatepickerToggle} from '@angular/material/datepicker';
import {MatTableModule} from '@angular/material/table';
import {MatOption} from '@angular/material/autocomplete';
import {MatSelect} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormattedDatePipe} from './pipes/formatted-date.pipe';
import {RemoveConfirmationComponent} from './dialogs/remove-confirmation/remove-confirmation.component';
import {TransactionFormComponent} from './dialogs/transaction-form/transaction-form.component';
import {TransactionsPageComponent} from './pages/transactions-page/transactions-page.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TransactionCategoryPipe} from './pipes/transaction-category.pipe';
import {MatSort, MatSortHeader, MatSortModule} from "@angular/material/sort";
import {FormattedDirectoryPipe} from './pipes/formatted-directory.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RemoveConfirmationComponent,
    TransactionFormComponent,
    TransactionsPageComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatDatepickerToggle,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatSelect,
    MatOption,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FormattedDatePipe,
    TransactionCategoryPipe,
    MatSortModule,
    FormattedDirectoryPipe
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
