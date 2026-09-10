import { Component, inject, OnInit } from '@angular/core';
import { ConnectionCard } from '../../core/shared/components/connection-card/connection-card';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectRequest } from '../../core/shared/state/request/request.selector';
import { RequestService } from './request-service';
import { RequestStatus } from '../../core/shared/types/request-status';

@Component({
  imports: [ConnectionCard],
  selector: 'app-request',
  styleUrl: './request.scss',
  templateUrl: './request.html',
})
export default class Request implements OnInit {
  requestService = inject(RequestService);
  storeService = inject(Store);
  requestStore = toSignal(this.storeService.select(selectRequest), { initialValue: null });

  ngOnInit() {
    if (!this.requestStore()) {
      console.log("this is request", this.requestStore())
      this.getRequests();
    }
  }

  handleRequest(status: RequestStatus, requestId: string) {
    this.requestService.handleRequest(status, requestId).subscribe({
      next: (response) => {
        this.getRequests();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getRequests() {
    // Call the service to get requests
    this.requestService.getRequests().subscribe({
      next: (response) => {
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
