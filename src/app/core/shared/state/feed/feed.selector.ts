import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FeedState } from "./feed.state";

const selectFeedState = createFeatureSelector<FeedState>('feed');

export const selectFeed = createSelector(selectFeedState, (state: FeedState) => state.feed);
