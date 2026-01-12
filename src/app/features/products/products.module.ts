import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { ProductCreateComponent } from './pages/product-create/product-create.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';


@NgModule({
  declarations: [
    ProductsComponent,
    ProductCreateComponent,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
