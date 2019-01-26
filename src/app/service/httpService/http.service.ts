import {Injectable} from '@angular/core';
import {URL} from '../../global-data/global-data';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {LoginData, LoginResponse, AllArticle, OneArticle} from '../../interface/interface';
import {catchError, tap} from 'rxjs/operators';
import {VerifyLoginService} from '../verifyLoginService/verify-login.service';
import {MessageAlertService} from '../messageAlertService/message-alert.service';

// notice:所有接口在这里只判断是否登录，其他错误到每个页面独立ts里面判断

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
  }

  getOneArticle(id: string): Observable<OneArticle> {
    return this.http.get<OneArticle>(`${this.url}/getOneArticle/${id}`)
      .pipe(
        tap(result => {
          this.checkLogin(result);
        }),
        catchError(this.handleError<OneArticle>('login', {} as OneArticle))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation, error); // log to console instead
      return of(result as T);
    };
  }
}
