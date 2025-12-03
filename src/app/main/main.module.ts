import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryModule } from './categories/category.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { MaterialModule } from '../core/material/material.module';
import { TransactionsModule } from './transactions/transactions.module';
import { CoreModule } from '../core/core.module';



@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent

  ],
  imports: [
    CommonModule,
    MaterialModule,
    TransactionsModule,
    CategoryModule,
    CoreModule


  ]
})
export class MainModule { }
