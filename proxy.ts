import { NextRequest, NextResponse } from "next/server";
import { userService } from "./src/services/user.service";
import { Roles } from "./src/constants/role";

export async function proxy(request: NextRequest) {

    const pathName = request.nextUrl.pathname;



    let isAuthenticated = false;
    let isAdmin = false;
    let isCustomer = false;
    let isSeller = false;

    const { data } = await userService.getSession();
    if (data) {
        isAuthenticated = true;
        if (data.user.role === Roles.admin) {
            isAdmin = true;
        } else if (data.user.role === Roles.customer) {
            isCustomer = true;
        } else if (data.user.role === Roles.seller) {
            isSeller = true;
        }
    }

    if (!isAuthenticated) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    if (isAdmin && (pathName.startsWith("/dashboard") || pathName.startsWith("/seller-dashboard"))) {
        return NextResponse.redirect(new URL("/admin-dashboard", request.url))
    }

    if (isSeller && (pathName.startsWith("/dashboard") || pathName.startsWith("/admin-dashboard"))) {
        return NextResponse.redirect(new URL("/seller-dashboard", request.url))
    }

    if (isCustomer && (pathName.startsWith("/seller-dashboard") || pathName.startsWith("/admin-dashboard"))) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    // Skip middleware for verify-email route
    if (pathName.startsWith("/verify-email")) {
        return NextResponse.next();
    }

    // Check for session token in cookies
    const sessionToken = request.cookies.get("better-auth.session_token");

    //* User is not authenticated at all
    if (!sessionToken) {
        return NextResponse.redirect(new URL("/login", request.url));
    }


    // Allow access if session exists
    return NextResponse.next();
};

export const config = {
    matcher: [
        "/cart",
        "/dashboard",
        "/dashboard/:path*",
        "/admin-dashboard",
        "/admin-dashboard/:path*",
        "/seller-dashboard",
        "/seller-dashboard/:path*",
    ],
}