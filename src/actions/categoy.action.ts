"use server";

import { categoryService } from "@/services/category.service"


export const getCategories = async () => {
    return await categoryService.getAllCategories();
}