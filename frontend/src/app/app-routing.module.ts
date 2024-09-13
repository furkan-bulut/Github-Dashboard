import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PullRequestsComponent } from './components/pull-requests/pull-requests.component';
import { CommentsComponent } from './components/comments/comments.component';
import { CommitsComponent } from './components/commits/commits.component';
import { HomePageComponent } from './components/home-page/home-page.component';

const routes: Routes = [
  { path: 'pull-requests', component: PullRequestsComponent },
  { path: 'comments', component: CommentsComponent },
  { path: 'commits', component: CommitsComponent },
  { path: 'home', component: HomePageComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
