import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './transactions/transactions.component';
import { CreateTransactionsComponent } from './create-transactions/create-transactions.component';


@NgModule({
  declarations: [
    TransactionsComponent,
    CreateTransactionsComponent
  ],
  imports: [
    CommonModule,
    TransactionsRoutingModule
  ]
})
export class TransactionsModule { }
