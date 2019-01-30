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
  isLogin?: boolean;
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
}

// 单条评论的数据格式
export interface OneComments {
  id: number;
  content: string;
  createTime: string;
  userName: string;
  photo: string;
  likeNum: number;
  replyResult: Array<OneReply> | null;
}

// 单条回复的数据格式
export interface OneReply {
  content: string;
  createTime: string;
  fromUserName: string;
  fromUserPhoto: string;
  toUserName: string;
  toUserPhoto: string;
  likeNum: number;
}

// 单条文章的数据格式
export interface OneArticle {
  status: boolean;
  message: string;
  data?: {
    articleResult: Array<Article>;
    commentsResult: Array<OneComments> | null;
  };
}

// 注册时检查账号是否唯一
export interface VerifyAccount {
  status: boolean;
  message: string;
  data?: {
    isOnly: boolean;
  };
}

// 注册时邮件接口返回值
export interface EmailResponse {
  status: boolean;
  message: string;
  data?: {
    send: boolean;
  };
}

// 注册时前端发送的数据
export interface RegisterData {
  photo: any;
  account: string;
  nickName: string;
  email: string;
  verifyCode: string;
  password: string;
}

// 注册返回的数据
export interface RegisterResponse {
  status: boolean;
  message: string;
}

// 添加文章前端传输数据格式
export interface AddArticleData {
  title: string;
  cover: any;
  description: string;
  content: string;
  isPrivate: string;
}

// 添加文章后端返回的数据格式
export interface AddArticleResponse {
  status: boolean;
  message: string;
}

// 删除文章后端返回接口
export interface DeleteArticle {
  status: boolean;
  message: string;
}

