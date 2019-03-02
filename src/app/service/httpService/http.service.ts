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
  AddArticleResponse, DeleteArticle, GetModifyArticleResponse, SaveModifyArticleData, Like
} from '../../interface/interface';
import {catchError, tap} from 'rxjs/operators';
import {VerifyLoginService} from '../verifyLoginService/verify-login.service';
import {MessageAlertService} from '../messageAlertService/message-alert.service';

// notice:所有接口在这里只判断是否登录超时，其他错误到每个页面独立ts里面判断

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private url: string;

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

  getAllArticle(): Observable<AllArticle> {
    // 为了拿到我是否喜欢这篇文章的状态
    if (window.sessionStorage.getItem('Authorization')) {
      const token = window.sessionStorage.getItem('Authorization');

      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`,
        })
      };

      return this.http.get<AllArticle>(`${this.url}/getAllArticle`, httpOptions)
        .pipe(
          tap(result => {
            this.checkLogin(result);
          }),
          catchError(this.handleError<AllArticle>('login', {} as AllArticle))
        );
    } else {
      return this.http.get<AllArticle>(`${this.url}/getAllArticle`)
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
    } else {
      return this.http.get<OneArticle>(`${this.url}/getOneArticle/${id}`)
        .pipe(
          tap(result => {
            this.checkLogin(result);
          }),
          catchError(this.handleError<OneArticle>('login', {} as OneArticle))
        );
    }
  }

  verifyAccountOnly(account): Observable<VerifyAccount> {
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

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation, error); // log to console instead
      return of(result as T);
    };
  }
}
