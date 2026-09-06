import { Component, inject, OnInit } from '@angular/core';
import { ConnectionCard } from './connection-card/connection-card';
import { ConnectionService } from './connection-service';

@Component({
  imports: [ConnectionCard],
  selector: 'app-connection',
  styleUrl: './connection.scss',
  templateUrl: './connection.html',
})
export default class Connection implements OnInit {
  connectionService = inject(ConnectionService);

  ngOnInit() {
    this.getConnections();
  }
  getConnections() {
    // Call the service to get connections
    this.connectionService.getConnections().subscribe({
      next: (response) => {
        console.log('Connections fetched successfully:', response);
        // Handle the response data as needed
      },
      error: (error) => {
        console.error('Error fetching connections:', error);
        // Handle the error as needed
      }
    });
  }
}
