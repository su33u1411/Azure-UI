import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ErrorComponent} from './error/error.component';
import {HomeComponent} from './home/home.component';
import {ProductsComponent} from './home/products/products.component';
import {OrdersComponent} from './home/orders/orders.component';
import {SummaryComponent} from './home/summary/summary.component';
import {AuthenticationHandler} from './util/authentication.handler';


const routes: Routes = [
  {
    component: LoginComponent,
    path: 'login'
  },
  {
    component: HomeComponent,
    path: 'home',
    canActivate: [AuthenticationHandler],
    children: [
      {
        component: ProductsComponent,
        path: 'products'
      },
      {
        component: OrdersComponent,
        path: 'orders'
      },
      {
        component: SummaryComponent,
        path: 'summary'
      },
      {
        path: '**',
        redirectTo: 'products'
      }
    ]
  },
  {
    component: ErrorComponent,
    path: 'error'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
