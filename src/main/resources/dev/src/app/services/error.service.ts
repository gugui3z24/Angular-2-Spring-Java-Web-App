import { Injectable } from '@angular/core';
import { AlertService } from 'src/app/utilities/alert/alert.service';
import { _throw } from 'rxjs/observable/throw';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertConfig } from 'src/app/utilities/alert/alert-config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private alertService: AlertService) { }

  public handleError(error: HttpErrorResponse): Observable<never> {
    const config = <AlertConfig>{};
    switch (error.status) {
      case 401:
        config.dismissible = true;
        config.icon = '<i class="fas fa-exclamation-triangle"></i>';
        config.message = 'You must be logged in to access that page.';
        config.title = '401 - Unauthorized';
        config.type = 'danger';
        config.timer = 3000;
        break;
      case 403:
        config.dismissible = true;
        config.icon = '<i class="fas fa-exclamation-triangle"></i>';
        config.message = 'You do not have access to that page. Please contact a system administrator if you believe this is a mistake.';
        config.title = '403 - Forbidden';
        config.type = 'danger';
        config.timer = 5000;
        break;
      case 404:
        config.dismissible = true;
        config.icon = '<i class="fas fa-exclamation-triangle"></i>';
        config.message = 'Sorry, it seems that page was not found (botch!)';
        config.title = '404 - Not Found';
        config.type = 'danger';
        config.timer = 5000;
        break;
      default:
        config.dismissible = true;
        config.icon = '<i class="fas fa-exclamation-triangle"></i>';
        config.message = 'It seems that something went wrong #botchamania. If the problem continues, please notify a system administrator.';
        config.title = '500 - Unknown Error';
        config.type = 'danger';
        config.timer = 5000;
        break;
    }
    this.alertService.showAlert(config);
    return _throw(error);
  }
}
