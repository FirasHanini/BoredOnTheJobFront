import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';




import { APP_ROUTES } from './AppRoutes';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { guestGuard } from './core/auth/guestGuard';
import { PayoutsComponent } from './features/admin/payouts/payouts.component';
import { AdminGuard } from './core/auth/admin.guard';

const routes: Routes = [
    { path: APP_ROUTES.LOGIN, 
      loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
    canActivate: [guestGuard]  },
  { path: '', 
    canActivate: [AuthGuard], 
    component: MainLayoutComponent,
  children:[
   { path: APP_ROUTES.PRODUCTS, loadChildren: () => import('./features/products/products.module').then(m => m.ProductsModule) 

   },
   {
    path: APP_ROUTES.PAYOUTS,
    component: PayoutsComponent,
    canActivate: [AuthGuard, AdminGuard]
  },
  ] },
  
   
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
