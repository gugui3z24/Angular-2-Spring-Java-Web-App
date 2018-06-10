import { Injectable } from '@angular/core';
import { Category, Article } from 'src/app/interfaces';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ErrorService } from 'src/app/services/error.service';
import { share, catchError, map } from 'rxjs/operators';
import { OverlayService } from 'src/app/utilities/overlay/overlay.service';

@Injectable()
export class ArticlesService {

  private readonly url = `${environment.apiUrl}`;
  public news = new Subject<Article[]>();
  public opinions = new Subject<Article[]>();
  public features = new Subject<Article[]>();

  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    private overlayService: OverlayService
  ) { }

  public getAllCategories(): Observable<Category[]> {
    const observable = this.http.get<Category[]>(`${this.url}/api/category`)
      .pipe(share(), catchError(error => this.errorService.handleError(error)));
    this.overlayService.setBusyObservable(observable);
    return observable;
  }

  public createArticle(article: Article): Observable<void> {
    const observable = this.http.post<void>(`${this.url}/api/article`, article)
      .pipe(share(), catchError(error => this.errorService.handleError(error)));
    this.overlayService.setBusyObservable(observable);
    return observable;
  }

  public getAllArticles(): Observable<Article[]> {
    const observable = this.http.get<Article[]>(`${this.url}/public/article`)
      .pipe(share(), catchError(error => this.errorService.handleError(error)));
    this.overlayService.setBusyObservable(observable);
    return observable;
  }

  public getArticleById(id: number): Observable<Article> {
    const observable = this.http.get<Article>(`${this.url}/public/article/${id}`)
      .pipe(share(), catchError(error => this.errorService.handleError(error)));
    this.overlayService.setBusyObservable(observable);
    return observable;
  }

  public getArticlesByCategory(category: string): Observable<Article[]> {
    const observable = this.http.get<Article[]>(`${this.url}/public/article/category`,
      { params: new HttpParams().set('category', category) })
      .pipe(share(), map((articles: Article[]) => {
        switch (category) {
          case 'news':
            this.news.next(articles);
            break;
          case 'features':
            this.features.next(articles);
            break;
          case 'opinions':
            this.opinions.next(articles);
            break;
        }
        return articles;
      }), catchError(error => this.errorService.handleError(error)));
    return observable;
  }

  public deleteArticle(id: number): Observable<void> {
    const observable = this.http.delete<void>(`${this.url}/api/article/${id}`)
      .pipe(share(), catchError(error => this.errorService.handleError(error)));
    this.overlayService.setBusyObservable(observable);
    return observable;
  }

}
