import { createReducer, on } from "@ngrx/store";
import { initialFeedState } from "./feed.state";
import { addFeed } from "./feed.actions";


export const feedReducer = createReducer(
  initialFeedState,

  on(addFeed, (state, { feed }) => {
    console.log('Reducer received Add Feed action with feed:', feed);
    return {
      ...state,
      feed: feed,
    };
  }),
);