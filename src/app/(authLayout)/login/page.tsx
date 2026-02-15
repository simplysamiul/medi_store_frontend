"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";


const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });
    const router = useRouter();

    const onSubmit = async (data: LoginFormValues) => {
            const res = await authClient.signIn.email(data)
            console.log(res)
            if(res.data?.token){
                router.push("/")
                toast.success("Login Successfull..!")
            }else{
                toast.error("Login failed..!")
            }
    };

    return (
        <div className="flex my-20 items-center justify-center bg-slate-50 px-4">
            <Card className="w-full max-w-md shadow-sm">
                <CardContent className="p-6 space-y-6">
                    {/* Header */}
                    <div className="flex flex-col items-center text-center space-y-2">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                            <Lock className="h-6 w-6 text-blue-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            Welcome Back
                        </h1>
                        <p className="text-sm text-slate-500">
                            Access your prescriptions and health essentials.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Email */}
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-slate-700">
                                Email Address
                            </label>
                            <Input
                                placeholder="e.g. name@example.com"
                                {...register("email")}
                            />
                            {errors.email && (
                                <p className="text-xs text-red-500">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="space-y-1">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-slate-700">
                                    Password
                                </label>
                            </div>

                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    {...register("password")}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>
                            </div>

                            {errors.password && (
                                <p className="text-xs text-red-500">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Submit */}
                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-800"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Signing in..." : "Sign In"}
                        </Button>
                    </form>

                    {/* Divider */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Separator className="flex-1" />
                            <span className="text-xs text-slate-400">
                                OR CONTINUE WITH
                            </span>
                            <Separator className="flex-1" />
                        </div>
                    </div>

                    {/* Footer */}
                    <p className="text-center text-sm text-slate-500">
                        New to MediStore?{" "}
                        <Link
                            href="/register"
                            className="text-blue-600 hover:underline"
                        >
                            Create an account
                        </Link>
                    </p>
                </CardContent>

                {/* home page link */}
                <div className="flex justify-center">
                    <Link
                        href="/"
                        className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
                    >
                        <ArrowLeft size={16} />
                        Go to Home
                    </Link>
                </div>
            </Card>
        </div>
    );
}
