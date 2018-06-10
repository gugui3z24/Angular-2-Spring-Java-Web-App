import { Injectable } from '@angular/core';
import { ApplicationUser, Role } from 'src/app/interfaces';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';
import { share, take, catchError } from 'rxjs/operators';
import { OverlayService } from 'src/app/utilities/overlay/overlay.service';

@Injectable({
  providedIn: 'root'
})
export class EditUserResolverService implements Resolve<[Role[], ApplicationUser]> {

  constructor(
    private http: HttpClient,
    private router: Router,
    private overlayService: OverlayService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<[Role[], ApplicationUser]> {
    const id = Number(route.paramMap.get('id'));
    if (isNaN(id)) {
      this.router.navigate(['/manage-user']);
      return of();
    }
    const rolesObs: Observable<Role[]> = this.http.get<Role[]>(environment.apiUrl + '/api/role').pipe(share(), catchError(() => {
      this.router.navigate(['/manage-user']);
      return of();
    }));
    const userObs: Observable<ApplicationUser> = this.http.get<ApplicationUser>(`${environment.apiUrl}/api/user/${id}`)
      .pipe(share(), catchError(() => {
        this.router.navigate(['/manage-user']);
        return of();
      }));
    const observable: Observable<[Role[], ApplicationUser]> = forkJoin(rolesObs, userObs);
    this.overlayService.setBusyObservable(observable);
    observable.pipe(take(1)).subscribe((data: [Role[], ApplicationUser]) => {
      if (!data[1]) {
        this.router.navigate(['/manage-user']);
        return of();
      }
    });
    return observable;
  }
}
