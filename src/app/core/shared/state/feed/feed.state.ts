import { FeedModel } from "../../models/feed.model";

export interface FeedState{
    feed: FeedModel[] | null;
}

export const initialFeedState: FeedState = {
    feed: null,
};