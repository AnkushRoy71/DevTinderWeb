import { Component, inject, OnInit } from '@angular/core';
import { ConnectionCard } from '../connection/connection-card/connection-card';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectRequest } from '../../core/shared/state/request/request.selector';
import { RequestService } from './request-service';

@Component({
  imports: [ConnectionCard],
  selector: 'app-request',
  styleUrl: './request.scss',
  templateUrl: './request.html',
})
export default class Request implements OnInit {
  requestService = inject(RequestService);
  storeService = inject(Store);
  requestStore = toSignal(this.storeService.select(selectRequest));

  ngOnInit() {
    console.log("request store" , this.requestStore())
    if (!this.requestStore()) {
      this.getRequests();
    }
  }
  getRequests() {
    // Call the service to get requests
    this.requestService.getRequests().subscribe({
      next: (response) => {
        console.log('requests fetched successfully:', response);
        this.storeService.dispatch({
          type: '[Request] Add Request',
          request: response.data,
        });
      },
      error: (error) => {
        console.error('Error fetching requests:', error);
        // Handle the error as needed
      },
    });
  }
}
