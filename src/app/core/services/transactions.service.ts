import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  constructor(private http: HttpClient) {}
  private baseUrl = environment.baseUrl;

  summary(): Observable<any> {
    return this.http.get(`${this.baseUrl}/dashboard-stats`);
  }

  getTransactions(filters: any) {
    let params = new HttpParams();

    Object.keys(filters).forEach((key) => {
      params = params.set(key, filters[key]);
    });

    return this.http.get(`${this.baseUrl}/transactions`, { params });
  }

  createTransaction(payload: any) {
    return this.http.post(`${this.baseUrl}/transactions`, payload);
  }
}
