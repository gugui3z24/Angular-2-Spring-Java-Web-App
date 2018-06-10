import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApplicationUser } from 'src/app/interfaces';
import { Observable } from 'rxjs';
import { share, catchError } from 'rxjs/operators';
import { OverlayService } from 'src/app/utilities/overlay/overlay.service';
import { ErrorService } from 'src/app/services/error.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly url = `${environment.apiUrl}/api`;

  constructor(
    private http: HttpClient,
    private overlayService: OverlayService,
    private errorService: ErrorService
  ) { }

  public createUser(user: ApplicationUser): Observable<void> {
    const observable = this.http.post<void>(`${this.url}/authentication/register`, user).pipe(share());
    this.overlayService.setBusyObservable(observable);
    return observable;
  }

  public updateUser(user: ApplicationUser): Observable<void> {
    const observable = this.http.put<void>(`${this.url}/user`, user, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
      .pipe(share(), catchError(error => this.errorService.handleError(error)));
    this.overlayService.setBusyObservable(observable);
    return observable;
  }

  public getAllUsers(): Observable<ApplicationUser[]> {
    const observable = this.http.get<ApplicationUser[]>(`${environment.apiUrl}/api/user`)
      .pipe(share(), catchError(error => this.errorService.handleError(error)));
    this.overlayService.setBusyObservable(observable);
    return observable;
  }
}
