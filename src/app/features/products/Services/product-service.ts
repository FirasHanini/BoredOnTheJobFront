import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/Models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 
  private baseUrl = 'http://localhost:8080';
  private PRODUCT_BASE = "/products";
  private bySellerEmail ="/seller"


  constructor(private http: HttpClient) { }

    getAll() {
    return this.http.get(this.baseUrl + this.PRODUCT_BASE);
    }


     create(product: Product) {
    return this.http.post(this.baseUrl+this.PRODUCT_BASE, product);
  }

   getProductById(id: number) {
    return this.http.get<Product>(`${this.baseUrl}${this.PRODUCT_BASE}/${id}`);
  }

  getProductsBySellerEmail(email: string) {
    const params = new HttpParams().set('email', email);
    return this.http.get<Product[]>(this.baseUrl + this.PRODUCT_BASE + this.bySellerEmail, { params });
  }

  createProduct(product: Product) {
    return this.http.post<any>(this.baseUrl + this.PRODUCT_BASE, product);
  }

}

