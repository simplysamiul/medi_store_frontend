"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { User } from "./UsersList";
import { updateUserById } from "@/actions/user.action";

interface EditUserModalProps {
  open: boolean;
  user: User;
  onClose: () => void;
  onUpdated: (user: User) => void;
}

export type updatedUser = {
  name: string;
  email: string;
  emailVerified: boolean;
  phone: string | null;
  role: "ADMIN" | "SELLER" | "CUSTOMER";
  status: "ACTIVE" | "INACTIVE" | "BLOCKED";
  image: string | null;
};

const UserEditModal = ({
  open,
  user,
  onClose,
  onUpdated,
}: EditUserModalProps) => {
  const { register, handleSubmit, reset } = useForm<updatedUser>();

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
        emailVerified: user.emailVerified,
        phone: user.phone,
        role: user.role,
        status: user.status,
        image: user.image,
      });
    }
  }, [user, reset]);

  const onSubmit: SubmitHandler<updatedUser> = async (data) => {
    const res = await updateUserById(user.id, data);

    if (res?.data?.success) {
      onUpdated(res.data.data);
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <div>
            <Label>Name</Label>
            <Input {...register("name")} />
          </div>

          <div>
            <Label>Email</Label>
            <Input {...register("email")} />
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" {...register("emailVerified")} />
            <Label>Email Verified</Label>
          </div>

          <div>
            <Label>Phone</Label>
            <Input {...register("phone")} />
          </div>

          <div>
            <Label>Image URL</Label>
            <Input {...register("image")} />
          </div>

          <div>
            <Label>Role</Label>
            <select
              {...register("role")}
              className="w-full border rounded-md p-2"
            >
              <option value="ADMIN">Admin</option>
              <option value="SELLER">Seller</option>
              <option value="CUSTOMER">Customer</option>
            </select>
          </div>

          <div>
            <Label>Status</Label>
            <select
              {...register("status")}
              className="w-full border rounded-md p-2"
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="BLOCKED">Blocked</option>
            </select>
          </div>

          {/* System fields */}
          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <Label>Created At</Label>
              <Input value={new Date(user.createdAt).toLocaleString()} disabled />
            </div>
            <div>
              <Label>Updated At</Label>
              <Input value={new Date(user.updatedAt).toLocaleString()} disabled />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Update User</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserEditModal;
