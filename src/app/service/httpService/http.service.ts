import {Injectable} from '@angular/core';
import {URL} from '../../global-data/global-data';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {LoginData, LoginResponse, AllArticle} from '../../interface/interface';
import {catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private url: string;

  constructor(
    private http: HttpClient
  ) {
    this.url = URL;
  }

  login(data: LoginData): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.url}/login`, data)
      .pipe(
        tap(result => {
          console.log(result);
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
          if (result.message === '登录超时') {
            console.log('登录超时');
          }
        }),
        catchError(this.handleError<AllArticle>('login', {} as AllArticle))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(operation, error); // log to console instead
      return of(result as T);
    };
  }
}
