import { createAction, props } from '@ngrx/store';
import { RequestModel } from '../../models/request.model';

export const addRequest = createAction(
  '[Request] Add Request',
  props<{ request: RequestModel[] }>(),
);
