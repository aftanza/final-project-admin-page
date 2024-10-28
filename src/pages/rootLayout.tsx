import { Outlet } from "react-router-dom";
import Sidebar from "./global/sidebar";
import Header from "./global/header";
import { Toaster } from "@/components/ui/toaster";

const RootLayout = () => {
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <Header className="w-full z-10 border-b border-border" />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar className="w-60 flex-shrink-0 overflow-hidden" />
                <main className="flex-1 overflow-y-auto p-6">
                    <Outlet />
                    <Toaster />
                </main>
            </div>
        </div>
    );
};

export default RootLayout;
