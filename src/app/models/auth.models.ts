export interface LoginRequest{
    email: string,
    password: string,
};

export interface LoginResponce{
    userId: string,
    username: string,
    roles: string[],
    errors?:string[] | null, 
}

export interface RegisterRequest{
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
};

export interface RegisterResponce{
    userId: string,
    username: string,
    roles: string[],
    errors?:string[] | null, 
}


