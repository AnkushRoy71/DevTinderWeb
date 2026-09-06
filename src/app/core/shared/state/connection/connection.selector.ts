import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ConnectionState } from './connection.state';

const selectConnectionState = createFeatureSelector<ConnectionState>('connection');

export const selectConnection = createSelector(
  selectConnectionState,
  (state: ConnectionState) => state.connection,
);
