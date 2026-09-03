import { createAction, props } from '@ngrx/store';
import { UserModel } from '../../models/user.model';

export const addUser = createAction(
  '[User] Add User',
  props<{ user: UserModel }>()
);

export const clearUser = createAction(
  '[User] Clear User'
);