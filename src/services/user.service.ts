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
    }
}