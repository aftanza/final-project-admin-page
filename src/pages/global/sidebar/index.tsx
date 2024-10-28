import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FileText, RefreshCw, User } from "lucide-react";
import { useUserDispatchContext } from "@/utils/contexts/user";
import { Separator } from "@/components/ui/separator";

const pages = [
    { name: "Report", icon: FileText, path: "/report" },
    { name: "Update", icon: RefreshCw, path: "/update" },
];

export default function Sidebar({ ...props }) {
    const navigate = useNavigate();
    const dispatch = useUserDispatchContext();

    return (
        <div {...props}>
            <div className="flex flex-col w-60 border-solid bg-background border-r p-4 h-full">
                <h2 className="text-lg font-semibold mb-4 text-primary">
                    Admin Page
                </h2>
                {pages.map((page) => (
                    <Button
                        key={page.name}
                        variant="ghost"
                        className="w-full justify-start mb-2 text-primary"
                        onClick={() => navigate(page.path)}
                    >
                        <page.icon className="mr-2 h-4 w-4" />
                        {page.name}
                    </Button>
                ))}

                <div className="mt-auto">
                    <Separator />
                    <div className="flex items-center py-2">
                        <User />
                        <Button
                            className="p-2 ml-auto"
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
                    </div>
                </div>
            </div>
        </div>
    );
}
