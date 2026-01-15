import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductCreateComponent } from './pages/product-create/product-create.component';
import { RoleGuard } from '../auth/role.guard';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { MyProductsComponent } from './pages/my-products/my-products.component';
import { CartComponent } from './pages/cart/cart.component';
import { StripePayementComponent } from './stripe-payement/stripe-payement.component';

const routes: Routes = [
  { path: '', 
    component: ProductsComponent },
    {
    path: 'new',
    component: ProductCreateComponent,
    canActivate: [RoleGuard],
    data: { roles: ['SELLER', 'ADMIN'] }
  },
  {
    path: 'my-products',
    component: MyProductsComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'cart/payment',
    component: StripePayementComponent
  },


  { path: ':id', 
    component: ProductDetailComponent
  }

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
