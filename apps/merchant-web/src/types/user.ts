export enum UserType {
    GUEST = 0,
    OWNER = 1,
    SELLER = 2,
    ADMIN = 3,
    CLIENT = 4
}

export interface UserPermissions {
    paths: string[];
    redirectTo: string;
}

export interface UserData {
    id: string;
    email: string;
    name: string;
    userType: UserType;
}
