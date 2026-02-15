"use server";

import { Category } from "@/components/dashboard/admin/EditCategory";
import { categoryService } from "@/services/category.service"


export const addCategory = async (category:any) => {
    return await categoryService.addCategory(category);
};

export const getCategories = async () => {
    return await categoryService.getAllCategories();
};


export const updateCategoryById = async (categoryId:string, category:Category) => {
    return await categoryService.updateCategoryById(categoryId, category);
};

export const deleteCategoryById = async (categoryId:string) => {
    return await categoryService.deleteCategoryById(categoryId);
};