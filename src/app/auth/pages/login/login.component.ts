import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/core/models/user';

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

  constructor(private router: Router, private authService: AuthService) {}
  onSubmit() {
    console.log("login reques data", this.loginData);
    
    if (!this.loginData.email || !this.loginData.password) {
      this.errorMessage = 'please fill all fields.';
      return;
    }
    this.loginData.password=this.loginData.password.trim();
    this.authService.login(this.loginData).subscribe({
      next: (res)=>{
        if(res.success){ 
        this.data=res.data;
        localStorage.setItem("user", JSON.stringify(this.data)) ;
        
    this.router.navigate(['/auth/verify']);
        }else {
      this.errorMessage = res.message || "Login failed";
    }   },
     error: (error) => {
    this.errorMessage =
      error.error?.message || "An error occurred during login";
  },      
    })

  }

  navigateToRegister(): void {
    this.router.navigate(["/auth/register"]);
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}
