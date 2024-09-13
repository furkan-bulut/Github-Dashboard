import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PullRequestsComponent } from './components/pull-requests/pull-requests.component';
import { CommentsComponent } from './components/comments/comments.component';
import { CommitsComponent } from './components/commits/commits.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    PullRequestsComponent,
    CommentsComponent,
    CommitsComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
