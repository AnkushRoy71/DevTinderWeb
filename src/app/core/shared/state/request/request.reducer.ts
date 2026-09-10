import { createReducer, on } from '@ngrx/store';
import { addRequest, clearRequest } from './request.action';
import { initialRequestState } from './request.state';

export const requestReducer = createReducer(
  initialRequestState,

  on(addRequest, (state, { request }) => ({
    ...state,
    request,
  })),

  on(clearRequest, (state) => ({
    ...state,
    request: [],
  })),
);
