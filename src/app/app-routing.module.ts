import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './core/components/main-layout/main-layout.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { UsersComponent } from './main/users/users.component';
import { authGuard } from './main/auth/guards/auth.guard';
import { adminGuard } from './main/auth/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full', 
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./main/auth/auth.module').then((m) => m.AuthModule), 
  },
  {
    path: 'dashboard',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: DashboardComponent,
        canActivate: [authGuard],
      },
      {
        path: 'transactions',
        loadChildren: () =>
          import('./main/transactions/transactions.module').then(
            (m) => m.TransactionsModule
          ),
        canActivate: [authGuard],
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./main/categories/category.module').then(
            (m) => m.CategoryModule
          ),
        canActivate: [authGuard],
      },

      {
        path: 'users',
        component: UsersComponent,
        canActivate: [authGuard, adminGuard],
      },
    ],
  },
  { path: '**', redirectTo: 'auth' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
