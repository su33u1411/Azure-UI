import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Constants} from '../util/constants';

export interface TokenResponse {
  jwt: string;
  active: boolean;
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
  quantityUnit: string;
  orderQuantity: number;
}

@Injectable()
export class AppService {
  isSpinnerEnable = new Subject<boolean>();

  constructor(private http: HttpClient) {
  }

  public authenticateUser(uname: string, psword: string): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(environment.DOMAIN + Constants.AUTHENTICATE_ENDPOINT, {
      username: uname,
      password: psword
    });
  }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.DOMAIN + Constants.PRODUCTS_ENDPOINT);
  }

  public getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(environment.DOMAIN + Constants.ORDERS_ENDPOINT);
  }

  public createProduct(
    name: string,
    description: string
  ): Observable<Product> {
    return this.http.post<Product>(environment.DOMAIN + Constants.CREATE_PRODUCT_ENDPOINT, {
        productName: name,
        productDesc: description,
      });
  }


  public createOrder(
    name: string,
    charge: number,
    quantity: number,
    units: string,
    time: string,
    type: string,
    poc: string): Observable<Order> {
    return this.http.post<Order>(environment.DOMAIN + Constants.CREATE_ORDERS_ENDPOINT, {
        productName: name,
        orderCharge: charge,
        orderQuantity: quantity,
        quantityUnit: units,
        orderTs: time,
        orderType: type,
        orderPoc: poc
      });
  }

  public getNetAmount(fromdate: string, todate: string): Observable<number> {
    return this.http.get<number>(environment.DOMAIN + Constants.NETAMOUNT_ENDPOINT, {
      params: {
        fromDate: fromdate,
        toDate: todate
      }
    });
  }

  public setToken(token: string) {
    sessionStorage.setItem(Constants.AUTH_USER_SESSION_TOKEN, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(Constants.AUTH_USER_SESSION_TOKEN);
  }

  public removeToken() {
    sessionStorage.removeItem(Constants.AUTH_USER_SESSION_TOKEN);
  }

  enableSpinner() {
    this.isSpinnerEnable.next(true);
  }

  disableSpinner() {
    this.isSpinnerEnable.next(false);
  }

}
