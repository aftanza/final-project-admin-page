import { Button } from "@/components/ui/button";
import { ModifiedPlacedOrdersType } from "@/pages/update";
import { ColumnDef } from "@tanstack/react-table";

import { ChevronDown } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    changeOrderStatus,
    ChangeOrderStatusType,
    getCustomerEmail,
    PlacedOrdersOrderStatuses,
    sendCustomerUpdateEmailMailersend,
} from "@/network/hooks";
import { useUserContext } from "@/utils/contexts/user";

const statuses: PlacedOrdersOrderStatuses[] = [
    "order_placed",
    "processing",
    "shipped",
    "out_for_delivery",
    "delivered",
    "cancelled",
    "returned",
];

type HandleChangeStatusType = ChangeOrderStatusType & {
    customer_id: number;
};

export const DataTableColumns: ColumnDef<ModifiedPlacedOrdersType>[] = [
    {
        accessorKey: "id",
        header: "Id",
    },
    {
        accessorKey: "user_id",
        header: "User Id",
    },
    {
        accessorKey: "order_status",
        header: "Order Status",
        cell: ({ row }) => {
            const handleChangeStatus = async ({
                placed_order_id,
                supervisor_id,
                next_order_status,
                customer_id,
            }: HandleChangeStatusType) => {
                await changeOrderStatus({
                    placed_order_id: placed_order_id,
                    supervisor_id: supervisor_id,
                    next_order_status: next_order_status,
                });

                const res = await getCustomerEmail(customer_id);
                const customerEmail = res["email"];
                // sendCustomerUpdateEmail(customerEmail, next_order_status);
                sendCustomerUpdateEmailMailersend(
                    customerEmail,
                    next_order_status,
                    placed_order_id
                );

                window.location.reload();
            };

            // eslint-disable-next-line react-hooks/rules-of-hooks
            const user = useUserContext();

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            className=" w-full justify-between pl-6 pr-3"
                            variant={"outline"}
                        >
                            {row.original["order_status"]}
                            <ChevronDown className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>
                            Change Order Status
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {statuses.map((status, index) => {
                            return (
                                <DropdownMenuItem
                                    key={index}
                                    onClick={() => {
                                        // console.log(row.original["user_id"]);
                                        handleChangeStatus({
                                            placed_order_id: parseInt(
                                                row.original["id"]
                                            ),
                                            next_order_status: status,
                                            supervisor_id:
                                                user.userId as number,
                                            customer_id: parseInt(
                                                row.original["user_id"]
                                            ),
                                        });
                                    }}
                                >
                                    {status}
                                </DropdownMenuItem>
                            );
                        })}
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
    {
        accessorKey: "created_at",
        header: "Created At",
    },
    {
        accessorKey: "updated_at",
        header: "Updated At",
    },
];
