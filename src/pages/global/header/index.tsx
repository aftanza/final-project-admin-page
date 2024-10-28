import { Button } from "@/components/ui/button";
import { useUserContext, useUserDispatchContext } from "@/utils/contexts/user";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const user = useUserContext();
    const dispatch = useUserDispatchContext();

    const navigate = useNavigate();
    return (
        <>
            <Button
                onClick={() => {
                    console.log(user);
                }}
            >
                Get Context
            </Button>
            <Button
                onClick={() => {
                    dispatch({
                        type: "LOGOUT",
                    });

                    localStorage.removeItem("username");
                    localStorage.removeItem("userId");

                    navigate("/");
                }}
            >
                Logout
            </Button>
        </>
    );
};

export default Header;
