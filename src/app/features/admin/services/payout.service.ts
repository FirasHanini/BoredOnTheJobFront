import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PayoutService {

  private baseUrl = 'http://localhost:8080';
  private payout="/payout";

  constructor(
    private http: HttpClient
  ) { }


  getPendingPayouts() {
      return this.http.get<any>(this.baseUrl + this.payout);
    }

    
}
