import { getPlacedOrders, PlacedOrdersType } from "@/network/hooks";
// import { useUserContext, useUserDispatchContext } from "@/utils/contexts/user";
import { useEffect, useState } from "react";
import { DataTable } from "./components/table";
import { DataTableColumns } from "./components/table/components/columns";
// import { useNavigate } from "react-router-dom";

export type ModifiedPlacedOrdersType = Omit<
    PlacedOrdersType,
    "id" | "user_id"
> & {
    id: string;
    user_id: string;
};

const Update = () => {
    const [placedOrders, setPlacedOrders] =
        useState<ModifiedPlacedOrdersType[]>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        getPlacedOrders()
            .then((res) => {
                return res.map((item) => ({
                    ...item,
                    id: item.id.toString(),
                    user_id: item.user_id.toString(),
                }));
            })
            .then((res) => {
                setPlacedOrders(res);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);
    // setPlacedOrders(res);
    //         setIsLoading(false);

    return (
        <div>
            {/* <Input type="email" placeholder="Email" /> */}
            {isLoading && <>Loading...</>}

            {/* {!isLoading &&
                placedOrders?.map((placedOrder) => {
                    return <>{JSON.stringify(placedOrder)}</>;
                })} */}
            <div className="container mx-auto py-10">
                {!isLoading && (
                    <DataTable
                        columns={DataTableColumns}
                        data={placedOrders as ModifiedPlacedOrdersType[]}
                    />
                )}
            </div>
        </div>
    );
};

export default Update;
