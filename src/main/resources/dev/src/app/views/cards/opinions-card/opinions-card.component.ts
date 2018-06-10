import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArticlesService } from 'src/app/views/articles/articles.service';
import { Router } from '@angular/router';
import { Article } from 'src/app/interfaces';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-opinions-card',
  templateUrl: './opinions-card.component.html',
  styleUrls: ['./opinions-card.component.scss']
})
export class OpinionsCardComponent implements OnInit, OnDestroy {

  private destroy = new Subject<void>();
  public articles: Article[];

  constructor(
    private router: Router,
    private articlesService: ArticlesService
  ) { }

  ngOnInit() {
    this.articlesService.opinions.pipe(takeUntil(this.destroy)).subscribe(articles => {
      this.articles = articles;
    });
    this.articlesService.getArticlesByCategory('opinions').pipe(take(1)).subscribe();
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  public openArticle(articleNumber: number): void {
    this.router.navigate(['/opinions', articleNumber]);
  }

}
