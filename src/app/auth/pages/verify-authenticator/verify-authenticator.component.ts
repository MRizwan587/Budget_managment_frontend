import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TwofaService } from '../../services/twofa.service';

@Component({
  selector: 'app-verify-authenticator',
  templateUrl: './verify-authenticator.component.html',
  styleUrls: ['./verify-authenticator.component.css']
})
export class VerifyAuthenticatorComponent {
  otpCode: string='';
  errorMessage: string|null="";
  userData: any= null;
  userId: any=null;
    constructor(private router: Router, private twofa: TwofaService){
          const rawUser = localStorage.getItem("user");

    if (!rawUser) {
      this.errorMessage = "User not found. Please login again.";
      return;
    }

    try {
      this.userData = JSON.parse(rawUser);
      this.userId = this.userData?.userId || null;

      if (!this.userId) {
        this.errorMessage = "Invalid user data. Please login again.";
      }

    } catch (error) {
      this.errorMessage = "Failed to parse user data.";
    }
    }
  
  verifyCode() {
    if (this.otpCode.length !== 6) {
      this.errorMessage = 'The code must be exactly 6 digits.';
      return;
    }
    console.log(this.userId);
    

    this.errorMessage = null;

    this.twofa.verifyCode(this.userId, this.otpCode).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem('token', res.token);
        localStorage.setItem('role',JSON.stringify( res.user.role));
        localStorage.setItem('user',JSON.stringify( res.user));
        // Successful verification! Navigate to the Dashboard.
        this.router.navigate(['/dashboard'], { replaceUrl: true });
      },
      error: (err) => {
        this.errorMessage = 'Verification failed. Please check your code or try resending.';
        console.error(err);
      }
    });
  }

}
