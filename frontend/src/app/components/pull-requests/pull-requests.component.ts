import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-pull-requests',
  templateUrl: './pull-requests.component.html',
  styleUrls: ['./pull-requests.component.css']
})
export class PullRequestsComponent implements OnInit {
  pullRequests: any[] = [];
  newPullRequest = { title: '', state: '', created_at: new Date(), updated_at: new Date(), author: '' };
  selectedPullRequest: number = 0;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.fetchPullRequests();
  }

  fetchPullRequests(): void {
    this.taskService.getPullRequests().subscribe((data) => {
      this.pullRequests = data;
    });
  }

  selectPullRequest(id: number): void {
    this.taskService.getPullRequestById(id).subscribe((data) => {
      this.selectedPullRequest = id;
      console.log('Selected Pull Request:', data);
    });
  }

  createNewPullRequest(): void {
    this.taskService.createPullRequest(this.newPullRequest).subscribe((data) => {
      console.log('Created:', data);
      this.fetchPullRequests();
    });
  }

  updatePullRequest(): void {
    this.taskService.updatePullRequest(this.selectedPullRequest, this.newPullRequest).subscribe((data) => {
      console.log('Updated:', data);
      this.fetchPullRequests();
    });
  }

  deletePullRequest(): void {
    this.taskService.deletePullRequest(this.selectedPullRequest).subscribe((data) => {
      console.log('Deleted:', data);
      this.fetchPullRequests();
    });
  }
}
