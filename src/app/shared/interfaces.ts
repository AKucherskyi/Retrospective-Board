export interface Column {
    name: string
    posts: Array<Post>
    id: string
}

export interface Post {
    text: string
}

export interface ColumnsObj {
    [key: string] : object
}