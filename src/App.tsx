import "./App.css";
import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from "react-router-dom";
import { useUserReducer } from "./utils/store/hooks";
import Update from "./pages/update";
import { UserContext, UserDispatchContext } from "./utils/contexts/user";
import Login from "./pages/login";
import { useEffect, useState } from "react";
import RootLayout from "./pages/rootLayout";
import Insert from "./pages/insert";
import Change from "./pages/change";
import Remove from "./pages/remove";

// Routing using react-browser-router.
const loggedInRouter = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true, //meaning that if it matches '/'
                element: <Navigate to="/update" replace />,
            },
            {
                path: "/update",
                element: <Update />,
            },
            {
                path: "/insert",
                element: <Insert />,
            },
            {
                path: "/change",
                element: <Change />,
            },
            {
                path: "/remove",
                element: <Remove />,
            },
        ],
    },
]);

const notLoggedInRouter = createBrowserRouter([
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "*",
        element: <Navigate to="/login" replace />, // All other paths will be redirected to /login
    },
]);

function App() {
    // Uses a comination of React's Reducers & localstorage to handle user's sessions. Uses React's Context to pass down the necessary components for the reducers.

    const [user, dispatch] = useUserReducer();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const username = localStorage.getItem("username");
        const userId = localStorage.getItem("userId");

        if (userId && username) {
            dispatch({
                type: "LOGIN",
                payload: { username: username, userId: parseInt(userId) },
            });
        }
        setLoading(false);
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <UserContext.Provider value={user}>
            <UserDispatchContext.Provider value={dispatch}>
                {user.isLoggedIn ? (
                    <RouterProvider router={loggedInRouter} />
                ) : (
                    <RouterProvider router={notLoggedInRouter} />
                )}

                {/* <RouterProvider router={loggedInRouter} /> */}
            </UserDispatchContext.Provider>
        </UserContext.Provider>
    );
}

export default App;
