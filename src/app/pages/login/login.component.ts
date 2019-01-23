import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpService} from '../../service/httpService/http.service';
import {Md5} from 'ts-md5';
import {FormControl, Validators} from '@angular/forms';
import {LoginData} from '../../interface/interface';
import {Router} from '@angular/router';
import {MessageAlertService} from '../../service/messageAlertService/message-alert.service';
import {FootControlService} from '../../service/footControlService/foot-control.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit, OnDestroy {
  protected height: number;
  accountValue = new FormControl('', [Validators.required]);
  passwordValue = new FormControl('', [Validators.required]);
  disablesLoginBtn: boolean;

  constructor(
    private service: HttpService,
    private router: Router,
    private msgAlert: MessageAlertService,
    private foot: FootControlService,
  ) {
    this.height = 0;
    this.disablesLoginBtn = false;
  }

  ngOnInit() {
    this.height = window.innerHeight - 64;
    this.foot.showFooter.emit(false);
  }

  ngOnDestroy() {
    this.foot.showFooter.emit(true);
  }

  login() {

    if (!this.accountValue.hasError('required') && !this.passwordValue.hasError('required')) {
      const data: LoginData = {
        account: this.accountValue.value,
        password: String(Md5.hashStr(this.passwordValue.value)),
      };

      this.msgAlert.waiting('登录中...');
      this.disablesLoginBtn = true;
      this.service.login(data).subscribe(value => {
        if (value.status) {
          setTimeout(() => {
            this.msgAlert.hideWaiting();
            this.disablesLoginBtn = false;
          }, 500);
          window.sessionStorage.setItem('Authorization', value.token);
          this.router.navigateByUrl('/home');
        } else {
          if ('message' in value) {
            this.msgAlert.onceErr(value.message);
            this.disablesLoginBtn = false;
          }
        }
      });
    } else {
      this.msgAlert.onceErr('请填写账号和密码');
    }
  }

  testAccountError() {
    return this.accountValue.hasError('required') ? '账号不能为空' : '';
  }

  testPasswordError() {
    return this.passwordValue.hasError('required') ? '密码不能为空' : '';
  }

}
