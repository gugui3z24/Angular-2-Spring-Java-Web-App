import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/interfaces';
import { take } from 'rxjs/operators';
import { ManageArticleTableModel } from 'src/app/views/articles/manage-article/manage-article-table';

@Component({
  selector: 'app-manage-article',
  templateUrl: './manage-article.component.html',
  styleUrls: ['./manage-article.component.scss']
})
export class ManageArticleComponent implements OnInit {

  public tableModel = new ManageArticleTableModel();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.data.pipe(take(1)).subscribe((data: { articles: Article[] }) => {
      const articles = data.articles;
      this.tableModel.tableData = articles;
    });
  }

  public editArticle(id: number): void {
    this.router.navigate(['/edit-article', id]);
  }

}
