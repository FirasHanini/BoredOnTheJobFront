import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Models/Product';
import { CartService } from '../../Services/cart.service';
import { CartItem } from 'src/app/Models/cartItem';

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

  constructor(private cartService: CartService) {}

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
    alert('Redirection vers le paiement... Montant total : ' + this.totalPrice + ' TND');
    // Ici tu peux appeler une API de commande ou vider le panier
  }

  onSave(): void {
    this.cartService.removeFromCartBack(this.pendingDeleteIds).subscribe(() => {
      alert('Modifications enregistrées avec succès !');
      this.save = false;
    this.pendingDeleteIds.clear();
    });
  }



 

}
