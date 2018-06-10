import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';

@Injectable()
export class StaffGuard implements CanActivate {

  constructor(
    private loginService: LoginService
  ) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.loginService.isLoggedIn()) {
      return true;
    }

    if (route.url.length > 0) {
      this.loginService.previousUrl = route.url[0].path;
    }
    this.loginService.loginObservable.next();
    return false;
  }
}
