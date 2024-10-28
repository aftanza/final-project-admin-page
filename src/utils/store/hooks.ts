import { Dispatch, useReducer } from "react";
import userReducer, { UserAction, UserState } from "./user";

const userInitialState = {
    isLoggedIn: false,
};

export function useUserReducer(): [UserState, Dispatch<UserAction>] {
    const [state, dispatch] = useReducer(userReducer, userInitialState);
    return [state, dispatch];
}
