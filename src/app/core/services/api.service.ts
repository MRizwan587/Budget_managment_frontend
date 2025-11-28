import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { ITransactionRequest } from '../models/transaction';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  private baseUrl = 'http://localhost:3000/api';

  summary(): Observable<any> {
    return this.http.get(`${this.baseUrl}/transactions/summary`);
  }

 getTransactions(filters: any) {
  let params = new HttpParams();

  Object.keys(filters).forEach(key => {
    params = params.set(key, filters[key]);
  });

  return this.http.get(`${this.baseUrl}/transactions`, { params });
}


  createTransaction(payload: any) {
    return this.http.post(`${this.baseUrl}/transactions`, payload);
  }

  getAllCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories`);
  }


   getCategories(): Observable<any> {
    return this.http.get(`${this.baseUrl}/categories`);
  }

  createCategory(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/categories`, data);
  }

  deleteCategory(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/categories/${id}`);
  }

  getRecentTransactions() {
  return this.http.get<any>(`${this.baseUrl}/transactions/recent`);
}
}
