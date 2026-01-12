import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductCreateComponent } from './pages/product-create/product-create.component';
import { RoleGuard } from '../auth/role.guard';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';

const routes: Routes = [
  { path: '', 
    component: ProductsComponent },
    {
    path: 'new',
    component: ProductCreateComponent,
    canActivate: [RoleGuard],
    data: { roles: ['SELLER', 'ADMIN'] }
  },
  { path: ':id', 
    component: ProductDetailComponent,
 // canActivate: [RoleGuard],
 //   data: { roles: ['USER', 'SELLER', 'ADMIN'] } 
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
