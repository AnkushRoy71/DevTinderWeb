import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RequestState } from './request.state';

const selectRequestState = createFeatureSelector<RequestState>('request');

export const selectRequest = createSelector(
  selectRequestState,
  (state: RequestState) => state.request,
);
