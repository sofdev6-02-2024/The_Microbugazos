import { UserType, UserPermissions } from '@/types/user';

export const DEFAULT_UNAUTHORIZED_REDIRECT = '/login';
export const DEFAULT_FORBIDDEN_REDIRECT = '/';

export const ROUTE_PERMISSIONS: Record<UserType, UserPermissions> = {
    [UserType.GUEST]: {
        paths: ["/login", "/signup", "/", "/products/*", "/cart", "/create-store"],
        redirectTo: '/login'
    },
    [UserType.CLIENT]: {
        paths: ["/", "/products/*", "/profile", "/payment/*", "/orders", "/favorites", "/cart", "/history","/create-store", "/contact-us"],
        redirectTo: "/"
    },
    [UserType.SELLER]: {
        paths: ["/", "/products", "/profile", "/admin/products", "/admin/orders"],
        redirectTo: "/products"
    },
    [UserType.ADMIN]: {
        paths: ["/", "/products", "/profile", "/admin-panel/*"],
        redirectTo: "/admin-panel/dashboard"
    },
    [UserType.OWNER]: {
        paths: ['*'],
        redirectTo: "/admin-panel/dashboard"
    }
};