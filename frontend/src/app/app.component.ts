import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', // Pointing to the HTML template
  styleUrls: ['./app.component.css']   // Optional: pointing to CSS
})
export class AppComponent {
  title = 'GitHub CRUD Application'; // Example property

  constructor(private router: Router) {} // Inject the Router

  // Methods for Navigation
  goToPullRequests() {
    this.router.navigate(['/pull-requests']);
  }

  goToCommits() {
    this.router.navigate(['/commits']);
  }

  goToComments() {
    this.router.navigate(['/comments']);
  }
  goToHomePage() {
    this.router.navigate(['/home']);
  }
}
