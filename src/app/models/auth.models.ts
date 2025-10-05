export interface LoginRequest{
    email: string,
    password: string,
};

export interface LoginResponse{
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

export interface RegisterResponse{
    userId: string,
    username: string,
    roles: string[],
    errors?:string[] | null, 
}

export interface ForgotPasswordRequest{
    email: string
}

export interface ResetPasswordRequest{
    email: string,
    token: string,
    newPassword: string
}

export interface ValidateResetTokenRequest{
    email: string,
    token: string
}


