export interface Column {
    name: string
    elements: Array<Post>
    id: string
}

export interface Post {
    text: string
}

export interface ColumnsObj {
    [key: string] : object
}