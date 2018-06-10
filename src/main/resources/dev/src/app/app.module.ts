import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DisqusModule } from 'ngx-disqus';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxTwitterTimelineModule } from 'ngx-twitter-timeline';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DiscussionComponent } from './components/discussion/discussion.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './views/home/home.component';
import { JumbotronComponent } from './components/jumbotron/jumbotron.component';
import { FooterComponent } from './components/footer/footer.component';
import { CardsComponent } from './views/cards/cards.component';
import { NewsCardComponent } from './views/cards/news-card/news-card.component';
import { OpinionsCardComponent } from './views/cards/opinions-card/opinions-card.component';
import { PeopleCardComponent } from './views/cards/people-card/people-card.component';
import { RecentCardComponent } from './views/cards/recent-card/recent-card.component';
import { SpecialCardComponent } from './views/cards/special-card/special-card.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { PopularCardComponent } from './views/cards/popular-card/popular-card.component';
import { TwitterFeedComponent } from './views/cards/twitter-feed/twitter-feed.component';
import { LoginComponent } from './views/login/login.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AwardsComponent } from 'src/app/views/awards/awards.component';
import { FameComponent } from 'src/app/views/fame/fame.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UtilityModule } from 'src/app/utilities/utility.module';
import { OverlayComponent } from 'src/app/utilities/overlay/overlay.component';
import { AlertComponent } from 'src/app/utilities/alert/alert.component';
import { ViewArticleComponent } from './views/articles/view-article/view-article.component';
import { HttpInterceptorService } from 'src/app/services/http-interceptor.service';
import { ViewArticleResolverService } from 'src/app/views/articles/view-article/view-article-resolver.service';
import { ArticlesResolverService } from 'src/app/views/articles/articles-resolver.service';
import { ArticlesComponent } from './views/articles/articles.component';
import { ArticlesService } from './views/articles/articles.service';
import { StaffComponent } from './views/staff/staff.component';
import { EditArticleComponent } from './views/articles/edit-article/edit-article.component';
import { ManageArticleComponent } from './views/articles/manage-article/manage-article.component';
import { CreateUserComponent } from './views/staff/user/create-user/create-user.component';
import { ManageUserComponent } from './views/staff/user/manage-user/manage-user.component';
import { EditUserComponent } from './views/staff/user/edit-user/edit-user.component';
import { StaffGuard } from './views/staff/staff.guard';
import { AdminGuard } from './views/staff/admin.guard';
import { ModeratorGuard } from './views/staff/moderator.guard';
import { ManagerUserResolverService } from './views/staff/user/manage-user/manager-user-resolver.service';
import { ManageArticleResolverService } from './views/articles/manage-article/manage-article-resolver.service';
import { EditArticleResolverService } from './views/articles/edit-article/edit-article-resolver.service';
import { TableComponent } from './components/table/table.component';
import { TableCellDirective } from './components/table/table-cell.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DiscussionComponent,
    HomeComponent,
    JumbotronComponent,
    FooterComponent,
    CardsComponent,
    NewsCardComponent,
    OpinionsCardComponent,
    PeopleCardComponent,
    RecentCardComponent,
    SpecialCardComponent,
    CarouselComponent,
    PopularCardComponent,
    TwitterFeedComponent,
    LoginComponent,
    AwardsComponent,
    FameComponent,
    OverlayComponent,
    AlertComponent,
    ArticlesComponent,
    ViewArticleComponent,
    StaffComponent,
    EditArticleComponent,
    ManageArticleComponent,
    CreateUserComponent,
    ManageUserComponent,
    EditUserComponent,
    TableComponent,
    TableCellDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    DisqusModule.forRoot('demo-dq'),
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgxTwitterTimelineModule.forRoot(),
    UtilityModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ],
  entryComponents: [
    LoginComponent,
    OverlayComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    ViewArticleResolverService,
    ArticlesResolverService,
    ArticlesService,
    StaffGuard,
    AdminGuard,
    ModeratorGuard,
    ManagerUserResolverService,
    ManageArticleResolverService,
    EditArticleResolverService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
