import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  public overlay$ = new Subject<boolean>();

  public showOverlay() {
    this.overlay$.next();
  }

  public setBusyObservable<T>(observable: Observable<T>): Observable<T> {
    this.overlay$.next(true);
    observable.pipe(take(1)).subscribe(() => {
      this.overlay$.next(false);
    }, () => {
      this.overlay$.next(false);
    });
    return observable;
  }
}
