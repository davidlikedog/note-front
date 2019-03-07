import {Injectable, EventEmitter} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VerifyLoginService {
  isLogin: EventEmitter<boolean>;
  reloadUser: EventEmitter<boolean>;

  constructor() {
    this.isLogin = new EventEmitter();
    this.reloadUser = new EventEmitter();
  }
}
