import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { AwardsComponent } from './views/awards/awards.component';
import { FameComponent } from './views/fame/fame.component';
import { ArticlesComponent } from 'src/app/views/articles/articles.component';
import { ViewArticleComponent } from 'src/app/views/articles/view-article/view-article.component';
import { ViewArticleResolverService } from 'src/app/views/articles/view-article/view-article-resolver.service';
import { ArticlesResolverService } from 'src/app/views/articles/articles-resolver.service';
import { EditArticleComponent } from 'src/app/views/articles/edit-article/edit-article.component';
import { StaffGuard } from 'src/app/views/staff/staff.guard';
import { ModeratorGuard } from 'src/app/views/staff/moderator.guard';
import { EditArticleResolverService } from 'src/app/views/articles/edit-article/edit-article-resolver.service';
import { ManageArticleComponent } from 'src/app/views/articles/manage-article/manage-article.component';
import { ManageArticleResolverService } from 'src/app/views/articles/manage-article/manage-article-resolver.service';
import { CreateUserComponent } from 'src/app/views/staff/user/create-user/create-user.component';
import { AdminGuard } from 'src/app/views/staff/admin.guard';
import { ManageUserComponent } from 'src/app/views/staff/user/manage-user/manage-user.component';
import { ManagerUserResolverService } from 'src/app/views/staff/user/manage-user/manager-user-resolver.service';
import { EditUserComponent } from 'src/app/views/staff/user/edit-user/edit-user.component';
import { EditUserResolverService } from 'src/app/views/staff/user/edit-user/edit-user-resolver.service';
import { StaffComponent } from './views/staff/staff.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'articles',
    component: ArticlesComponent
  },
  {
    path: 'articles/:id',
    component: ViewArticleComponent
  },
  {
    path: 'news',
    component: ArticlesComponent,
    resolve: { articles: ArticlesResolverService }
  },
  {
    path: 'news/:id',
    component: ViewArticleComponent,
    resolve: { article: ViewArticleResolverService }
  },
  {
    path: 'opinions',
    component: ArticlesComponent,
    resolve: { articles: ArticlesResolverService }
  },
  {
    path: 'opinions/:id',
    component: ViewArticleComponent,
    resolve: { article: ViewArticleResolverService }
  },
  {
    path: 'features',
    component: ArticlesComponent,
    resolve: { articles: ArticlesResolverService }
  },
  {
    path: 'features/:id',
    component: ViewArticleComponent,
    resolve: { article: ViewArticleResolverService }
  },
  {
    path: 'awards',
    component: AwardsComponent
  },
  {
    path: 'hof',
    component: FameComponent
  },
  {
    path: 'staff',
    component: StaffComponent,
    canActivate: [StaffGuard]
  },
  {
    path: 'create-article',
    component: EditArticleComponent,
    canActivate: [StaffGuard, ModeratorGuard],
    resolve: { resolverData: EditArticleResolverService }
  },
  {
    path: 'edit-article/:id',
    component: EditArticleComponent,
    canActivate: [StaffGuard, ModeratorGuard],
    resolve: { resolverData: EditArticleResolverService }
  },
  {
    path: 'manage-article',
    component: ManageArticleComponent,
    canActivate: [StaffGuard, ModeratorGuard],
    resolve: { articles: ManageArticleResolverService }
  },
  {
    path: 'create-user',
    component: CreateUserComponent,
    canActivate: [StaffGuard, AdminGuard]
  },
  {
    path: 'manage-user',
    component: ManageUserComponent,
    canActivate: [StaffGuard, AdminGuard],
    resolve: { users: ManagerUserResolverService }
  },
  {
    path: 'edit-user/:id',
    component: EditUserComponent,
    canActivate: [StaffGuard, AdminGuard],
    resolve: { data: EditUserResolverService }
  },
  {
    path: '**', redirectTo: '/', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
