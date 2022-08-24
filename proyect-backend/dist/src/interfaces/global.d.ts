export interface User {
    _id: string;
    name: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    status: number;
    date_create: number;
    date_update: number;
    date_delete: null;
    roles: string[];
}
