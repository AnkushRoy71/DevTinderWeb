import { Component, inject, OnInit } from '@angular/core';
import { ConnectionCard } from '../../core/shared/components/connection-card/connection-card';
import { ConnectionService } from './connection-service';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectConnection } from '../../core/shared/state/connection/connection.selector';

@Component({
  imports: [ConnectionCard],
  selector: 'app-connection',
  styleUrl: './connection.scss',
  templateUrl: './connection.html',
})
export default class Connection implements OnInit {
  connectionService = inject(ConnectionService);
  storeService = inject(Store);
  connectionStore = toSignal(this.storeService.select(selectConnection));

  ngOnInit() {
    if (!this.connectionStore()) {
      this.getConnections();
    }
  }
  getConnections() {
    // Call the service to get connections
    this.connectionService.getConnections().subscribe({
      next: (response) => {
        console.log('Connections fetched successfully:', response);
        this.storeService.dispatch({
          type: '[Connection] Add Connection',
          connection: response.data,
        });
      },
      error: (error) => {
        console.error('Error fetching connections:', error);
        // Handle the error as needed
      },
    });
  }
}
