"use server";

import { categoryService } from "@/services/category.service"
import { CategoryType } from "@/types";


export const addCategory = async (category:CategoryType) => {
    return await categoryService.addCategory(category);
};

export const getCategories = async () => {
    return await categoryService.getAllCategories();
};


export const deleteCategoryById = async (categoryId:string) => {
    return await categoryService.deleteCategoryById(categoryId);
};