"use client";

import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";
import Link from "next/link";

// --------------------
// Validation Schema
// --------------------
const registerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    image: z.string().url("Invalid image URL"),
    role: z.enum(["customer", "seller"]),
    password: z.string().min(6, "Password must be at least 6 characters"),
    phone: z
        .string()
        .regex(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            role: "customer",
        },
    });

    // Watch role to change label dynamically
    const selectedRole = useWatch({
        control,
        name: "role",
    });

    const onSubmit = (data: RegisterFormValues) => {
        const finalData = {
            ...data,
            phone: `+880${data.phone}`,
        };

        console.log(finalData);
    };

    return (
        <div className="my-6 flex items-center justify-center bg-muted/40 px-4">
            <Card className="w-full max-w-md shadow-md">
                <CardHeader className="text-center space-y-2">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                        <Lock className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
                    <CardDescription>
                        Join MediStore and access healthcare essentials.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Name */}
                        <div className="space-y-1">
                            <Label>Name</Label>
                            <Input placeholder="Your full name" {...register("name")} />
                            {errors.name && (
                                <p className="text-sm text-red-500">{errors.name.message}</p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="space-y-1">
                            <Label>Email</Label>
                            <Input
                                type="email"
                                placeholder="name@example.com"
                                {...register("email")}
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Account Type */}
                        <div className="space-y-2">
                            <Label>Account Type</Label>
                            <div className="flex gap-6">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        value="customer"
                                        {...register("role")}
                                        defaultChecked
                                        className="accent-blue-600"
                                    />
                                    <span>Customer</span>
                                </label>

                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        value="seller"
                                        {...register("role")}
                                        className="accent-blue-600"
                                    />
                                    <span>Seller</span>
                                </label>
                            </div>
                            {errors.role && (
                                <p className="text-sm text-red-500">{errors.role.message}</p>
                            )}
                        </div>

                        {/* Image (Dynamic Label) */}
                        <div className="space-y-1">
                            <Label>
                                {selectedRole === "seller"
                                    ? "Store Logo"
                                    : "Profile Image"}
                            </Label>
                            <Input
                                placeholder={
                                    selectedRole === "seller"
                                        ? "https://example.com/store-logo.png"
                                        : "https://example.com/profile-image.jpg"
                                }
                                {...register("image")}
                            />
                            {errors.image && (
                                <p className="text-sm text-red-500">{errors.image.message}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="space-y-1">
                            <Label>Password</Label>
                            <Input
                                type="password"
                                placeholder="Enter your password"
                                {...register("password")}
                            />
                            {errors.password && (
                                <p className="text-sm text-red-500">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Phone */}
                        <div className="space-y-1">
                            <Label>Phone Number</Label>
                            <div className="flex gap-2">
                                <Input value="+880" disabled className="w-20" />
                                <Input
                                    placeholder="10 digit number"
                                    {...register("phone")}
                                />
                            </div>
                            {errors.phone && (
                                <p className="text-sm text-red-500">{errors.phone.message}</p>
                            )}
                        </div>

                        {/* Submit */}
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-800" >
                            Create Account
                        </Button>

                        <p className="text-center text-sm text-muted-foreground">
                            Already have an account?{" "}
                            <span className="text-blue-600 cursor-pointer hover:underline">
                                <Link href="/login">Sign in</Link>
                            </span>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
