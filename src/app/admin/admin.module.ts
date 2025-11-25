import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementComponent } from './pages/user-management/user-management.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoryManagementComponent } from './pages/category-management/category-management.component';
import { AdminRoutingModule } from './admin-routing.module';


@NgModule({
  declarations: [ 
      UserManagementComponent,
      DashboardComponent,
      CategoryManagementComponent,
   ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
