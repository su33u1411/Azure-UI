import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './home/products/products.component';
import { OrdersComponent } from './home/orders/orders.component';
import { SummaryComponent } from './home/summary/summary.component';
import {AuthenticationHandler} from './util/authentication.handler';
import {AppService} from './service/app.service';
import {HttpClientModule} from '@angular/common/http';
import {AppServiceInterceptor} from './util/app.service.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    HomeComponent,
    ProductsComponent,
    OrdersComponent,
    SummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [AuthenticationHandler, AppService, AppServiceInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule { }
