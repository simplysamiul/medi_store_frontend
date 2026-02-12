import { Routetype } from "@/types";

export const customerRoutes:Routetype[] = [
    {
        title: "Customer-Dashboard",
        items: [
            {
                title: "Ordered Medicine",
                url: "/dashboard/ordered-medicine",
            },
            {
                title: "Track Order",
                url: "/dashboard/track-order",
            }
        ],
    }
]