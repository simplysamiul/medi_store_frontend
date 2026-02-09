import { Category } from "@/components/dashboard/admin/EditCategory";
import { CategoryType } from "@/types";
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API;


export const categoryService = {

    addCategory: async function (category: CategoryType) {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/categories`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(category),
            });
            const data = await res.json();
            return { data: data, error: null }
        } catch (error) {
            return { data: null, error: { message: "Something went wrong" } }
        }
    },


    getCategoryById: async function (categoryId: string) {
        try {
            const res = await fetch(`${API_URL}/categories/${categoryId}`);
            const data = await res.json();
            return { data: data, error: null }
        } catch (error) {
            return { data: null, error: { message: "Something went wrong" } }
        }
    },

    getAllCategories: async function () {
        try {
            const res = await fetch(`${API_URL}/categories`);
            const data = await res.json();
            return { data: data, error: null }
        } catch (error) {
            return { data: null, error: { message: "Something went wrong" } }
        }
    },

    updateCategoryById: async function (catId:string,category: Category) {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/categories/${catId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(category),
            });
            const data = await res.json();
            return { data: data, error: null }
        } catch (error) {
            return { data: null, error: { message: "Something went wrong" } }
        }
    },

    deleteCategoryById: async function (categoryId: string) {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/categories/${categoryId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
            });
            const data = await res.json();
            return { data: data, error: null }
        } catch (error) {
            return { data: null, error: { message: "Something went wrong" } }
        }
    },
}