import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { key } from 'src/app/key';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

    private baseUrl = 'http://localhost:8080';
  private paymentBase="/payment";

  constructor(private http: HttpClient) { }

  getIntent() {
    // On appelle ton @PostMapping que tu as montré avant
    return this.http.post<any>(this.baseUrl+this.paymentBase, {});
  }
}