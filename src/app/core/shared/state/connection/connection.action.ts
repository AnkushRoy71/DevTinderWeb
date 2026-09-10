import { createAction, props } from '@ngrx/store';
import { ConnectionModel } from '../../models/connection.model';

export const addConnection = createAction(
  '[Connection] Add Connection',
  props<{ connection: ConnectionModel[] }>(),
);

export const clearConnection = createAction('[Connection] Clear Connection');
