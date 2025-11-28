import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { authGuard } from './auth/guards/auth.guard';
import { adminGuard } from './auth/guards/admin.guard';

const routes: Routes = [

 {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full' // Ensures only an exact match of '' redirects
  },

  // 2. Lazy Load Auth Module: When the URL is '/auth', load the AuthModule.
  //    This handles both '/auth' and its children like '/auth/login', '/auth/register'.
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) //
  },

  // 3. Protected Routes (Dashboard)
  {
  path: 'dashboard',
  component: MainLayoutComponent,
  children: [
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
    },
    {
      path: 'home',
      component: DashboardComponent,
      canActivate: [authGuard]
    },
    {
      path: 'transactions',
      loadChildren: ()=> import('./transactions/transactions.module').then(m=> m.TransactionsModule),
      canActivate: [authGuard],
    
    },
    {
      path: 'categories',
      loadChildren: ()=> import('./category/category.module').then(m=> m.CategoryModule),
      canActivate: [authGuard],
    
    },
    
    {
      path: 'users',
      component: UsersComponent,
      canActivate: [authGuard, adminGuard]
    }
  ]
},
  
  // 4. Wildcard Route (404 Page - Optional)
  { path: '**', redirectTo: 'auth' }
    ];
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
