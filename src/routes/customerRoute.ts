import { Routetype } from "@/types";

export const customerRoutes:Routetype[] = [
    {
        title: "Customer-Dashboard",
        items: [
            {
                title: "View cart",
                url: "/dashboard/view-cart",
            },
            {
                title: "Ordered Medicine",
                url: "/dashboard/ordered-medicine",
            },
            {
                title: "Track Order",
                url: "/dashboard/track-order",
            },
            {
                title: "Provide Review",
                url: "/dashboard/provide-review",
            }
        ],
    }
]