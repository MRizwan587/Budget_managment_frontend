import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ILoginRequest,
  User,
  IRegisterRequest,
} from '../../core/models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiURL = 'http://localhost:3000/api/';

  constructor(private http: HttpClient, private router: Router) {}

  // -------------------------
  // REGISTER
  // -------------------------
  register(data: IRegisterRequest): Observable<any> {
    return this.http.post<any>(`${this.apiURL}auth/register`, data);
  }

  // -------------------------
  // LOGIN
  // -------------------------
  login(data: ILoginRequest): Observable<any> {
    return this.http.post<any>(`${this.apiURL}auth/login`, data);
  }


  

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    this.router.navigate(['auth/login'])
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  getUser(id: string): Observable<any>{
      return this.http.get<any>(`${this.apiURL}users/${id}`)

    }
}
