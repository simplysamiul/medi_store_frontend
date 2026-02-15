"use server";

import { updatedUser } from "@/components/dashboard/admin/userEditModal";
import { userService } from "@/services/user.service";

export const getAllUsers = async () => {
    return await userService.getAllUsers();
};

export const updateUserById = async (userId:string, userData:any) => {
    return await userService.updateUserById(userId, userData);
};

export const deleteUserById = async (userId:string) => {
    return await userService.deleteUserById(userId);
};