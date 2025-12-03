import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginData: any = { email: '', password: '' };
  errorMessage = '';
  data: any | null = null;
  hidePassword = true;

  constructor(private router: Router, private userService: UserService) {}
  onSubmit() {
    if (!this.loginData.email || !this.loginData.password) {
      this.errorMessage = 'please fill all fields.';
      return;
    }
    this.loginData.password = this.loginData.password.trim();
    this.userService.login(this.loginData).subscribe({
      next: (res) => {
        if (res.success) {
          this.data = res.data;
          localStorage.setItem('user', JSON.stringify(this.data));
        
          if(res.twofa==false){
            this.router.navigate(['/auth/onboarding']);

          }else{ 
          this.router.navigate(['/auth/verify']);
          }
        } else {
          this.errorMessage = res.message || 'Login failed';
        }
      },
      error: (error) => {
        this.errorMessage =
          error.error?.message || 'An error occurred during login';
      },
    });
  }

  navigateToRegister(): void {
    this.router.navigate(['/auth/register']);
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}
