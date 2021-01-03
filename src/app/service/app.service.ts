import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
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
}

@Injectable()
export class AppService {
  isSpinnerEnable = false;
  constructor(private http: HttpClient) {
  }

  public authenticateUser(uname: string, psword: string): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(environment.DOMAIN + Constants.AUTHENTICATE_ENDPOINT, {
      username: uname,
      password: psword
    });
  }

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.DOMAIN + Constants.PRODUCTS_ENDPOINT, {
      headers: {
        Authorization: 'Bearer ' + this.getToken(),
      }
    });
  }

  public getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(environment.DOMAIN + Constants.ORDERS_ENDPOINT, {
      headers: {
        Authorization: 'Bearer ' + this.getToken(),
      }
    });
  }

  public getNetAmount(fromdate: string, todate: string): Observable<number> {
    return this.http.get<number>(environment.DOMAIN + Constants.ORDERS_ENDPOINT, {
      headers: {
        Authorization: 'Bearer ' + this.getToken(),
      },
      params: {
        fromDate: fromdate,
        toDate: todate
      }
    });
  }

  public setToken(token: string){
    sessionStorage.setItem(Constants.AUTH_USER_SESSION_TOKEN, token);
  }

  public getToken(): string{
    return sessionStorage.getItem(Constants.AUTH_USER_SESSION_TOKEN);
  }

  public removeToken(){
    sessionStorage.removeItem(Constants.AUTH_USER_SESSION_TOKEN);
  }

  enableSpinner(){
    this.isSpinnerEnable = true;
  }

  disableSpinner(){
    this.isSpinnerEnable = false;
  }

}
