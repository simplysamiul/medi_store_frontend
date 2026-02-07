import "server-only";
import { MedicineType } from "@/types";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API;


export const medicineService = {
    getMedicines: async function () {
        try {
            const res = await fetch(`${API_URL}/medicines`);
            const data = await res.json();
            return { data: data, error: null }
        } catch (error) {
            return { data: null, error: { message: "Something went wrong" } }
        }
    },

    getMedicineById: async function (medicineId: string) {
        try {
            const res = await fetch(`${API_URL}/medicines/${medicineId}`);
            const data = await res.json();
            return { data: data, error: null }
        } catch (error) {
            return { data: null, error: { message: "Something went wrong" } }
        }
    },

    postAMedicine: async function (medicineInfo: MedicineType) {
        try {
            const cookieStore = await cookies();
            console.log(cookieStore)
            const res = await fetch(`${API_URL}/medicines`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(medicineInfo),
                credentials: "include",
                cache: "no-store",
            });
            const data = await res.json();
            console.log(data)
            return { data: data, error: null }
        } catch (error) {
            return { data: null, error: { message: "Something went wrong" } }
        }
    },

}