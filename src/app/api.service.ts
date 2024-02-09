import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  signup(user: any): Observable<any> {
    const url = `${this.apiUrl}/signup`;
    return this.http.post(url, user);
  } 

  verifyOtp(email: string, otp: string) : Observable<any> {
    const url = `${this.apiUrl}/verify`;
    return this.http.post(url, { email, otp });
  }
}
