import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpResponse,
  HttpUserEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/views/login/login.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private loginService: LoginService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {

    if (!this.loginService.isLoggedIn()) {
      return next.handle(req);
    }
    const authToken = this.loginService.getToken();

    const authReq = req.clone({
      headers: req.headers.set('Authorization', authToken)
    });

    return next.handle(authReq);
  }
}

