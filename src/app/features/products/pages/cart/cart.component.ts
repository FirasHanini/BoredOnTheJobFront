import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Models/Product';
import { CartService } from '../../Services/cart.service';
import { CartItem } from 'src/app/Models/cartItem';
import { PaymentService } from '../../Services/payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  save: boolean = false;
  pendingDeleteIds = new Set<number>();

  constructor(private cartService: CartService,
              private router: Router,
              private paymentService: PaymentService
  ) {}

  ngOnInit(): void {

    this.cartService.syncCartWithBack();
    // On s'abonne aux changements du panier
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  calculateTotal(): void {
    // Si tu n'as pas encore d'attribut quantity, on compte 1 par item
    this.totalPrice = this.cartItems.reduce((acc, item) => acc + ((item.product.price || 0) * item.quantity), 0);
  }

  removeItem(productId: number): void {
    this.pendingDeleteIds.add(productId);
    this.cartService.removeFromCart(productId);
    this.save = true;
  }

  onCheckout(): void {
  if (this.cartItems.length > 0) {
    this.paymentService.getIntent().subscribe((response) => {
      console.log("Payment intent response:", response);
      this.cartService.flushCart();
      window.location.href = response.data.payment_url;
    
    });
  } else {
    alert("Your cart is empty!");
  }
  }



    




















  onSave(): void {
    this.cartService.removeFromCartBack(this.pendingDeleteIds).subscribe(() => {
      alert('Changes saved successfully!');
      this.save = false;
    this.pendingDeleteIds.clear();
    });
  }



 

}
