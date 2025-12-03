export enum TwoFAMethod {
  EMAIL = 'Email',
  AUTH_APP = 'AuthenticatorApp'
}

export interface ITwoFASetupRequest {
    userId: string;
  method:  string ;
}

export interface ITwoFASetupResponse {
  message: string;
  secretKey?: string; 
  OTPAuthUrl?: string;
  QrCode_Image: string;
}

export interface IVerify2FARequest {
  code: string;
}

export interface IVerify2FAResponse {
  message: string;
  token: string;
}
