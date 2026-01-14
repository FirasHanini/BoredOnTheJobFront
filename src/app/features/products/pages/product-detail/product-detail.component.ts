import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/Models/Product';
import { ProductService } from '../../Services/product-service';
import { CartService } from '../../Services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product= {} as Product;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.productService.getProductById(id).subscribe({
        next: (res) => {
          this.product = res;
        },
        error: (err) => console.error('Erreur lors du chargement', err)
      });
    }
  }

  changeQty(val: number) {
    this.quantity += val;
  }



  onBuy() {
    alert(`Produit ${this.product?.name} ajouté au panier ! Quantité : ${this.quantity}`);
    
    // Ici, tu pourrais appeler un service CartService
    this.cartService.addToCart(this.product, this.quantity).subscribe({
      next: () => console.log('Produit ajouté au panier'),
      error: (err) => console.error('Erreur lors de l\'ajout au panier', err)
    });
    this.quantity = 1;
  }
}