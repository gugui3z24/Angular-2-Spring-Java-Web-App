import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/views/login/login.service';
import { AlertService } from 'src/app/utilities/alert/alert.service';
import { AlertConfig } from 'src/app/utilities/alert/alert-config';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    private loginService: LoginService,
    private alertService: AlertService
  ) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const allowedAccess = this.loginService.getRole() === 'ROLE_ADMIN';
    if (!allowedAccess) {
      const config = <AlertConfig>{};
      config.dismissible = true;
      config.message = 'You do not have access to this page. You must have Admin Access.';
      config.title = '401 - Unauthorized';
      config.type = 'danger';
      config.timer = 5000;
      this.alertService.showAlert(config);
    }
    return allowedAccess;
  }
}



