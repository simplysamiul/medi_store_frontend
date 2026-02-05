import { Routetype } from "@/types";

export const adminRoutes:Routetype[] = [
    {
        title: "Admin-Dashboard",
        items: [
            {
                title: "All Users",
                url: "/admin-dashboard/all-users",
            },
            {
                title: "Manage Users",
                url: "/admin-dashboard/manage-users",
            },
            {
                title: "Medicine List",
                url: "/admin-dashboard/medicine-list",
            },
            {
                title: "Ordered List",
                url: "/admin-dashboard/ordered-list",
            },
            {
                title: "Manage Categories",
                url: "/admin-dashboard/manage-categories",
            },
        ],
    }
]