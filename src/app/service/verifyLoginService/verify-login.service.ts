import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VerifyLoginService {
  isLogin: EventEmitter<boolean>;

  constructor() {
    this.isLogin = new EventEmitter();
  }
}
