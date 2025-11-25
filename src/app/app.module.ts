import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { RegisterComponent } from './auth/pages/register/register.component';
import { OnboardingComponent } from './auth/pages/onboarding/onboarding.component';
import { VerifyEmailComponent } from './auth/pages/verify-email/verify-email.component';
import { VerifyAuthenticatorComponent } from './auth/pages/verify-authenticator/verify-authenticator.component';
import { ForgotPasswordComponent } from './auth/pages/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/pages/reset-password/reset-password.component';
import { DashboardComponent } from './user/pages/dashboard/dashboard.component';
import { TransactionsComponent } from './user/pages/transactions/transactions.component';
import { AddTransactionComponent } from './user/pages/add-transaction/add-transaction.component';
import { EditTransactionComponent } from './user/pages/edit-transaction/edit-transaction.component';
import { CategoriesComponent } from './user/pages/categories/categories.component';
import { ProfileComponent } from './user/pages/profile/profile.component';
import { UserManagementComponent } from './admin/pages/user-management/user-management.component';
import { CategoryManagementComponent } from './admin/pages/category-management/category-management.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    OnboardingComponent,
    VerifyEmailComponent,
    VerifyAuthenticatorComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    DashboardComponent,
    TransactionsComponent,
    AddTransactionComponent,
    EditTransactionComponent,
    CategoriesComponent,
    ProfileComponent,
    UserManagementComponent,
    CategoryManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
