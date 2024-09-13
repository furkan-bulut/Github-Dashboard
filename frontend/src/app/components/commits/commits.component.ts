import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-commits',
  templateUrl: './commits.component.html',
  styleUrls: ['./commits.component.css']
})
export class CommitsComponent implements OnInit {
  commits: any[] = [];
  newCommit = { sha: '', message: '', created_at: new Date(), updated_at: new Date(), author: '' };
  selectedCommit : number = 0;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.fetchCommits();
  }

  fetchCommits(): void {
    this.taskService.getCommits().subscribe((data) => {
      this.commits = data;
    });
  }

  selectCommit(id: number): void {
    this.taskService.getCommitById(id).subscribe((data) => {
      this.selectedCommit = id;
      console.log('Selected Commit:', data);
    });
  }

  createNewCommit(): void {
    this.taskService.createCommit(this.newCommit).subscribe((data) => {
      console.log('Created:', data);
      this.fetchCommits();
    });
  }

  updateCommit(): void {
    this.taskService.updateCommit(this.selectedCommit, this.newCommit).subscribe((data) => {
      console.log('Updated:', data);
      this.fetchCommits();
    });
  }

  deleteCommit(): void {
    this.taskService.deleteCommit(this.selectedCommit).subscribe((data) => {
      console.log('Deleted:', data);
      this.fetchCommits();
    });
  }
}
