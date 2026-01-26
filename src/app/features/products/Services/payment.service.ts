import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { key } from 'src/app/key';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

    private baseUrl = 'http://localhost:8080';
  private paymentBase="/stripe";
  private paymeeBase="/paymee"
  
  private exportPayout="/export-payouts"

  constructor(private http: HttpClient) { }

  getIntent():any {
   
    return this.http.post<any>(this.baseUrl+this.paymeeBase, {});
  }

  extractPayouts(){
    return this.http.get(this.baseUrl+this.paymeeBase+this.exportPayout, { responseType: 'blob'  });
  }


}