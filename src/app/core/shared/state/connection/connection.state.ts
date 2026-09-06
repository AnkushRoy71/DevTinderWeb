import { ConnectionModel } from '../../models/connection.model';

export interface ConnectionState {
  connection: ConnectionModel[] | null;
}

export const initialConnectionState: ConnectionState = {
  connection: null,
};
