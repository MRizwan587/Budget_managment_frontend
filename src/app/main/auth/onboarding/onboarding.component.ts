import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ITwoFASetupRequest } from '../../../core/models/twofa';
import { UserService } from 'src/app/core/services/user.service';

type TwoFAMethod = 'none' | 'AuthenticatorApp' | 'Email';
type TwoFAState = 'selection' | 'setup' | 'verification';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css'],
})
export class OnboardingComponent {
  constructor(private router: Router, private userService: UserService) {
    const rawUser = localStorage.getItem('user');

    if (!rawUser) {
      this.errorMessage = 'User not found. Please login again.';
      return;
    }

    try {
      this.userData = JSON.parse(rawUser);
      this.userId = this.userData?.id || null;

      if (!this.userId) {
        this.errorMessage = 'Invalid user data. Please login again.';
      }
    } catch (error) {
      this.errorMessage = 'Failed to parse user data.';
    }
  }

  currentState: TwoFAState = 'selection';
  selectedMethod: TwoFAMethod = 'none';

  otpCode: string = '';
  qrCodeUrl: string | null = null;

  isLoading: boolean = false;
  errorMessage: string | null = null;
  userData: any = null;
  userId: any = null;
  method: any = null;

  ngOnInit(): void {}

  selectAuthenticatorApp() {
    this.selectedMethod = 'AuthenticatorApp';
    this.method = 'AuthenticatorApp';
    this.currentState = 'setup';
    this.setupAuthenticator();
  }

  selectEmail() {
    this.selectedMethod = 'Email';
    this.method = 'Email';
    this.currentState = 'setup'; 
    this.setupEmail();
  }

  setupAuthenticator() {
    this.isLoading = true;
    this.errorMessage = null;
    const setupData: ITwoFASetupRequest = {
      userId: this.userId,
      method: this.selectedMethod,
    };
    this.userService.setupAuthenticator(setupData).subscribe({
      next: (response) => {
        this.qrCodeUrl = response.QrCode_Image;
        this.isLoading = false;
        this.currentState = 'setup';
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to load QR code. Please try again.';
        this.currentState = 'selection';
        console.error(err);
      },
    });
  }

  setupEmail() {
    this.isLoading = true;
    this.errorMessage = null;
    this.method = 'Email';
    const setupData: ITwoFASetupRequest = {
      userId: this.userId,
      method: this.selectedMethod,
    };
    this.userService.setupEmail(setupData).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.errorMessage = 'A verification code has been sent to your email.';
        this.currentState = 'setup';
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage =
          'Failed to send email code. Please check your email and try again.';
        this.currentState = 'selection';
        console.error(err);
      },
    });
  }

  verifyCode() {
    if (this.otpCode.length !== 6) {
      this.errorMessage = 'The code must be exactly 6 digits.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    this.userService.verifyCode(this.userId, this.otpCode).subscribe({
      next: (res) => {
        this.isLoading = false;
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', JSON.stringify(res.user.role));
        localStorage.setItem('user', JSON.stringify(res.user));
        this.router.navigate(['/dashboard'], { replaceUrl: true });
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage =
          'Verification failed. Please check your code or try resending.';
        console.error(err);
      },
    });
  }
  isMethodSelected(method: TwoFAMethod): boolean {
    return this.selectedMethod === method;
  }
}
