
// 登录返回值格式
export interface LoginResponse {
  status: boolean;
  message: string;
  token?: string;
}

// 登录传参数据格式
export interface LoginData {
  account: string;
  password: string;
}

// 单条文章数据格式
interface Article {
  cover: string;
  author: string;
  createTime: string;
  photo: string;
  title: string;
  description: string;
  like: number;
  watch: number;
  comments: number;
}

// 所有文章的数据格式
export interface AllArticle {
  status: boolean;
  message: string;
  data: Array<Article>;
}
