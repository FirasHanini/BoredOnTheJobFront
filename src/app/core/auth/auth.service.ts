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
  private logoutUrl=this.baseUrl+this.authBase+"/logout";

  constructor(private http: HttpClient) { }

   login(data: { email: string; password: string }) {
    return this.http.post<any>(`${this.loginUrl}`, data)
      .pipe(
        tap(res => {
          
          localStorage.setItem('access_token', res.token);
          localStorage.setItem('role', res.role);
        })
      );
  }

  logout() {
    return this.http.post<void>(`${this.logoutUrl}`, {});
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }


   getRole() {
    const token = localStorage.getItem('token');
    if (!token) return '';
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role;
    }
}
