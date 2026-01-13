import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Product } from 'src/app/Models/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private items: Product[] = [];
  private cartSubject = new BehaviorSubject<Product[]>([]);

  constructor() {
    // Récupérer le panier au démarrage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.items = JSON.parse(savedCart);
      this.cartSubject.next(this.items);
    }
  }


  addToCart(product: any) {
    this.items.push(product);
    this.saveAndNotify();
  }

  private saveAndNotify() {
    localStorage.setItem('cart', JSON.stringify(this.items));
    this.cartSubject.next(this.items);
  }

  getCartCount() {
    return this.cartSubject.pipe(map(items => items.length));
  }










}
