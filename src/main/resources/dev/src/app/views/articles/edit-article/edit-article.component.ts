import { Component, OnInit } from '@angular/core';
import { Article, Category } from 'src/app/interfaces';
import { take } from 'rxjs/operators';
import { AlertService } from 'src/app/utilities/alert/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertConfig } from 'src/app/utilities/alert/alert-config';
import { ArticlesService } from 'src/app/views/articles/articles.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {

  public article: Article;
  public categories: Category[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private router: Router,
    private articlesService: ArticlesService
  ) { }

  ngOnInit() {
    this.activatedRoute.data.pipe(take(1)).subscribe((data: { resolverData: [Category[], Article] }) => {
      this.categories = data.resolverData[0];
      this.article = data.resolverData[1];
    });
  }

  public submit(): void {
    this.articlesService.createArticle(this.article).pipe(take(1)).subscribe(() => {
      const category: string = this.categories.filter(cat => cat.id.toString() === this.article.category.id.toString())[0].name;
      this.articlesService.getArticlesByCategory(category).pipe(take(1)).subscribe();
      const config = <AlertConfig>{};
      config.dismissible = true;
      config.message = `Article successfully ${this.article.id ? 'updated' : 'created'}!`;
      config.title = 'Success!';
      config.type = 'success';
      this.alertService.showAlert(config);
      if (this.article.id) {
        this.router.navigate([`/${this.article.category.name}`]);
      } else {
        this.router.navigate([`/${category}`]);
      }
    }, () => { });
  }

}
