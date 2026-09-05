import { Component, inject } from '@angular/core';
import { FeedService } from '../feed-service';
import { ApiResponseModel } from '../../../core/shared/models/apiReponse.model';
import { FeedModel } from '../../../core/shared/models/feed.model';
import { Store } from '@ngrx/store';
import { selectFeed } from '../../../core/shared/state/feed/feed.selector';
import { FeedCard } from "./feed-card/feed-card";

@Component({
  imports: [FeedCard],
  selector: 'app-feed',
  styleUrl: './feed.scss',
  templateUrl: './feed.html',
})
export default class Feed {
  feedService = inject(FeedService);
  storeService = inject(Store);
  feedItems: FeedModel[] = [];
  feedState$ = this.storeService.select(selectFeed);

  ngOnInit(): void {
    this.feedState$.subscribe((feed) => {
      if(!feed){
        this.getFeedItems();
      }
      else{
        this.feedItems = feed.length > 0 ? feed : [];
      }
    });
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
