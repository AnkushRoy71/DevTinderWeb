import { createReducer, on } from '@ngrx/store';
import { initialConnectionState } from './connection.state';
import { addConnection, clearConnection } from './connection.action';

export const connectionReducer = createReducer(
  initialConnectionState,

  on(addConnection, (state, { connection }) => ({
    ...state,
    connection,
  })),

  on(clearConnection, (state) => ({
    ...state,
    connection: [],
  })),
);
