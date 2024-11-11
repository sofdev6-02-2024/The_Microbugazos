import {UserType} from "@/types/user";

export interface RoutePermission {
    path: string;
    pattern?: RegExp;
    allowedRoles: UserType[];
    requiresAuth: boolean;
    redirectTo: string;
}

export const routePermissions: RoutePermission[] = [
    {
        path: 'admin',
        pattern: /^\/admin(?:\/.*)?$/,
        allowedRoles: [UserType.ADMIN, UserType.OWNER],
        requiresAuth: true,
        redirectTo: '/login?redirect=/admin'
    },
    {
        path: 'payment',
        pattern: /^\/payment(?:\/.*)?$/,
        allowedRoles: [UserType.CLIENT, UserType.SELLER, UserType.ADMIN, UserType.OWNER],
        requiresAuth: true,
        redirectTo: '/login?redirect=/payment'
    },
    {
        path: 'seller',
        pattern: /^\/seller(?:\/.*)?$/,
        allowedRoles: [UserType.SELLER, UserType.ADMIN, UserType.OWNER],
        requiresAuth: true,
        redirectTo: '/unauthorized'
    }
]