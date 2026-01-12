import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';




import { APP_ROUTES } from './AppRoutes';
import { MainLayoutComponent } from './main-layout/main-layout.component';

const routes: Routes = [
    { path: APP_ROUTES.LOGIN, loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) },
  { path: '', 
    canActivate: [AuthGuard], 
    component: MainLayoutComponent,
  children:[
   { path: APP_ROUTES.PRODUCTS, loadChildren: () => import('./features/products/products.module').then(m => m.ProductsModule) 

   }
  ] },
   
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
