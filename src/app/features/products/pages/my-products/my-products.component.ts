import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Services/product-service';
import { Product } from 'src/app/Models/Product';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css']
})
export class MyProductsComponent implements OnInit {
  
  products: Product[] = [];

  constructor(private productService: ProductService) {}


  ngOnInit(): void {
    this.getProducts();
  }


  getProducts(): void {
      this.productService.getProductsBySellerEmail(
        this.getUserEmail()
      ).subscribe({
        next: (data) => this.products = data as Product[],
        error: (err) => console.error('Erreur chargement produits', err)
      });
  
    }

    getUserEmail(): string {
      // Implémentez la logique pour récupérer l'email de l'utilisateur connecté
      return localStorage.getItem('email') || '';
    }



}
