  import { Injectable } from '@angular/core';
  import { HttpClient, HttpClientModule } from '@angular/common/http';
  import { Observable, of } from 'rxjs';
  import { ITwoFASetupRequest, ITwoFASetupResponse } from '../../core/models/twofa' 

  @Injectable({
    providedIn: 'root'
  })
  export class TwofaService {

    constructor( private http: HttpClient) { }
    
    private apiUrl = 'http://localhost:3000/api/2fa'; // Matches your backend routes (authRoutes)

    
    setupAuthenticator(setupData: ITwoFASetupRequest ): Observable<ITwoFASetupResponse> {
      // In a real app, this would be: 
      console.log(setupData);
      
      return this.http.post<ITwoFASetupResponse>(`${this.apiUrl}/setup`, setupData);

    }

    /**
     * API call to initiate the Email 2FA setup.
     * This endpoint usually just sends the initial code to the user's email.
     */
    setupEmail(setupData: ITwoFASetupRequest): Observable<any> {
      return this.http.post(`${this.apiUrl}/setup`, setupData);
    }

   
    verifyCode(userId: string, code: string): Observable<any> {
      return this.http.post(`${this.apiUrl}/verify`, { userId, code });
      
    }

    
  }
