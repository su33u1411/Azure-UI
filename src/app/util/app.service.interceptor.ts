import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AppService} from '../service/app.service';
import {catchError, map} from 'rxjs/operators';

@Injectable()
export class AppServiceInterceptor implements HttpInterceptor{

  constructor(private appService: AppService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.appService.enableSpinner();
    return next.handle(req)
      .pipe(catchError((err) => {
        this.appService.disableSpinner();
        return err;
      }))
      .pipe(map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
        if (evt instanceof HttpResponse) {
          this.appService.disableSpinner();
        }
        return evt;
      }));
  }

}
