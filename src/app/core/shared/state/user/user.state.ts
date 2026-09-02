import { UserModel } from "../../models/user.model";

export interface UserState{
    user: UserModel | null;
}

export const initialUserState: UserState = {
    user: null,
};