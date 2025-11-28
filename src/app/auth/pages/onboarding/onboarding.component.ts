import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TwofaService } from '../../services/twofa.service';
import { AuthService } from '../../services/auth.service';
import {ITwoFASetupRequest} from '../../../core/models/twofa';

type TwoFAMethod = 'none' | 'AuthenticatorApp' | 'Email';
type TwoFAState = 'selection' | 'setup' | 'verification';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css']
})
export class OnboardingComponent {

  constructor(private router: Router, private twofa: TwofaService, private authService: AuthService){
     const rawUser = localStorage.getItem("user");
    
    if (!rawUser) {
      this.errorMessage = "User not found. Please login again.";
      return;
    }

    try {
      this.userData = JSON.parse(rawUser);
      this.userId = this.userData?.id || null;
      
      if (!this.userId) {
        this.errorMessage = "Invalid user data. Please login again.";
      }

    } catch (error) {
      this.errorMessage = "Failed to parse user data.";
    }
    
  }
  // --- State Management ---
  currentState: TwoFAState = 'selection';
  selectedMethod: TwoFAMethod = 'none';

  otpCode: string = '';
  qrCodeUrl: string | null = null;
  
  isLoading: boolean = false;
  errorMessage: string | null = null;
  userData: any=null;
  userId: any=null;
  method: any=null;

    
  ngOnInit(): void {
    // Any initial checks can go here
   
  }

  // --- Selection Handlers ---

  selectAuthenticatorApp() {
    this.selectedMethod = 'AuthenticatorApp';
    this.method="AuthenticatorApp";
    this.currentState = 'setup';
    this.setupAuthenticator();
  }

  selectEmail() {
    this.selectedMethod = 'Email';
    this.method="Email";
    this.currentState = 'setup'; // Email setup often jumps right to verification
    this.setupEmail();
  }

  // --- Setup API Calls ---

  setupAuthenticator() {
    this.isLoading = true;
    this.errorMessage = null;
      const setupData: ITwoFASetupRequest = {
      userId: this.userId,
      method: this.selectedMethod, 
    };
    this.twofa.setupAuthenticator(setupData).subscribe({
      next: (response) => {
        console.log(response);
        
        this.qrCodeUrl = response.QrCode_Image;
        this.isLoading = false;
        // After showing QR code, state moves to verification automatically
        this.currentState = 'setup'; 
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to load QR code. Please try again.';
        this.currentState = 'selection'; // Go back to selection on failure
        console.error(err);
      }
    });
  }

  setupEmail() {
    this.isLoading = true;
    this.errorMessage = null;
    this.method="Email";
      const setupData: ITwoFASetupRequest = {
      userId: this.userId,
      method: this.selectedMethod, 
    };
    this.twofa.setupEmail(setupData).subscribe({
      next: (res) => {
        this.isLoading = false;
        console.log(res,"from mail");
        
        this.errorMessage = 'A verification code has been sent to your email.';
        // Code is sent, move to verification state
        this.currentState = 'setup'; 
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to send email code. Please check your email and try again.';
        this.currentState = 'selection';
        console.error(err);
      }
    });
  }

  // --- Verification API Call ---

  verifyCode() {
    if (this.otpCode.length !== 6) {
      this.errorMessage = 'The code must be exactly 6 digits.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    this.twofa.verifyCode(this.userId, this.otpCode).subscribe({
      next: (res) => {
        this.isLoading = false;
        console.log(res);
        // Successful verification! Navigate to the Dashboard.
        this.router.navigate(['/dashboard'], { replaceUrl: true });
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Verification failed. Please check your code or try resending.';
        console.error(err);
      }
    });
  }

  // getUser(id: string){
  //      this.isLoading = true;
  //   const getUserId= id;
  //   this.authService.getUser(getUserId).subscribe({
  //     next: (res) => {
  //       localStorage.setItem('token',JSON.stringify( res.token));
  //       localStorage.setItem('user',JSON.stringify( res.user));
  //       localStorage.setItem('role',JSON.stringify( res.user.role));
  //       this.isLoading = false;
  //       console.log("Fresh user data from DB:", res);
  //     },
  //     error: (err) => {
  //       this.isLoading = false;
  //       this.errorMessage = "Failed to fetch user from database.";
  //       console.error(err);
  //     }
  //   });
  // }

  // --- Utility ---
  isMethodSelected(method: TwoFAMethod): boolean {
    return this.selectedMethod === method;
  }

}
