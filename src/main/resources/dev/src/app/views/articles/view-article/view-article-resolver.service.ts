import { Injectable } from '@angular/core';
import { Article } from 'src/app/interfaces';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ArticlesService } from 'src/app/views/articles/articles.service';
import { OverlayService } from 'src/app/utilities/overlay/overlay.service';
import { AlertService } from 'src/app/utilities/alert/alert.service';
import { AlertConfig } from 'src/app/utilities/alert/alert-config';
import { take, catchError } from 'rxjs/operators';

@Injectable()
export class ViewArticleResolverService implements Resolve<Article> {

  constructor(
    private articlesService: ArticlesService,
    private router: Router,
    private overlayService: OverlayService,
    private alertService: AlertService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Article | Observable<Article> | Promise<Article> {
    const id = Number(route.paramMap.get('id'));
    const type = route.url[0].path;
    if (isNaN(id)) {
      this.router.navigate([`/${type}`]);
      return;
    }
    const obs = this.articlesService.getArticleById(id).pipe(catchError(() => {
      this.setError(type);
      return of();
    }));
    this.overlayService.setBusyObservable(obs);
    obs.pipe(take(1)).subscribe(article => {
      if (!article) {
        this.setError(type);
      }
    });
    return obs;
  }

  private setError(type: string): void {
    const config = <AlertConfig>{};
    config.dismissible = true;
    config.icon = '<i class="fas fa-exclamation-triangle"></i>';
    config.message = 'That article was not found.';
    config.title = '404 - Not Found';
    config.type = 'danger';
    config.timer = 3000;
    this.alertService.showAlert(config);
    this.router.navigate([`/${type}`]);
  }
}
