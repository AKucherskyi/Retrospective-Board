export interface Column {
    name: string
    posts: Array<Post>
    id: string
}

export interface Post {
    text: string
    likes?: number
}

export interface ColumnsObj {
    [key: string] : object
}

export interface User {
    email: string
    password: string
    name?: string
    returnSecureToken?: boolean
}

export interface FbAuthResponse {
    idToken: string
    expiresIn: string
}