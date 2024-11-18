import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ROUTE_PERMISSIONS, DEFAULT_UNAUTHORIZED_REDIRECT } from '@/config/routePermissions'
import { UserData } from '@/types/user'

const matchPath = (path: string, pattern: string): boolean => {
    if (pattern === '*') return true;
    if (pattern.endsWith('/*')) {
        const basePath = pattern.slice(0, -2);
        return path.startsWith(basePath);
    }
    return path === pattern;
};

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('auth-token');
    const currentPath = request.nextUrl.pathname;

    const publicRoutes = ['/login', '/signup', '/', '/products/*','/cart','/favorites', '/product-details/*'];

    if (publicRoutes.some(route => matchPath(currentPath, route))) {
        return NextResponse.next();
    }

    if (!token) {
        return NextResponse.redirect(new URL(DEFAULT_UNAUTHORIZED_REDIRECT, request.url));
    }

    try {
        const response = await fetch(`http://localhost:5001/api/users/Auth/token`, {
            headers: {
                'Authorization': `Bearer ${token.value}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const response = NextResponse.redirect(new URL(DEFAULT_UNAUTHORIZED_REDIRECT, request.url));
            response.cookies.delete('auth-token');
            return response;
        }

        const userData: UserData = await response.json();

        if (!(userData.userType in ROUTE_PERMISSIONS)) {
            throw new Error('Invalid user type');
        }

        const permissions = ROUTE_PERMISSIONS[userData.userType];
        const hasAccess = permissions.paths.some(path => matchPath(currentPath, path));

        if (!hasAccess) {
            return NextResponse.redirect(new URL(permissions.redirectTo, request.url));
        }

        return NextResponse.next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        return NextResponse.redirect(new URL(DEFAULT_UNAUTHORIZED_REDIRECT, request.url));
    }
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
    ],
}