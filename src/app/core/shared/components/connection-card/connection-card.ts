import { Component, Input, output } from '@angular/core';
import { ConnectionModel } from '../../models/connection.model';
import { ButtonModule } from 'primeng/button';
import { RequestStatus } from '../../types/request-status';

@Component({
  imports: [ButtonModule],
  selector: 'app-connection-card',
  styleUrl: './connection-card.scss',
  templateUrl: './connection-card.html',
})
export class ConnectionCard {
  @Input() connection!: ConnectionModel;
  @Input() isButtonNeeded = false;
  status = output<RequestStatus>()
}
