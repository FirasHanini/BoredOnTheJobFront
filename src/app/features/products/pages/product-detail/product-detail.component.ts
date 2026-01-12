import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/Models/Product';
import { ProductService } from '../../product-service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product?: Product;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
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
  }
}