import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './transactions/transactions.component';
import { CreateTransactionsComponent } from './create-transactions/create-transactions.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule , FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    TransactionsComponent,
    CreateTransactionsComponent
  ],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class TransactionsModule { }
