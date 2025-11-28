import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransactionsComponent } from './transactions/transactions.component';
import { CreateTransactionsComponent } from './create-transactions/create-transactions.component';

const routes: Routes = [

  {
      path: '',
      redirectTo: '', // Redirects '/auth' to '/auth/login'
      pathMatch: 'full'
    },
  
    // 2. Login Path: Handles the '/auth/login' route.
    {
      path: '',
      component: TransactionsComponent 
    },
    {
      path: 'create-transactions',
      component: CreateTransactionsComponent
    }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule { }
