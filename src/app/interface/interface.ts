export interface UserData {
  userName: string;
  mail: string;
  photo: string;
  token?: string;
}

// 登录返回值格式
export interface LoginResponse {
  status: boolean;
  message: string;
  isLogin: boolean;
  data?: UserData;
}

// 登录传参数据格式
export interface LoginData {
  account: string;
  password: string;
}

// 单条文章数据格式
export interface Article {
  id: number;
  cover: string;
  author: string;
  createTime: string;
  photo?: string;
  title: string;
  description: string;
  like: number;
  read: number;
  comments: number;
  content?: string;
}

// 所有文章的数据格式
export interface AllArticle {
  status: boolean;
  message: string;
  data?: Array<Article>;
  isLogin: boolean;
}

// 单条文章的数据格式
export interface OneArticle {
  status: boolean;
  message: string;
  data?: Array<Article>;
  isLogin: boolean;
}
