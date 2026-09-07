import { Component, Input } from '@angular/core';
import { ConnectionModel } from '../../models/connection.model';
import { ButtonModule } from 'primeng/button';

@Component({
  imports: [ButtonModule],
  selector: 'app-connection-card',
  styleUrl: './connection-card.scss',
  templateUrl: './connection-card.html',
})
export class ConnectionCard {
  @Input() connection!: ConnectionModel;
}
