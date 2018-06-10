import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { StringUtil } from '../../utilities/string-util';
import { AlertService } from '../../utilities/alert/alert.service';
import { AlertConfig } from '../../utilities/alert/alert-config';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApplicationUser } from 'src/app/interfaces';
import { take, catchError, share } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ModalService } from 'src/app/utilities/modal/modal.service';
import { ErrorService } from 'src/app/services/error.service';
import { OverlayService } from 'src/app/utilities/overlay/overlay.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginObservable = new Subject<void>();
  public previousUrl: string;
  private readonly url = `${environment.apiUrl}/login`;

  constructor(
    private alertService: AlertService,
    private router: Router,
    private http: HttpClient,
    private modalService: ModalService,
    private errorService: ErrorService,
    private overlayService: OverlayService
  ) { }

  public login(user: ApplicationUser): Observable<HttpResponse<void>> {
    const request = this.http.post<void>(this.url, user, { observe: 'response' }).pipe(share());
    this.overlayService.setBusyObservable(request);
    request.pipe(take(1), catchError(error => this.errorService.handleError(error))).subscribe(response => {
      this.setToken(response.headers.get('Authorization'));
      const config = <AlertConfig>{};
      config.dismissible = true;
      config.message = 'Successfully logged in!';
      config.icon = '<i class="fas fa-info-circle"></i>';
      config.type = 'primary';
      this.alertService.showAlert(config);
      this.modalService.closeModal();
      this.router.navigate(
        [`/${StringUtil.isNotBlank(this.previousUrl) ? this.previousUrl : 'staff'}`]
      );
      this.previousUrl = null;
    }, () => { });
    return request;
  }

  private setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (StringUtil.isBlank(token)) {
      return false;
    }

    try {
      const helper = new JwtHelperService();
      helper.decodeToken(token);
      return !helper.isTokenExpired(token);
    } catch {
      return false;
    }
  }

  public logout(): void {
    localStorage.clear();
    const config = <AlertConfig>{};
    config.dismissible = true;
    config.icon = '<i class="fas fa-info-circle"></i>';
    config.message = 'You have been successfully logged out!';
    config.type = 'primary';
    this.alertService.showAlert(config);
    this.router.navigate(['']);
  }

  public getUsername(): string {
    try {
      const helper = new JwtHelperService();
      return helper.decodeToken(this.getToken())['sub'];
    } catch {
      return null;
    }
  }

  public getRole(): string {
    try {
      const helper = new JwtHelperService();
      return helper.decodeToken(this.getToken())['scopes'][0];
    } catch {
      return null;
    }
  }

}
