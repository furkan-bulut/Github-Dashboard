import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // CRUD Operations for Pull Requests
  getPullRequests(): Observable<any> {
    return this.http.get(`${this.apiUrl}/pull-requests`);
  }

  getPullRequestById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/pull-requests/${id}`);
  }

  createPullRequest(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/pull-requests`, data);
  }

  updatePullRequest(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/pull-requests/${id}`, data);
  }

  deletePullRequest(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/pull-requests/${id}`);
  }

  // CRUD Operations for Comments
  getComments(): Observable<any> {
    return this.http.get(`${this.apiUrl}/comments`);
  }

  getCommentById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/comments/${id}`);
  }

  createComment(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/comments`, data);
  }

  updateComment(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/comments/${id}`, data);
  }

  deleteComment(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/comments/${id}`);
  }

  // CRUD Operations for Commits
  getCommits(): Observable<any> {
    return this.http.get(`${this.apiUrl}/commits`);
  }

  getCommitById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/commits/${id}`);
  }

  createCommit(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/commits`, data);
  }

  updateCommit(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/commits/${id}`, data);
  }

  deleteCommit(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/commits/${id}`);
  }
}
