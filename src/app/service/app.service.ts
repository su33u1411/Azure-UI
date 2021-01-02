import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Constants} from '../util/Constants';

export interface TokenResponse {
  productId: string;
  productName: string;
  productDesc: string;
}

export interface Product {
  productId: string;
  productName: string;
  productDesc: string;
}

export interface Order {
  orderId: number;
  productName: string;
  orderCharge: number;
  orderTs: string;
  orderType: string;
  orderPoc: string;
}

@Injectable()
export class Appservice {

  constructor(private http: HttpClient) {
  }

  public authenticateUser(username: string, password: string): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(environment.DOMAIN + Constants.AUTHENTICATE_ENDPOINT, {
      username: 'ethral',
      password: 'ethral1234'
    });
  }

  public getProducts(): Observable<Product> {
    return null;
  }

  public getOrders(): Observable<Order> {
    return null;
  }
}
