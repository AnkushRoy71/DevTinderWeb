import { Component, Input, output } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { FeedModel } from '../../../../core/shared/models/feed.model';
import { UpperCasePipe } from '@angular/common';
import { ConnectionStatus } from '../../../../core/shared/types/request-status';

@Component({
  imports: [AvatarModule, CardModule, TagModule, ButtonModule, UpperCasePipe],
  selector: 'app-feed-card',
  styleUrl: './feed-card.scss',
  templateUrl: './feed-card.html',
})
export class FeedCard {
  @Input() feedItem!: FeedModel;
  status = output<ConnectionStatus>();
}
