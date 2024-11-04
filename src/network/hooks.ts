const PORT = 8001;
const DOMAIN = "localhost";

const baseUrl = `http://${DOMAIN}:${PORT}`;

export type SupervisorLoginFailed = {
    success: boolean;
};

export type SupervisorLoginSuccess = {
    success: boolean;
    userId: number;
};

export type SupervisorLoginType =
    | SupervisorLoginSuccess
    | SupervisorLoginFailed;

export async function supervisorLogin(
    username: string,
    password: string
): Promise<SupervisorLoginType> {
    const res = await fetch(baseUrl + "/api/supervisors", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
    });

    if (!res.ok) {
        throw new Error("Failed to login. Server responded with an error.");
    }
    const data: SupervisorLoginType = await res.json();
    return data;
}

export type PlacedOrdersOrderStatuses =
    | "order_placed"
    | "processing"
    | "shipped"
    | "out_for_delivery"
    | "delivered"
    | "cancelled"
    | "returned";

export type PlacedOrdersType = {
    id: number;
    user_id: number;
    order_status: PlacedOrdersOrderStatuses;
    created_at: string;
    updated_at: string;
};

export async function getPlacedOrders() {
    const res = await fetch(baseUrl + "/api/placed_orders", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        throw new Error("Failed to login. Server responded with an error.");
    }
    const data: PlacedOrdersType[] = await res.json();
    return data;
}

export type ChangeOrderStatusResponse = {
    success: boolean;
    message: string;
    updatedOrder: {
        placed_order_id: number;
        next_order_status: PlacedOrdersOrderStatuses;
    };
};

export type ChangeOrderStatusType = {
    placed_order_id: number;
    supervisor_id: number;
    next_order_status: PlacedOrdersOrderStatuses;
};

export async function changeOrderStatus({
    placed_order_id,
    supervisor_id,
    next_order_status,
}: ChangeOrderStatusType) {
    const res = await fetch(baseUrl + "/api/change_order_status", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            placed_order_id: placed_order_id,
            supervisor_id: supervisor_id,
            next_order_status: next_order_status,
        }),
    });
    if (!res.ok) {
        throw new Error(
            "Failed to change order status. Server responded with an error."
        );
    }
    const data: ChangeOrderStatusResponse = await res.json();
    return data;
}

type GetCustomerEmailResponse = {
    email: string;
};
export async function getCustomerEmail(customer_id: number) {
    const res = await fetch(baseUrl + "/api/get_customer_email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ customer_id: customer_id }),
    });

    if (!res.ok) {
        throw new Error("Failed getting customer email.");
    }
    const data: GetCustomerEmailResponse = await res.json();
    return data;
}

export async function sendCustomerUpdateEmail(
    customer_email: string,
    order_status: PlacedOrdersOrderStatuses
) {
    const res = await fetch(baseUrl + "/api/send_customer_update_email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            customer_email: customer_email,
            order_status: order_status,
        }),
    });

    if (!res.ok) {
        throw new Error("Failed getting customer email.");
    }
    return res.ok;
}

export type ListingCategories =
    | "keyboards"
    | "mice"
    | "gpu"
    | "cpu"
    | "ram"
    | "prebuilt";

export type ListingBrands = "apple" | "samsung" | "sony" | "dell" | "asus";

export type ListingType = {
    name: string;
    description: string;
    price: number;
    category: ListingCategories;
    img_url: string;
    brand: ListingBrands;
    rating: number;
};

export type ListingTypeWithId = ListingType & {
    id: number;
};

export async function insertListing(props: ListingType) {
    const res = await fetch(baseUrl + "/api/listing/insert", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(props),
    });

    if (!res.ok) {
        throw new Error(
            "Failed to insert listing. Server responded with an error."
        );
    }
    return res.ok;
}

export async function getListingDetails(id: number) {
    const res = await fetch(baseUrl + "/api/listing/get", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
    });

    if (!res.ok) {
        throw new Error(
            "Cant get listing details. Server responded with an error."
        );
    }

    const data: ListingType | null = await res.json();

    return data;
}

export async function changeListing(props: ListingTypeWithId) {
    const res = await fetch(baseUrl + "/api/listing/change", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(props),
    });
    if (!res.ok) {
        throw new Error(
            "Failed to change listing. Server responded with an error."
        );
    }
    return res.ok;
}

export async function removeListing(id: number) {
    const res = await fetch(baseUrl + "/api/listing/remove", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
    });
    if (!res.ok) {
        throw new Error(
            "Failed to remove listing. Server responded with an error."
        );
    }
    return res.ok;
}
