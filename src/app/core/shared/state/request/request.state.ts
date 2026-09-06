import { RequestModel } from '../../models/request.model';

export interface RequestState {
  request: RequestModel[] | null;
}

export const initialRequestState: RequestState = {
  request: null,
};
