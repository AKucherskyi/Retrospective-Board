export interface Column {
  name: string;
  posts: Array<Post>;
  id: string;
}

export interface Post {
  text: string;
  likes?: number;
  comments?: Comment[];
  likedBy?: string;
}

export interface Comment {
  text: string;
  author?: string;
  date: Date;
}

export interface ColumnsObj {
  [key: string]: object;
}

export interface User {
  email: string;
  password: string;
  name?: string;
  returnSecureToken?: boolean;
  username?: string;
}

export interface FbAuthResponse {
  idToken: string;
  expiresIn: string;
  displayName?: string;
}
