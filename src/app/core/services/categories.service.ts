import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}
  private baseUrl = environment.baseUrl;

  getCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories`);
  }

  createCategory(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/categories`, data);
  }

  deleteCategory(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/categories/${id}`);
  }
  getCategoryById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories/${id}`);
  }
  
  updateCategory(id: string, payload: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/categories/${id}`, payload);
  }
}
