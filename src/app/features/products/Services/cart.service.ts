import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { CartItem } from 'src/app/Models/cartItem';
import { Product } from 'src/app/Models/Product';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl = 'http://localhost:8080';
  private cartBase="/cart";
  private cartUrl=this.baseUrl+this.cartBase; 

  private items: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) {
    // Récupérer le panier au démarrage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.items = JSON.parse(savedCart);
      this.cartSubject.next(this.items);
    }
  }


  addToCart(product: Product, quantity: number ) {
    this.items.push(
      { product, quantity }
    );
    
    this.saveAndNotify();

    const params = new HttpParams()
    .set('productId', product.id || '')
    .set('quantity', quantity || '1');
    return this.http.post<any>(this.cartUrl, params );
  }

  private saveAndNotify() {
    localStorage.setItem('cart', JSON.stringify(this.items));
    this.cartSubject.next(this.items);
  }

  getCartCount() {
    return this.cartSubject.pipe(map(items => items.length));
  }



  getCartFromBack() {
    return this.http.get<CartItem[]>(this.cartUrl);
  }


  syncCartWithBack() {
    this.getCartFromBack().subscribe(backItems => {
      this.items = backItems;
      this.saveAndNotify();
    });
  }


  removeFromCart(productId: number) {
    this.items = this.items.filter(item => item.product.id !== productId);
    this.saveAndNotify();
  }

  removeFromCartBack(productIds: Set<number>) {
    const idsArray = Array.from(productIds).join(',');
    const params = new HttpParams()
    .set('productsIds',idsArray)
    return this.http.delete<any>(this.cartUrl, { params });
  }

  flushCart() {
    this.items = [];
    this.saveAndNotify();
  }








}
