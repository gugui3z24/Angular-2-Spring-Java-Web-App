
export interface ApplicationUser {
    first: string;
    fullName: string;
    id: number;
    last: string;
    password: string;
    role: Role;
    username: string;
}

export interface Article {
    body: string;
    category: Category;
    createdAt: Date;
    creator: ApplicationUser;
    id: number;
    lastModifier: ApplicationUser;
    subject: string;
    updatedAt: Date;
}

export interface Category {
    id: number;
    name: string;
}

export interface Role {
    id: number;
    name: string;
}
