import { Injectable, EventEmitter } from '@angular/core';
import {UserData} from '../../interface/interface';

@Injectable({
  providedIn: 'root'
})
export class VerifyLoginService {
  isLogin: EventEmitter<boolean>;
  saveUserData: EventEmitter<UserData>;

  constructor() {
    this.isLogin = new EventEmitter();
    this.saveUserData = new EventEmitter<UserData>();
  }
}
