import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILoginRequest, IRegisterRequest } from '../../core/models/user';
import { ITwoFASetupRequest, ITwoFASetupResponse } from '../models/twofa';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient, private router: Router) {}

  register(data: IRegisterRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/register`, data);
  }

  login(data: ILoginRequest): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/login`, data);
  }
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): any {
    const role= localStorage.getItem('role')?.replace(/"/g, '').toLowerCase();
    return role;
  }
  
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    this.router.navigate(['auth/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  getUser(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/users/${id}`);
  }

  getAllUsers(
    page: number,
    limit: number,
    name: string,
    role: string,
    status?: string
  ) {
    let params: any = { page, limit };
    if (name) params.name = name;
    if (role) params.role = role;
    if (status) params.status = status;
    
    return this.http.get(`${this.baseUrl}/users`, { params });
  }

  updateUserStatus(id: string, status: string): Observable<any> {
    const body = { status };
    return this.http.patch(`${this.baseUrl}/users/${id}/status`, body);
  }

  deleteTwoFA(user: any): Observable<any> {
    const id = user._id;
    return this.http.patch(`${this.baseUrl}/2fa/reset/${id}`, user);
  }

  setupAuthenticator(
    setupData: ITwoFASetupRequest
  ): Observable<ITwoFASetupResponse> {
    return this.http.post<ITwoFASetupResponse>(
      `${this.baseUrl}/2fa/setup`,
      setupData
    );
  }

  setupEmail(setupData: ITwoFASetupRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/2fa/setup`, setupData);
  }

  verifyCode(userId: string, code: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/2fa/verify`, { userId, code });
  }
}
