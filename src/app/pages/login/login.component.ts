import {Component, OnInit, OnDestroy} from '@angular/core';
import {HttpService} from '../../service/httpService/http.service';
import {Md5} from 'ts-md5';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginData} from '../../interface/interface';
import {Router} from '@angular/router';
import {MessageAlertService} from '../../service/messageAlertService/message-alert.service';
import {FootControlService} from '../../service/footControlService/foot-control.service';
import {VerifyLoginService} from '../../service/verifyLoginService/verify-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  disablesLoginBtn: boolean;

  constructor(
    private service: HttpService,
    private router: Router,
    private msgAlert: MessageAlertService,
    private foot: FootControlService,
    private fb: FormBuilder,
    private verifyLogin: VerifyLoginService
  ) {
    this.disablesLoginBtn = false;
  }

  ngOnInit() {
    this.foot.showFooter.emit(false);
    this.loginForm = this.fb.group({
      account: ['', [Validators.required, Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.maxLength(30)]],
    });
  }

  ngOnDestroy() {
    this.foot.showFooter.emit(true);
  }

  OnSubmit({value, valid}) {

    if (valid) {
      const data: LoginData = {
        account: value.account,
        password: String(Md5.hashStr(value.password)),
      };

      this.msgAlert.waiting('登录中...');
      this.disablesLoginBtn = true;
      this.service.login(data).subscribe(result => {
        if (
          'status' in result && result.status &&
          'data' in result &&
          'token' in result.data &&
          'userName' in result.data &&
          'photo' in result.data
        ) {
          setTimeout(() => {
            this.msgAlert.hideWaiting();
            this.disablesLoginBtn = false;
          }, 500);
          window.sessionStorage.setItem('Authorization', result.data.token);
          window.sessionStorage.setItem('userPhoto', result.data.photo);
          window.sessionStorage.setItem('userName', result.data.userName);
          this.verifyLogin.isLogin.emit(true);
          this.router.navigateByUrl('/home');
        } else {
          if ('message' in result) {
            this.msgAlert.onceErr(result.message);
            this.disablesLoginBtn = false;
          }
        }
      });
    } else {
      this.msgAlert.onceErr('请填写账号和密码');
    }
  }

  testAccountError(): string {
    let result = '';
    if (this.loginForm.controls.account.hasError('required')) {
      result = '账号不能为空';
    } else if (!this.loginForm.controls.account.hasError('maxLength')) {
      result = '长度只能为20个字符';
    }
    return result;
  }

  testPasswordError(): string {
    let result = '';
    if (this.loginForm.controls.password.hasError('required')) {
      result = '密码不能为空';
    } else if (!this.loginForm.controls.password.hasError('maxLength')) {
      result = '长度只能为30个字符';
    }
    return result;
  }

}
