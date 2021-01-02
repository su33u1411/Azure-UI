import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {AppService} from '../service/app.service';

@Injectable()
export class AuthenticationHandler implements CanActivate {

  constructor(private router: Router, private appService: AppService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.appService.getToken()) {
      return true;
    } else {
      this.router.navigateByUrl('/login').finally(() => {
        return false;
      });
    }
  }
}
