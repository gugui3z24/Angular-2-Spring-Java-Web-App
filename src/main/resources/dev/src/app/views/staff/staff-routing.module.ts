// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Routes, RouterModule } from '@angular/router';
// import { StaffComponent } from './staff.component';
// import { StaffGuard } from './staff.guard';
// import { AdminGuard } from 'src/app/views/staff/admin.guard';
// import { ModeratorGuard } from './moderator.guard';
// import { CreateUserComponent } from 'src/app/views/staff/user/create-user/create-user.component';
// import { ManageUserComponent } from 'src/app/views/staff/user/manage-user/manage-user.component';
// import { ManagerUserResolverService } from 'src/app/views/staff/user/manage-user/manager-user-resolver.service';
// import { EditUserComponent } from 'src/app/views/staff/user/edit-user/edit-user.component';
// import { EditUserResolverService } from 'src/app/views/staff/user/edit-user/edit-user-resolver.service';
// import { EditArticleComponent } from 'src/app/views/articles/edit-article/edit-article.component';
// import { ManageArticleComponent } from 'src/app/views/articles/manage-article/manage-article.component';
// import { ManageArticleResolverService } from 'src/app/views/articles/manage-article/manage-article-resolver.service';
// import { EditArticleResolverService } from 'src/app/views/articles/edit-article/edit-article-resolver.service';

// const routes: Routes = [
//   {
//     path: '',
//     component: StaffComponent,
//     canActivate: [StaffGuard]
//   },
//   {
//     path: 'create-article',
//     component: EditArticleComponent,
//     canActivate: [StaffGuard, ModeratorGuard],
//     resolve: { resolverData: EditArticleResolverService }
//   },
//   {
//     path: 'edit-article/:id',
//     component: EditArticleComponent,
//     canActivate: [StaffGuard, ModeratorGuard],
//     resolve: { resolverData: EditArticleResolverService }
//   },
//   {
//     path: 'manage-article',
//     component: ManageArticleComponent,
//     canActivate: [StaffGuard, ModeratorGuard],
//     resolve: { articles: ManageArticleResolverService }
//   },
//   {
//     path: 'create-user',
//     component: CreateUserComponent,
//     canActivate: [StaffGuard, AdminGuard]
//   },
//   {
//     path: 'manage-user',
//     component: ManageUserComponent,
//     canActivate: [StaffGuard, AdminGuard],
//     resolve: { users: ManagerUserResolverService }
//   },
//   {
//     path: 'edit-user/:id',
//     component: EditUserComponent,
//     canActivate: [StaffGuard, AdminGuard],
//     resolve: { data: EditUserResolverService }
//   },
//   {
//     path: '**', redirectTo: '/', pathMatch: 'full'
//   }
// ];

// @NgModule({
//   imports: [
//     CommonModule,
//     RouterModule.forChild(routes)
//   ],
//   declarations: [],
//   exports: [RouterModule]
// })
// export class StaffRoutingModule { }
