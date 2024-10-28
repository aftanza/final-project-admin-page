import { PlacedOrdersType } from "@/network/hooks";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<PlacedOrdersType>[] = [
    {
        accessorKey: "id",
        header: "Id",
    },
    {
        accessorKey: "user_id",
        header: "User Id",
    },
    {
        accessorKey: "created_at",
        header: "Created At",
    },
];
