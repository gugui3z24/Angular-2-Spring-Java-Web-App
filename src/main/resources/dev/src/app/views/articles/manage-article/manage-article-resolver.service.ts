import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Article } from 'src/app/interfaces';
import { ArticlesService } from 'src/app/views/articles/articles.service';
import { Observable } from 'rxjs';

@Injectable()
export class ManageArticleResolverService implements Resolve<Article[]> {

  constructor(private articlesService: ArticlesService) { }

  resolve(): Article[] | Observable<Article[]> | Promise<Article[]> {
    return this.articlesService.getAllArticles();
  }
}
