import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {


    private baseUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  // ----------------------------------------------------------------
  // ✅ 1. Get all users
  // GET /api/users
  // ----------------------------------------------------------------
  // getAllUsers(): Observable<any> {
  //   return this.http.get(`${this.baseUrl}`);
  // }
  getAllUsers(page: number, limit: number, name?: string, role?: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page)
      .set('limit', limit);

    if (name) params = params.set('name', name);
    if (role) params = params.set('role', role);

    return this.http.get(`${this.baseUrl}`, { params });
  }

  // PATCH /api/users/:id/status
  // Body: { status: "Active" | "Inactive" }
  // ----------------------------------------------------------------
  updateUserStatus(id: string, status: string): Observable<any> {
    const body = { status };
    return this.http.patch(`${this.baseUrl}/${id}/status`, body);
  }
}
