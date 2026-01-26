import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './core/auth/token.interceptor';
import { MatDialogModule } from '@angular/material/dialog';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';


import { SideBarComponent } from './side-bar/side-bar.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { RouterModule } from '@angular/router';
import { CartComponent } from './features/products/pages/cart/cart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PayoutsComponent } from './features/admin/payouts/payouts.component';




@NgModule({
  declarations: [
    AppComponent,
    
    DashboardComponent,
        
        
         SideBarComponent,
                  MainLayoutComponent,
                  CartComponent,
                  PayoutsComponent,
                  
                 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MatDialogModule,
    BrowserAnimationsModule,
    
  
  
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
