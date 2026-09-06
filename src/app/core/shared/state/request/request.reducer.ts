import { createReducer, on } from '@ngrx/store';
import { addRequest } from './request.action';
import { initialRequestState } from './request.state';

export const requestReducer = createReducer(
  initialRequestState,

  on(addRequest, (state, { request }) => ({
    ...state,
    request: [...(state.request ?? []), ...request],
  })),
);
