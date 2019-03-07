import {Injectable} from '@angular/core';
import {URL} from '../../global-data/global-data';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {
  LoginData,
  LoginResponse,
  AllArticle,
  OneArticle,
  VerifyAccount,
  EmailResponse,
  RegisterResponse,
  AddArticleResponse,
  DeleteArticle,
  GetModifyArticleResponse,
  SaveModifyArticleData,
  Like,
  OneArticleComments,
  AddComments,
  ReplyData,
  Comments,
  VerifyNickName,
  AddReply,
  NewInformation,
  OneDetailMsg,
  LeaveMessage,
  AddLeaveMessageInner,
  AddLeaveMessage,
  ModifyNameAndDescription,
  ModifyPersonalMsg, ModifyPhoto
} from '../../interface/interface';
import {catchError, tap} from 'rxjs/operators';
import {VerifyLoginService} from '../verifyLoginService/verify-login.service';
import {MessageAlertService} from '../messageAlertService/message-alert.service';

// notice:所有接口在这里只判断是否登录超时，其他错误到每个页面独立ts里面判断

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private readonly url: string;

  constructor(
    private http: HttpClient,
    private verifyLogin: VerifyLoginService,
    private msgAlert: MessageAlertService
  ) {
    this.url = URL;
  }

  private checkLogin(result: any) {
    if ('isLogin' in result) {
      if (result.isLogin) {
        this.verifyLogin.isLogin.emit(true);
      } else {
        this.verifyLogin.isLogin.emit(false);
        if ('message' in result) {
          this.msgAlert.onceErr(result.message);
        }
      }
    }
  }

  login(data: LoginData): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.url}/login`, data)
      .pipe(
        tap(result => {
          this.checkLogin(result);
        }),
        catchError(this.handleError<LoginResponse>('login'))
      );
  }

  getAllArticle(currentArticleId: number): Observable<AllArticle> {
    // 为了拿到我是否喜欢这篇文章的状态
    if (window.sessionStorage.getItem('Authorization')) {
      const token = window.sessionStorage.getItem('Authorization');

      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`,
        })
      };

      return this.http.get<AllArticle>(`${this.url}/getAllArticle/${currentArticleId}`, httpOptions)
        .pipe(
          tap(result => {
            this.checkLogin(result);
          }),
          catchError(this.handleError<AllArticle>('login', {} as AllArticle))
        );
    } else {
      return this.http.get<AllArticle>(`${this.url}/getAllArticle/${currentArticleId}`)
        .pipe(
          tap(result => {
            this.checkLogin(result);
          }),
          catchError(this.handleError<AllArticle>('login', {} as AllArticle))
        );
    }
  }

  getOneArticle(id: string): Observable<OneArticle> {
    if (window.sessionStorage.getItem('Authorization')) {  // 需要判断有没有登录，以此来确定自己是否已经喜欢这篇文章
      const token = window.sessionStorage.getItem('Authorization');

      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`,
        })
      };
      return this.http.get<OneArticle>(`${this.url}/getOneArticle/${id}`, httpOptions)
        .pipe(
          tap(result => {
            this.checkLogin(result);
          }),
          catchError(this.handleError<OneArticle>('login', {} as OneArticle))
        );
    }
    return this.http.get<OneArticle>(`${this.url}/getOneArticle/${id}`)
      .pipe(
        tap(result => {
          this.checkLogin(result);
        }),
        catchError(this.handleError<OneArticle>('login', {} as OneArticle))
      );
  }

  getOneArticleComments(id: string): Observable<OneArticleComments> {
    const token = window.sessionStorage.getItem('Authorization');

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
      })
    };
    return this.http.get<OneArticleComments>(`${this.url}/getOneArticleComments/${id}`, httpOptions)
      .pipe(
        tap(result => {
          this.checkLogin(result);
        }),
        catchError(this.handleError<OneArticleComments | null>('login', {} as OneArticleComments))
      );
  }

  verifyNickNameOnly(nickName: string): Observable<VerifyNickName> {
    const data = {
      nickName: nickName
    };
    return this.http.post<VerifyNickName>(`${this.url}/verifyNickName`, data)
      .pipe(
        catchError(this.handleError<VerifyNickName>('login', {} as VerifyNickName))
      );
  }

  verifyAccountOnly(account: number): Observable<VerifyAccount> {
    return this.http.get<VerifyAccount>(`${this.url}/verifyAccount/${account}`)
      .pipe(
        catchError(this.handleError<VerifyAccount>('login', {} as VerifyAccount))
      );
  }

  sendEmail(email): Observable<EmailResponse> {
    return this.http.get<EmailResponse>(`${this.url}/sendEmail/${email}`)
      .pipe(
        catchError(this.handleError<EmailResponse>('login', {} as EmailResponse))
      );
  }

  register(data: FormData): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.url}/register`, data)
      .pipe(
        catchError(this.handleError<RegisterResponse>('login', {} as RegisterResponse))
      );
  }

  addArticle(data: FormData): Observable<AddArticleResponse> {
    const token = window.sessionStorage.getItem('Authorization');

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
      })
    };

    return this.http.post<AddArticleResponse>(`${this.url}/addArticle`, data, httpOptions)
      .pipe(
        tap(result => {
          this.checkLogin(result);
        }),
        catchError(this.handleError<AddArticleResponse>('login', {} as AddArticleResponse))
      );
  }

  deleteArticle(id: number): Observable<DeleteArticle> {
    const token = window.sessionStorage.getItem('Authorization');

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
      })
    };

    return this.http.delete<DeleteArticle>(`${this.url}/deleteArticle/${id}`, httpOptions)
      .pipe(
        tap(result => {
          this.checkLogin(result);
        }),
        catchError(this.handleError<DeleteArticle>('login', {} as DeleteArticle))
      );
  }

  getModifyArticleData(id: number): Observable<GetModifyArticleResponse> {
    const token = window.sessionStorage.getItem('Authorization');

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
      })
    };
    return this.http.get<GetModifyArticleResponse>(`${this.url}/getModifyData/${id}`, httpOptions)
      .pipe(
        tap(result => {
          this.checkLogin(result);
        }),
        catchError(this.handleError<GetModifyArticleResponse>('login', {} as GetModifyArticleResponse))
      );
  }

  saveModifyArticleData(id: number, data: FormData): Observable<SaveModifyArticleData> {
    const token = window.sessionStorage.getItem('Authorization');

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
      })
    };
    return this.http.put<SaveModifyArticleData>(`${this.url}/saveModifyArticleData/${id}`, data, httpOptions)
      .pipe(
        tap(result => {
          this.checkLogin(result);
        }),
        catchError(this.handleError<SaveModifyArticleData>('login', {} as SaveModifyArticleData))
      );
  }

  like(id: number, doILike: boolean): Observable<Like> {
    const token = window.sessionStorage.getItem('Authorization');

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
      })
    };
    const data = {
      doILike: doILike
    };
    return this.http.put<Like>(`${this.url}/like/${id}`, data, httpOptions)
      .pipe(
        tap(result => {
          this.checkLogin(result);
        }),
        catchError(this.handleError<Like>('login', {} as Like))
      );
  }

  addComments(articleId: string, data: Comments): Observable<AddComments> {
    const token = window.sessionStorage.getItem('Authorization');

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
      })
    };
    return this.http.put<AddComments>(`${this.url}/addComments/${articleId}`, data, httpOptions)
      .pipe(
        tap(result => {
          this.checkLogin(result);
        }),
        catchError(this.handleError<AddComments>('login', {} as AddComments))
      );
  }

  addReply(data: ReplyData): Observable<AddReply> {
    const token = window.sessionStorage.getItem('Authorization');

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
      })
    };
    return this.http.post<AddReply>(`${this.url}/addReply`, data, httpOptions)
      .pipe(
        tap(result => {
          this.checkLogin(result);
        }),
        catchError(this.handleError<AddReply>('login', {} as AddReply))
      );
  }

  getMineArticle(name: string, currentArticleId: number): Observable<AllArticle> {
    if (window.sessionStorage.getItem('Authorization')) {
      const token = window.sessionStorage.getItem('Authorization');

      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`,
        })
      };

      return this.http.get<AllArticle>(`${this.url}/getMineArticle/${name}/${currentArticleId}`, httpOptions)
        .pipe(
          tap(result => {
            this.checkLogin(result);
          }),
          catchError(this.handleError<AllArticle>('login', {} as AllArticle))
        );
    }
    return this.http.get<AllArticle>(`${this.url}/getMineArticle/${name}/${currentArticleId}`)
      .pipe(
        tap(result => {
          this.checkLogin(result);
        }),
        catchError(this.handleError<AllArticle>('login', {} as AllArticle))
      );
  }

  getNewInformation(name: string): Observable<NewInformation> {
    if (window.sessionStorage.getItem('Authorization')) {
      const token = window.sessionStorage.getItem('Authorization');

      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`,
        })
      };

      return this.http.get<NewInformation>(`${this.url}/getNewInformation/${name}`, httpOptions)
        .pipe(
          tap(result => {
            this.checkLogin(result);
          }),
          catchError(this.handleError<NewInformation>('login', {} as NewInformation))
        );
    }

    return this.http.get<NewInformation>(`${this.url}/getNewInformation/${name}`)
      .pipe(
        tap(result => {
          this.checkLogin(result);
        }),
        catchError(this.handleError<NewInformation>('login', {} as NewInformation))
      );
  }

  getSomeoneDetailMsg(name: string): Observable<OneDetailMsg> {
    return this.http.get<OneDetailMsg>(`${this.url}/getOneDetailMsg/${name}`)
      .pipe(
        tap(result => {
          this.checkLogin(result);
        }),
        catchError(this.handleError<OneDetailMsg>('login', {} as OneDetailMsg))
      );
  }

  getLeaveMessage(name: string): Observable<LeaveMessage> {
    return this.http.get<LeaveMessage>(`${this.url}/getLeaveMessage/${name}`)
      .pipe(
        tap(result => {
          this.checkLogin(result);
        }),
        catchError(this.handleError<LeaveMessage>('login', {} as LeaveMessage))
      );
  }

  addLeaveMessage(data: AddLeaveMessageInner): Observable<AddLeaveMessage> {
    const token = window.sessionStorage.getItem('Authorization');

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
      })
    };
    return this.http.post<AddLeaveMessage>(`${this.url}/addLeaveMessage`, data, httpOptions)
      .pipe(
        tap(result => {
          this.checkLogin(result);
        }),
        catchError(this.handleError<AddLeaveMessage>('login', {} as AddLeaveMessage))
      );
  }

  saveMyDescription(data: ModifyNameAndDescription): Observable<ModifyPersonalMsg> {
    const token = window.sessionStorage.getItem('Authorization');

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
      })
    };
    return this.http.put<ModifyPersonalMsg>(`${this.url}/saveMyDescription`, data, httpOptions)
      .pipe(
        tap(result => {
          this.checkLogin(result);
        }),
        catchError(this.handleError<ModifyPersonalMsg>('login', {} as ModifyPersonalMsg))
      );
  }

  saveMyName(data: ModifyNameAndDescription): Observable<ModifyPersonalMsg> {
    const token = window.sessionStorage.getItem('Authorization');

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
      })
    };
    return this.http.put<ModifyPersonalMsg>(`${this.url}/saveMyName`, data, httpOptions)
      .pipe(
        tap(result => {
          this.checkLogin(result);
        }),
        catchError(this.handleError<ModifyPersonalMsg>('login', {} as ModifyPersonalMsg))
      );
  }

  saveMyPhoto(data: FormData): Observable<ModifyPhoto> {
    const token = window.sessionStorage.getItem('Authorization');

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
      })
    };
    return this.http.put<ModifyPhoto>(`${this.url}/saveMyPhoto`, data, httpOptions)
      .pipe(
        tap(result => {
          this.checkLogin(result);
        }),
        catchError(this.handleError<ModifyPhoto>('login', {} as ModifyPhoto))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation, error); // log to console instead
      return of(result as T);
    };
  }
}
