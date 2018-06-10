import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Article } from 'src/app/interfaces';
import { ArticlesService } from 'src/app/views/articles/articles.service';
import { OverlayService } from 'src/app/utilities/overlay/overlay.service';
import { Observable } from 'rxjs';

@Injectable()
export class ArticlesResolverService implements Resolve<Article[]> {

  constructor(
    private articlesService: ArticlesService,
    private overlayService: OverlayService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Article[] | Observable<Article[]> | Promise<Article[]> {
    const observable = this.articlesService.getArticlesByCategory(route.url[0].path);
    this.overlayService.setBusyObservable(observable);
    return observable;
  }
}
