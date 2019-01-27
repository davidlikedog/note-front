import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FootControlService} from '../../service/footControlService/foot-control.service';
import {VerifyLoginService} from '../../service/verifyLoginService/verify-login.service';
import {MessageAlertService} from '../../service/messageAlertService/message-alert.service';
import {UserData} from '../../interface/interface';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less']
})
export class LayoutComponent implements OnInit {
  showFooter: boolean;
  isLogin: boolean;
  userData: UserData;

  constructor(
    private route: Router,
    private foot: FootControlService,
    private verifyLogin: VerifyLoginService,
    private msgAlert: MessageAlertService
  ) {
    this.showFooter = true;
    this.isLogin = false;
    this.userData = new class implements UserData {
      mail: string;
      photo: string;
      token: string;
      userName: string;
    }();
  }

  ngOnInit() {
    this.foot.showFooter.subscribe(value => {
      this.showFooter = value;
    });
    this.verifyLogin.isLogin.subscribe(value => {
      this.isLogin = value;
      if (value) {
        this.userData.photo = window.sessionStorage.getItem('userPhoto');
        this.userData.userName = window.sessionStorage.getItem('userName');
      }
    });
  }

  offLine() {
    this.verifyLogin.isLogin.emit(false);
    window.sessionStorage.removeItem('Authorization');
    window.sessionStorage.removeItem('userPhoto');
    window.sessionStorage.removeItem('userName');
    this.msgAlert.onceOk('已注销登录');
  }

}
