import { createReducer, on } from "@ngrx/store";
import { initialUserState } from "./user.state";
import { addUser } from "./user.actions";

export const userReducer = createReducer(
  initialUserState,
  on(addUser, (state, { user})=>{
    console.log('Reducer received Load User');
    return {
    ...state, user: user
  }
})
);