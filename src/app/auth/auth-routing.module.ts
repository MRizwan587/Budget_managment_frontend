import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { OnboardingComponent } from './pages/onboarding/onboarding.component';
import { VerifyAuthenticatorComponent } from './pages/verify-authenticator/verify-authenticator.component';

const routes: Routes = [

  
  {
    path: '',
    redirectTo: 'login', // Redirects '/auth' to '/auth/login'
    pathMatch: 'full'
  },

  // 2. Login Path: Handles the '/auth/login' route.
  {
    path: 'login',
    component: LoginComponent 
  },

  // 3. Register Path: Handles the '/auth/register' route.
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'onboarding',
    component: OnboardingComponent
  },
  {
    path: 'verify',
    component: VerifyAuthenticatorComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
