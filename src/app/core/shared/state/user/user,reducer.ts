import { createReducer, on } from "@ngrx/store";
import { initialUserState } from "./user.state";
import { addUser, clearUser } from "./user.actions";

export const userReducer = createReducer(
  initialUserState,
  on(addUser, (state, { user})=>{
    return {
    ...state, user: user
  }
}),
on(clearUser, (state) =>{
  return{
    ...state, user:null
  }
})
);
