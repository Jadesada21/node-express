


export interface UserInput {
    username: string
    password: string
}

export interface UserResponse {
    id: number
    username: string
}

export interface LoginResponse {
    token: string
    user: {
        id: number
        username: string
    }
}