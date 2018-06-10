import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ArticlesService } from 'src/app/views/articles/articles.service';
import { Article } from 'src/app/interfaces';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss']
})
export class NewsCardComponent implements OnInit, OnDestroy {

  public articles: Article[];
  private destroy = new Subject<void>();

  constructor(
    private router: Router,
    private articlesService: ArticlesService
  ) { }

  ngOnInit() {
    this.articlesService.news.pipe(takeUntil(this.destroy)).subscribe(articles => {
      this.articles = articles;
    });
    this.articlesService.getArticlesByCategory('news').pipe(take(1)).subscribe();
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  public openArticle(articleNumber: number): void {
    this.router.navigate(['/news', articleNumber]);
  }

}
