import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { RegisterRequest } from 'src/app/Models/registerRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
 
   

  private baseUrl = 'http://localhost:8080';
  private authBase="/auth";
  private loginUrl=this.baseUrl+this.authBase+"/login";
  private logoutUrl=this.baseUrl+this.authBase+"/logout";
  private registerUrl=this.baseUrl+this.authBase+"/register";
  private registerSellerUrl=this.baseUrl+this.authBase+"/seller-register";

  constructor(private http: HttpClient) { }

   login(data: { email: string; password: string }) {
    return this.http.post<any>(`${this.loginUrl}`, data)
      .pipe(
        tap(res => {
          
          localStorage.setItem('access_token', res.token);
          this.getDetails(res.token);
          
        })
      );
  }

  logout() {
    return this.http.post<void>(`${this.logoutUrl}`, {});
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }


   getDetails(token: string):void {

    if (!token){ 
      console.error("No token provided");
      return ;

    }

    try {
      const decoded: any = jwtDecode(token);
      localStorage.setItem('role', decoded.role);
      localStorage.setItem('email', decoded.sub);

      console.info("Decoded token:", decoded);
     
    } catch (Error) {
      console.error("Failed to decode token", Error)
      ;
    }
  }



   registerSeller(value: RegisterRequest){
   
    return this.http.post<any>(this.registerSellerUrl, value  
    ) ;
  }

  registerUser(value: RegisterRequest) {
    return this.http.post<any>(this.registerUrl, value ,{responseType: 'text' as 'json'});
  }
}
