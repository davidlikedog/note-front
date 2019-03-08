import {SafeHtml} from '@angular/platform-browser';

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
  doILike?: boolean;
  content?: string | SafeHtml;
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
  articleId: number;
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
  articleId: number;
}

// 单条文章的数据格式
export interface OneArticle {
  status: boolean;
  message: string;
  data?: {
    articleResult: Array<Article>;
    doILike: boolean;
  };
}

// 单条文章评论以及回复数据格式
export interface OneArticleComments {
  status: boolean;
  message: string;
  data: Array<OneComments> | null;
}

// 注册时检查昵称是否唯一
export interface VerifyNickName {
  status: boolean;
  message: string;
  data?: {
    isOnly: boolean;
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

// 获取修改文章信息后端返回接口
export interface GetModifyArticleResponse {
  status: boolean;
  message: string;
  data?: {
    title: string;
    description: string;
    cover: string;
    content: string;
    isPrivate: string;
  };
}

// 修改保存文章后端返回接口
export interface SaveModifyArticleData {
  status: boolean;
  message: string;
}

// 喜欢后端返回接口
export interface Like {
  status: boolean;
  message: string;
}

// 前端评论数据格式
export interface Comments {
  comments: string;
}

// 添加评论后端返回接口
export interface AddComments {
  status: boolean;
  message: string;
}

// 评论回复前端数据格式
export interface ReplyData {
  content: string;
  toUserName: string;
  commentsId: number;
  articleId: number;
}

// 评论回复后端返回数据格式
export interface AddReply {
  status: boolean;
  message: string;
}

// 单条与我相关数据
export interface SingleInformation {
  articleId: number;
  cover: string;
  author: number;
  time: string; // 指的是最新一条评论的时间
  type: string; // 指的是最新一条评论是评论还是回复
  createTime: string;
  userName: string;
  photo?: string;
  title: string;
  description: string;
  latestInformation: string;
  whoIsTalker: string;
  commentsId: number; // 最新一条评论的评论id
  comments: Array<OneComments> | null;
}

// 与我相关里需要的数据格式
export interface NewInformation {
  status: boolean;
  message: string;
  data?: {
    articleData: Array<SingleInformation>;
  };
}

// 个人详细信息
export interface OneDetailMsgInner {
  userName: string;
  photo: string;
  aboutMe: string;
  mail: string;
}

// 个人详细信息后端返回
export interface OneDetailMsg {
  status: boolean;
  message: string;
  data?: {
    detailMsg: OneDetailMsgInner;
  };
}

// 留言详情
export interface LeaveMessageInner {
  fromUserName: string;
  toUserName: string;
  photo: string;
  createTime: string;
  content: string;
  id: number;
}

// 留言后端返回数据
export interface LeaveMessage {
  status: boolean;
  message: string;
  data?: Array<LeaveMessageInner>;
}

// 添加留言详细
export interface AddLeaveMessageInner {
  content: string;
  toUserName: string;
}

// 添加留言后端返回
export interface AddLeaveMessage {
  status: boolean;
  message: string;
}

// 修改名字和个人简介通用前端数据格式
export interface ModifyNameAndDescription {
  content: string;
}

// 修改个人信息后端返回通用格式
export interface ModifyPersonalMsg {
  status: boolean;
  message: string;
  token?: string;
}

// 修改个人头像后端返回
export interface ModifyPhoto {
  status: boolean;
  message: string;
  userPhoto: string;
}

