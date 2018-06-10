import { Component, OnInit, OnDestroy } from '@angular/core';
import { Article } from 'src/app/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/views/login/login.service';
import { take, takeUntil } from 'rxjs/operators';
import { ArticlesService } from 'src/app/views/articles/articles.service';
import { AlertService } from 'src/app/utilities/alert/alert.service';
import { AlertConfig } from 'src/app/utilities/alert/alert-config';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.scss']
})
export class ViewArticleComponent implements OnInit, OnDestroy {

  public article: Article;
  public canEdit: boolean;
  public sanitizedBody: SafeHtml;
  private destroy = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private loginService: LoginService,
    private router: Router,
    private articlesService: ArticlesService,
    private alertService: AlertService,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.activatedRoute.data.pipe(takeUntil(this.destroy)).subscribe((data: { article: Article }) => {
      this.sanitizedBody = this.domSanitizer.bypassSecurityTrustHtml(data.article.body);
      this.article = data.article;
      this.checkPermissions();
    });
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  public checkPermissions(): void {
    this.canEdit = this.loginService.getRole() === 'ROLE_MODERATOR' || this.loginService.getRole() === 'ROLE_ADMIN';
  }

  public get img(): string {
    if (this.router.url.startsWith('/opinions')) {
      return 'http://nodq.com/nodqimages/nodq-opinions.png';
    } else if (this.router.url.startsWith('/news')) {
      return 'http://nodq.com/nodqimages/nodq-news.png';
    } else if (this.router.url.startsWith('/features')) {
      return 'http://nodq.com/nodqimages/nodq-features.png';
    }
  }

  public get header(): { title: string, description: string } {
    if (this.router.url.startsWith('/opinions')) {
      return {
        title: 'Opinions',
        description: 'Opinions and Commentaries'
      };
    } else if (this.router.url.startsWith('/news')) {
      return {
        title: 'News',
        description: 'Latest wrestling news'
      };
    } else if (this.router.url.startsWith('/features')) {
      return {
        title: 'Features',
        description: 'Special features'
      };
    }
  }

  public editArticle(): void {
    this.router.navigate(['/edit-article', this.article.id]);
  }

  public deleteArticle(): void {
    this.articlesService.deleteArticle(this.article.id).pipe(take(1)).subscribe(() => {
      this.articlesService.getArticlesByCategory(this.article.category.name).pipe(take(1)).subscribe();
      const config = <AlertConfig>{};
      config.dismissible = true;
      config.message = 'Article successfully deleted';
      config.icon = '<i class="fas fa-info-circle"></i>';
      config.type = 'primary';
      this.alertService.showAlert(config);
      this.router.navigate(['/manage-article']);
    }, () => { });
  }

}
