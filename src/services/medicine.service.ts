
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

    getMedicineById: async function (medicineId:string) {
        try {
            const res = await fetch(`${API_URL}/medicines/${medicineId}`);
            const data = await res.json();
            return { data: data, error: null }
        } catch (error) {
            return { data: null, error: { message: "Something went wrong" } }
        }
    }
}