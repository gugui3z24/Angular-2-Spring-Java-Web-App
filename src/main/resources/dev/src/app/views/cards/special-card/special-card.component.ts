import { Component, OnInit, OnDestroy } from '@angular/core';
import { Article } from 'src/app/interfaces';
import { Router } from '@angular/router';
import { ArticlesService } from 'src/app/views/articles/articles.service';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-special-card',
  templateUrl: './special-card.component.html',
  styleUrls: ['./special-card.component.scss']
})
export class SpecialCardComponent implements OnInit, OnDestroy {

  public articles: Article[];
  private destroy = new Subject<void>();

  constructor(
    private router: Router,
    private articlesService: ArticlesService
  ) { }

  ngOnInit() {
    this.articlesService.features.pipe(takeUntil(this.destroy)).subscribe(articles => {
      this.articles = articles;
    });
    this.articlesService.getArticlesByCategory('features').pipe(take(1)).subscribe();
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  public openArticle(articleNumber: number): void {
    this.router.navigate(['/features', articleNumber]);
  }

}
