import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './transactions-list/transactions.component';
import { CreateTransactionsComponent } from './create-transactions/create-transactions.component';
import { MaterialModule } from '../../core/material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [TransactionsComponent, CreateTransactionsComponent],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CoreModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule
  ],
})
export class TransactionsModule {}
