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
import {DataTablesModule} from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
        DataTablesModule,
        NgbModule
    ],
  providers: [AuthenticationHandler, AppService, AppServiceInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule { }
