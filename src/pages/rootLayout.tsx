import { Outlet } from "react-router-dom";
import Sidebar from "./global/sidebar";
import Header from "./global/header";

const RootLayout = () => {
    return (
        <div className="">
            <div className=" w-full static">
                <Header />
            </div>
            <div className="flex">
                <div className=" w-60 bg-red-800">
                    <Sidebar />
                </div>
                <div className="flex-1">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default RootLayout;
