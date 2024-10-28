import { createContext, Dispatch, useContext } from "react";
import { UserState, UserAction } from "../store/user";

export const UserContext = createContext<UserState | null>(null);
export const UserDispatchContext = createContext<Dispatch<UserAction> | null>(
    null
);

export const useUserContext = (): UserState => {
    const context = useContext(UserContext);
    if (context === null) {
        throw new Error(
            "useUserContext must be used within a UserContext.Provider"
        );
    }
    return context;
};

export const useUserDispatchContext = (): Dispatch<UserAction> => {
    const context = useContext(UserDispatchContext);
    if (context === null) {
        throw new Error(
            "useUserDispatchContext must be used within a UserDispatchContext.Provider"
        );
    }
    return context;
};
