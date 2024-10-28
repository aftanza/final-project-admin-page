import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    supervisorLogin,
    SupervisorLoginSuccess,
    SupervisorLoginType,
} from "@/network/hooks";
import { useUserDispatchContext } from "@/utils/contexts/user";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();
    const dispatch = useUserDispatchContext();

    const handleLogin = async () => {
        // console.log("hello");
        const res: SupervisorLoginType = await supervisorLogin(
            username,
            password
        );

        if (res["success"]) {
            dispatch({
                type: "LOGIN",
                payload: {
                    username: username,
                    userId: (res as SupervisorLoginSuccess)["userId"],
                },
            });

            localStorage.setItem("username", username);
            localStorage.setItem(
                "userId",
                String((res as SupervisorLoginSuccess)["userId"])
            );

            navigate("/");
            console.log("login successful");
        } else {
            console.log("login failed");
        }
    };

    return (
        <div className=" w-dvw h-dvh flex justify-center items-center">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Login card</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                placeholder="Input Username"
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                    // console.log(e.target.value);
                                }}
                                value={username}
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                placeholder="Input Password"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                type="password"
                                value={password}
                            />
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button
                        variant="outline"
                        onClick={() => {
                            setUsername("");
                            setPassword("");
                        }}
                    >
                        Reset
                    </Button>
                    <Button onClick={handleLogin}>Login</Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default Login;
