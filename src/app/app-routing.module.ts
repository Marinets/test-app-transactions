import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TransactionsPageComponent} from './pages/transactions-page/transactions-page.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionsPageComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
