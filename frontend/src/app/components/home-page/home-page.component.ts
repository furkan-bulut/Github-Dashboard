import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent{
  githubUrl : string = "";
  
  SendUrlToBackend()
  {
      // Validate URL format
  if (!this.githubUrl || !this.githubUrl.startsWith('https://api.github.com/')) {
    alert('Please enter a valid GitHub URL.');
    return;
  }

  // Send the URL to the backend
  fetch('http://localhost:3000/fetch-data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ url : this.githubUrl })
  })
  .then(response => response.json())
  .then(data => {
    // Handle the data from the backend
    console.log(data);
    alert('Data fetched successfully!');
  })
  .catch(error => {
    console.error('Error fetching data:', error);
    alert('Error fetching data. Please check the console for more details.');
  });
  }
  
}

