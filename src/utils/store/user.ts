enum UserLoginActionKind {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
}

export type UserState = {
    username?: string;
    userId?: number;
    isLoggedIn: boolean;
};

type UserLoginAction = {
    type: "LOGIN";
    payload: {
        username: string;
        userId: number;
    };
};

type UserLogoutAction = {
    type: "LOGOUT";
};

export type UserAction = UserLoginAction | UserLogoutAction;

// https://dev.to/craigaholliday/using-the-usereducer-hook-in-react-with-typescript-27m1
// https://reactrouter.com/en/main/start/tutorial

function userReducer(state: UserState, action: UserAction): UserState {
    switch (action.type) {
        case UserLoginActionKind.LOGIN:
            return {
                ...state,
                username: action.payload.username,
                userId: action.payload.userId,
                isLoggedIn: true,
            };
        case UserLoginActionKind.LOGOUT:
            return {
                ...state,
                username: undefined,
                userId: undefined,
                isLoggedIn: false,
            };
        default:
            return state;
    }
}

export default userReducer;
