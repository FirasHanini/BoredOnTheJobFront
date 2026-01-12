import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from 'src/app/Models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
 
  private baseUrl = 'http://localhost:8080';
  private PRODUCT_BASE = "/products";


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

}

