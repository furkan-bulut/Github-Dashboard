import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  comments: any[] = [];
  newComment = {body: '', created_at: new Date(), updated_at: new Date(), author: '' };
  selectedComment : number = 0;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.fetchComments();
  }

  fetchComments(): void {
    this.taskService.getComments().subscribe((data) => {
      this.comments = data;
    });
  }

  selectComment(id: number): void {
    this.taskService.getCommentById(id).subscribe((data) => {
      this.selectedComment = id;
      console.log('Selected Comment:', data);
    });
  }

  createNewComment(): void {
    this.taskService.createComment(this.newComment).subscribe((data) => {
      console.log('Created:', data);
      this.fetchComments();
    });
  }

  updateComment(): void {
    this.taskService.updateComment(this.selectedComment, this.newComment).subscribe((data) => {
      console.log('Updated:', data);
      this.fetchComments();
    });
  }

  deleteComment(): void {
    this.taskService.deleteComment(this.selectedComment).subscribe((data) => {
      console.log('Deleted:', data);
      this.fetchComments();
    });
  }
}
