import "server-only";
import { updatedUser } from "@/components/dashboard/admin/userEditModal";
import { cookies } from "next/headers"

export const userService = {
    getSession: async function () {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/get-session`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",
            })
            const seassion = await res.json();

            if (!seassion) {
                return { data: null, error: { message: "Seassion is not found..!" } }
            }

            return { data: seassion, error: null };
        } catch (error) {
            return {
                data: null,
                error: { message: "Failed to fetch session" },
                details : error
            };
        }
    },


    getAllUsers: async function () {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${process.env.NEXT_PUBLIC_API}/users`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",
            })
            const seassion = await res.json();

            if (!seassion) {
                return { data: null, error: { message: "Users not found..!" } }
            }

            return { data: seassion, error: null };
        } catch (error) {
            return {
                data: null,
                error: { message: "Failed to retrive users..!" },
                details : error
            };
        }
    },

    updateUserById: async function (userId:string, userData:updatedUser) {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${process.env.NEXT_PUBLIC_API}/users/${userId}`, {
                method:"PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(userData),
                cache: "no-store",
            })
            const seassion = await res.json();

            if (!seassion) {
                return { data: null, error: { message: "Users not found..!" } }
            }

            return { data: seassion, error: null };
        } catch (error) {
            return {
                data: null,
                error: { message: "Failed to delete user..!" },
                details : error
            };
        }
    },


    deleteUserById: async function (userId:string) {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${process.env.NEXT_PUBLIC_API}/users/${userId}`, {
                method:"DELETE",
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",
            })
            const seassion = await res.json();

            if (!seassion) {
                return { data: null, error: { message: "Users not found..!" } }
            }

            return { data: seassion, error: null };
        } catch (error) {
            return {
                data: null,
                error: { message: "Failed to delete user..!" },
                details : error
            };
        }
    },


    
}