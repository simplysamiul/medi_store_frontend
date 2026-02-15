"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { updateUserById } from "@/actions/user.action";
import { toast } from "react-toastify";
import Image from "next/image";

// ================= TYPES =================
interface ProfileFormValues {
  name: string;
  email: string;
  phone: string;
  image: string;
}

export default function ProfileComponent() {
  const session = authClient.useSession();
  const user = session.data?.user;

  const { register, handleSubmit, reset, formState: { isDirty, isValid } } = useForm<ProfileFormValues>({
    defaultValues: { name: "", email: "", phone: "", image: "" },
    mode: "onChange",
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name ?? "",
        email: user.email ?? "",
        phone: (user as any).phone ?? "",
        image: user.image ?? "",
      });
    }
  }, [user, reset]);

  // ================= UPDATE HANDLER =================
  const onSubmit = async (data: ProfileFormValues) => {
    try {

      const res = await updateUserById(user?.id as string, data);
      if (res.data?.success) {
        toast.success("Profile Update successfully ..!")
      }

    } catch (error) {
      console.error("Profile update failed", error);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <h2 className="font-bold text-lg">Update Your Profile</h2>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Email Verification Notification */}
        {!user.emailVerified && (
          <div className="flex items-center gap-3 bg-yellow-100 text-yellow-800 px-4 py-3 rounded-xl text-sm">
            <AlertCircle className="w-5 h-5" />
            Your email is not verified. Please verify your email to secure your account.
          </div>
        )}

        <Card className="rounded-2xl shadow-md border-0">
          <CardContent className="p-6 sm:p-10 space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <Image
                src={(user as any).image}
                width={24}
                height={24}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border"
              />
              <div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-gray-500 text-sm">{user.email}</p>
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                <Input {...register("name", { required: true })} />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  {...register("email", { required: true })}
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Phone</label>
                <Input {...register("phone", { required: true })} />
              </div>

              {/* Image URL */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Profile Image URL</label>
                <Input {...register("image")} />
              </div>

              {/* Update Button */}
              <div className="sm:col-span-2 pt-4">
                <Button
                  type="submit"
                  disabled={!isDirty || !isValid}
                  className="w-full h-12 rounded-xl"
                >
                  Update Profile
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Bottom Status Section */}
        <Card className="rounded-2xl shadow-sm border">
          <CardContent className="p-6 flex flex-col sm:flex-row sm:justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500">Account Role</p>
              <Badge className="mt-1 px-4 py-1 rounded-full">
                {(user as any).role}
              </Badge>
            </div>

            <div>
              <p className="text-sm text-gray-500">Account Status</p>
              <Badge
                className={`mt-1 px-4 py-1 rounded-full ${(user as any).status === "BLOCKED"
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                  }`}
              >
                {(user as any).status}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
