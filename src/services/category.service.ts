const API_URL = process.env.NEXT_PUBLIC_API;


export const categoryService = {
    getMedicines: async function (categoryId:string) {
        try {
            const res = await fetch(`${API_URL}/categories/${categoryId}`);
            const data = await res.json();
            return { data: data, error: null }
        } catch (error) {
            return { data: null, error: { message: "Something went wrong" } }
        }
    }
}