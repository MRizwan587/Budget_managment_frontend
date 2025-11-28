export interface User {
    
  _id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
}


export enum UserRole {
  ADMIN = 'Admin',
  USER = 'User'
}


export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IRegisterRequest {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface ILoginResponse {
  message: string;
  token: string;
  requires2FA: boolean;
}

export interface IDashboardSummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  monthlyIncome: number;
  monthlyExpense: number;
}
