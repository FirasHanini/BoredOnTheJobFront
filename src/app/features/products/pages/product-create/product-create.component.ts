import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../Services/product-service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent {

  productForm: FormGroup;
  
  // État d'édition pour chaque champ
  editState: { [key: string]: boolean } = {
    name: false,
    category: false,
    price: false,
    description: false
  };

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      name: ['Nouveau Produit', Validators.required],
      category: ['ÉLECTRONIQUE', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      description: ['Cliquez pour ajouter une description...', Validators.required],
      stock: [1, Validators.min(0)]
    });
  }

  toggleEdit(field: string, state: boolean) {
    this.editState[field] = state;
  }

  onSave() {
    if (this.productForm.valid) {
      console.log('Produit à enregistrer :', this.productForm.value);
      this.productService.createProduct(this.productForm.value).subscribe(response => {
        console.log('Produit créé avec succès :', response);
      });
    }
  }

}
