// import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getPlacedOrders, PlacedOrdersType } from "@/network/hooks";
// import { useUserContext, useUserDispatchContext } from "@/utils/contexts/user";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

const Home = () => {
    const [placedOrders, setPlacedOrders] = useState<PlacedOrdersType[]>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        getPlacedOrders().then((res) => {
            setPlacedOrders(res);
            setIsLoading(false);
        });
    }, []);

    return (
        <div>
            <Input type="email" placeholder="Email" />
            {isLoading && <>Loading...</>}

            {!isLoading &&
                placedOrders?.map((placedOrder) => {
                    return <>{JSON.stringify(placedOrder)}</>;
                })}
        </div>
    );
};

export default Home;
