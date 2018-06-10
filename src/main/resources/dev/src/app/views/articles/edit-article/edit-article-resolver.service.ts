import { Injectable } from '@angular/core';
import { Category, Article } from 'src/app/interfaces';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { ArticlesService } from 'src/app/views/articles/articles.service';
import { Observable, forkJoin, of } from 'rxjs';
import { share, catchError } from 'rxjs/operators';

@Injectable()
export class EditArticleResolverService implements Resolve<[Category[], Article]> {

  constructor(
    private articlesService: ArticlesService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot): [Category[], Article] | Observable<[Category[], Article]> | Promise<[Category[], Article]> {
    let categoryObs: Observable<Category[]>;
    let articleObs: Observable<Article>;
    if (route.url[0].path === 'create-article') {
      categoryObs = this.articlesService.getAllCategories();
      articleObs = of(
        <Article>{
          category: <Category>{}
        }
      );
      return forkJoin(categoryObs, articleObs);
    }

    const id = Number(route.paramMap.get('id'));

    if (isNaN(id)) {
      this.router.navigate(['/manage-article']);
      return;
    }

    categoryObs = this.articlesService.getAllCategories();
    articleObs = this.articlesService.getArticleById(id);
    const finalObs = forkJoin(categoryObs, articleObs).pipe(share(), catchError(() => {
      this.router.navigate(['/manage-article']);
      return of();
    }));
    return finalObs;
  }


}
