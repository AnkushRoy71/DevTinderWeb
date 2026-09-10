import { createReducer, on } from '@ngrx/store';
import { initialFeedState } from './feed.state';
import { addFeed, clearFeed } from './feed.actions';

export const feedReducer = createReducer(
  initialFeedState,

  on(addFeed, (state, { feed }) => ({
    ...state,
    feed,
  })),

  on(clearFeed, (state) => ({
    ...state,
    feed: [],
  })),
);
