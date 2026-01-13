import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductCreateComponent } from './pages/product-create/product-create.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { MyProductsComponent } from './pages/my-products/my-products.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProductsComponent,
    ProductCreateComponent,
    ProductDetailComponent,
    MyProductsComponent,
    
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProductsModule { }
