import { Component, Input } from '@angular/core';
import { ConnectionModel } from '../../../core/shared/models/connection.model';

@Component({
  imports: [],
  selector: 'app-connection-card',
  styleUrl: './connection-card.scss',
  templateUrl: './connection-card.html',
})
export class ConnectionCard {
  @Input() connection! : ConnectionModel
}
