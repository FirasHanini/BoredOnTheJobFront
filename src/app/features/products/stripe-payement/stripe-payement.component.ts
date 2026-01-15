import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { key } from 'src/app/key';
import { PaymentService } from '../Services/payment.service';

@Component({
  selector: 'app-stripe-payement',
  templateUrl: './stripe-payement.component.html',
  styleUrls: ['./stripe-payement.component.css']
})
export class StripePayementComponent implements OnInit {


  stripe: any;
  elements: any;
  isLoading = false;

  constructor(private paymentService: PaymentService) {}

  async ngOnInit() {
    // 1. Charger Stripe
    this.stripe = await loadStripe(key);

    // 2. Récupérer le clientSecret via ton service
    this.paymentService.getIntent().subscribe(res => {
      const appearance = { theme: 'stripe' };
      this.elements = this.stripe.elements({ appearance, clientSecret: res.clientSecret });

      // 3. Créer et monter le "Payment Element"
      const paymentElement = this.elements.create('payment');
      paymentElement.mount('#payment-element');
    });
  }

  async confirmPayment() {
    this.isLoading = true;

    // 4. Envoyer le paiement à Stripe
    const { error } = await this.stripe.confirmPayment({
      elements: this.elements,
      confirmParams: {
        return_url: window.location.origin + '/order-success',
      },
    });

    if (error) {
      alert(error.message);
      this.isLoading = false;
    }
  }


}
