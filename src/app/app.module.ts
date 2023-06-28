import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CartComponent } from './cart/cart.component';
import { CartService } from './cart/cart.service';
import { ProductService } from './product-list/product.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReceiptComponent } from './receipt/receipt.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    CartComponent,
    ReceiptComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    CartService, 
    ProductService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
