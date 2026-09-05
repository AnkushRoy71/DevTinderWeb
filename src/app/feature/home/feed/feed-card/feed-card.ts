import { Component, Input } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { FeedModel } from '../../../../core/shared/models/feed.model';
import { UpperCasePipe } from '@angular/common';

@Component({
  imports: [AvatarModule, CardModule, TagModule, ButtonModule, UpperCasePipe],
  selector: 'app-feed-card',
  styleUrl: './feed-card.scss',
  templateUrl: './feed-card.html',
})
export class FeedCard {
  @Input() feedItem!: FeedModel;
}
