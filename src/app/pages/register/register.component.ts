import {Component, OnInit, OnDestroy} from '@angular/core';
import {FootControlService} from '../../service/footControlService/foot-control.service';
import {HttpService} from '../../service/httpService/http.service';
import {Md5} from 'ts-md5';
import {FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MessageAlertService} from '../../service/messageAlertService/message-alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit, OnDestroy {
  nickName = new FormControl('', [Validators.required, Validators.maxLength(20)]);
  account = new FormControl('', [Validators.required, Validators.maxLength(15)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  verifyCode = new FormControl('', [Validators.required, Validators.maxLength(4)]);
  password = new FormControl('', [Validators.required, Validators.maxLength(20)]);
  repeatPassword = new FormControl('', [Validators.required, Validators.maxLength(20)]);

  constructor(
    private foot: FootControlService,
    private httpService: HttpService,
    private msgAlert: MessageAlertService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.foot.showFooter.emit(false);
  }

  ngOnDestroy() {
    this.foot.showFooter.emit(true);
  }

  nickNameError(): string {
    let result = '';
    if (this.nickName.hasError('required')) {
      result = '昵称不能为空';
    } else if (!this.nickName.hasError('maxLength')) {
      result = '最长只能为20个字符';
    }
    return result;
  }

  accountError(): string {
    let result = '';
    if (this.account.hasError('required')) {
      result = '账号不能为空';
    }
    return result;
  }

  emailError(): string {
    return this.email.hasError('required') ? '邮箱不能为空' :
      this.email.hasError('email') ? '邮箱格式错误' :
        '';
  }

  verifyCodeError(): string {
    let result = '';
    if (this.verifyCode.hasError('required')) {
      result = '校验码不能为空';
    }
    return result;
  }

  passwordError(): string {
    let result = '';
    if (this.password.hasError('required')) {
      result = '密码不能为空';
    }
    return result;
  }

  repeatPasswordError(): string {
    let result = '';
    if (this.repeatPassword.hasError('required')) {
      result = '密码不能为空';
    }
    return result;
  }

  submit() {
    console.log(this.nickName);
  }

}
