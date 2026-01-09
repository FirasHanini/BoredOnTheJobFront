import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080';
  private authBase="/auth";
  private loginUrl=this.baseUrl+this.authBase+"/login";

  constructor(private http: HttpClient) { }

   login(data: { email: string; password: string }) {
    return this.http.post<any>(`${this.loginUrl}`, data)
      .pipe(
        tap(res => {
          localStorage.setItem('access_token', res.accessToken);
          localStorage.setItem('role', res.role);
        })
      );
  }

  logout() {
    localStorage.clear();
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }
}
