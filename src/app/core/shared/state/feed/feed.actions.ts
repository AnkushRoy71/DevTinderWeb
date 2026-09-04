import { createAction, props } from "@ngrx/store";
import { FeedModel } from "../../models/feed.model";

export const addFeed = createAction(
    '[Feed] Add Feed',
    props<{ feed: FeedModel[] }>()
)
