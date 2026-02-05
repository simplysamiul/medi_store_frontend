import { Routetype } from "@/types";

export const sellerRoutes:Routetype[] = [
    {
        title: "Seller-Dashboard",
        items: [
            {
                title: "Added Medicines",
                url: "/seller-dashboard/added-medicines",
            },
            {
                title: "Manage Medicines",
                url: "/seller-dashboard/manage-medicines",
            },
            {
                title: "Manage Orders",
                url: "/seller-dashboard/manage-orders",
            }
        ],
    }
]