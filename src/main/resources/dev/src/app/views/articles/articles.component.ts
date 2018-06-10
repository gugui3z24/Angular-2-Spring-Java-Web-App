import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/interfaces';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  public articles: Article[];
  public url: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.data.pipe(take(1)).subscribe((data: { articles: Article[] }) => {
      this.articles = data.articles;
    });
  }

  public get img(): string {
    if (this.router.url.startsWith('/opinions')) {
      this.url = 'opinions';
      return 'http://nodq.com/nodqimages/nodq-opinions.png';
    } else if (this.router.url.startsWith('/news')) {
      this.url = 'news';
      return 'http://nodq.com/nodqimages/nodq-news.png';
    } else if (this.router.url.startsWith('/features')) {
      this.url = 'features';
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

  public viewArticle(id: number): void {
    this.router.navigate([`/${this.url}`, id]);
  }
}
