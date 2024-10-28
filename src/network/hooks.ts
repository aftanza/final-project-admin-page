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

export type PlacedOrdersType = {
    id: number;
    user_id: number;
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
