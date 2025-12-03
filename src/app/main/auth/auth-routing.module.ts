import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { VerifyAuthenticatorComponent } from './verify-authenticator/verify-authenticator.component';

const routes: Routes = [

  
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  
  {
    path: 'login',
    component: LoginComponent 
  },


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
