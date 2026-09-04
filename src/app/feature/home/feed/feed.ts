import { Component, inject } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { FeedService } from '../feed-service';
import { ApiResponseModel } from '../../../core/shared/models/apiReponse.model';
import { FeedModel } from '../../../core/shared/models/feed.model';
import { Store } from '@ngrx/store';

@Component({
  imports: [AvatarModule, CardModule, TagModule, ButtonModule],
  selector: 'app-feed',
  styleUrl: './feed.scss',
  templateUrl: './feed.html',
})
export default class Feed {

  feedService = inject(FeedService);
  storeService = inject(Store);
  feedItems: FeedModel[] = [];

  ngOnInit(): void {
    this.getFeedItems();
  }

  getFeedItems() {
    this.feedService.getFeed().subscribe({
      next: (response: ApiResponseModel<FeedModel[]>) => {
        this.feedItems = response.data;
        console.log('Feed items:', this.feedItems);
        this.storeService.dispatch({ type: '[Feed] Add Feed', feed: response.data });
      },
      error: (error: ApiResponseModel<FeedModel>) => {
        console.error('Error fetching feed items:', error);
      },
    });
  }
}
