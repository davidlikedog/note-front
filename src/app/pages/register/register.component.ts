import {Component, OnInit, OnDestroy} from '@angular/core';
import {FootControlService} from '../../service/footControlService/foot-control.service';
import {HttpService} from '../../service/httpService/http.service';
import {Md5} from 'ts-md5';
import {FormBuilder, FormGroup, Validators, ValidatorFn} from '@angular/forms';
import {Router} from '@angular/router';
import {MessageAlertService} from '../../service/messageAlertService/message-alert.service';
import {DomSanitizer} from '@angular/platform-browser';
import {LoginData} from '../../interface/interface';
import {VerifyLoginService} from '../../service/verifyLoginService/verify-login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit, OnDestroy {
  register: FormGroup;
  nickNameIsOnly = true;
  accountIsOnly = true;
  coverImg = '';
  photoFile: File;
  ifSend = false;
  seconds = 60;

  constructor(
    private foot: FootControlService,
    private httpService: HttpService,
    private msgAlert: MessageAlertService,
    private router: Router,
    private fb: FormBuilder,
    public showUploadImg: DomSanitizer,
    private verifyLogin: VerifyLoginService
  ) {
  }

  ngOnInit() {
    this.foot.showFooter.emit(false);
    this.register = this.fb.group(
      {
        photo: [''],
        nickName: ['', [Validators.required, Validators.maxLength(20)]],
        account: ['', [Validators.required, Validators.maxLength(15)]],
        email: ['', [Validators.required, Validators.email]],
        verifyCode: [{value: ''}, [Validators.required]],
        password: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('[a-zA-Z0-9,.]*')]],
        repeatPassword: ['', [Validators.required]],
      },
      {validators: this.checkRepeatPassword('password', 'repeatPassword')}
    );
  }

  ngOnDestroy() {
    this.foot.showFooter.emit(true);
  }

  verifyNickName() {
    if (!this.register.controls.nickName.invalid) {
      const nickName = this.register.controls.nickName.value.trim();
      this.httpService.verifyNickNameOnly(nickName).subscribe(value => {
        if ('status' in value && value.status) {
          if ('data' in value && 'isOnly' in value.data) {
            this.nickNameIsOnly = value.data.isOnly;
          } else {
            this.msgAlert.onceErr('返回数据格式错误');
          }
        } else {
          if ('message' in value) {
            this.msgAlert.onceErr(value.message);
          }
        }
      });
    }
  }

  verifyAccount() {
    if (!this.register.controls.account.invalid) {
      const account = Number(this.register.controls.account.value);
      this.httpService.verifyAccountOnly(account).subscribe(value => {
        if ('status' in value && value.status) {
          if ('data' in value && 'isOnly' in value.data) {
            this.accountIsOnly = value.data.isOnly;
          } else {
            this.msgAlert.onceErr('返回数据格式错误');
          }
        } else {
          if ('message' in value) {
            this.msgAlert.onceErr(value.message);
          }
        }
      });
    }
  }

  fileChange(e) {
    if (e.target.files.length > 0) {
      this.photoFile = e.target.files[0];
    }
    const file = e.srcElement.files[0];
    this.coverImg = window.URL.createObjectURL(file);
  }

  sendEmail(event) {
    event.stopPropagation();
    event.preventDefault();
    if (!this.register.controls.email.invalid) {
      const email = this.register.controls.email.value;
      this.httpService.sendEmail(email).subscribe(value => {
        if ('status' in value && value.status) {
          if ('data' in value && 'send' in value.data && value.data.send) {

            // 发邮件成功发送后等待60s
            this.ifSend = true;
            this.seconds = 60;
            const clock = setInterval(() => {
              if (this.seconds > 0) {
                this.seconds--;
              } else {
                clearInterval(clock);
                this.ifSend = false;
              }
            }, 1000);

            if ('message' in value) {
              this.msgAlert.onceOk(value.message);
            }
          }
        } else {
          this.msgAlert.onceErr(value.message);
        }
      });
    }
  }

  checkRepeatPassword(password: string, repeatPassword: string): ValidatorFn {
    return (group: FormGroup): { [key: string]: any } => {
      const passwordVal = group.controls[password];
      const confirmPasswordVal = group.controls[repeatPassword];
      if (passwordVal.value !== confirmPasswordVal.value) {
        return {validateEqual: true};
      }
      return null;
    };
  }

  nickNameError(): string {
    let result = '';
    if (this.register.controls.nickName.hasError('required')) {
      result = '昵称不能为空';
    } else if (!this.register.controls.nickName.hasError('maxLength')) {
      result = '最长只能为20个字符';
    }
    return result;
  }

  accountError(): string {
    let result = '';
    if (this.register.controls.account.hasError('required')) {
      result = '账号不能为空';
    } else if (!this.register.controls.account.hasError('maxLength')) {
      result = '最长只能为15个字符';
    }
    return result;
  }

  emailError(): string {
    return this.register.controls.email.hasError('required') ? '邮箱不能为空' :
      this.register.controls.email.hasError('email') ? '邮箱格式错误' :
        '';
  }

  verifyCodeError(): string {
    let result = '';
    if (this.register.controls.verifyCode.hasError('required')) {
      result = '校验码不能为空';
    } else if (!this.register.controls.verifyCode.hasError('maxLength')) {
      result = '校验码只能是四位数字';
    }
    return result;
  }

  passwordError(): string {
    let result = '';
    if (this.register.controls.password.hasError('required')) {
      result = '密码不能为空';
    } else if (this.register.controls.password.hasError('pattern')) {
      result = `密码只能为数字，字母的组合`;
    } else if (!this.register.controls.password.hasError('maxLength')) {
      result = '密码最长只能为20个字符';
    }
    return result;
  }

  verifyPasswordError(): string {
    let result = '';
    if (this.register.controls.repeatPassword.hasError('required')) {
      result = '密码不能为空';
    } else if (this.register.hasError('validateEqual')) {
      result = '重复密码错误';
    }
    return result;
  }

  onSubmit({value, valid}) {
    if (valid) {
      const data: FormData = new FormData();
      if (this.photoFile) {
        data.append('photo', this.photoFile, this.photoFile.name);
      } else {
        data.append('photo', value.photo.trim());
      }
      data.append('account', value.account.trim());
      data.append('email', value.email.trim());
      data.append('verifyCode', value.verifyCode);
      data.append('password', String(Md5.hashStr(value.password.trim())));
      data.append('nickName', value.nickName.trim());
      this.httpService.register(data).subscribe(result => {
        if ('status' in result && result.status) {
          if ('message' in result) {
            this.msgAlert.onceOk(result.message);
            const loginData: LoginData = {
              account: value.account,
              password: String(Md5.hashStr(value.password))
            };
            this.httpService.login(loginData).subscribe(loginResult => {
              if ('status' in loginResult && loginResult.status) {
                if ('data' in loginResult && 'photo' in loginResult.data && 'userName' in loginResult.data) {
                  window.sessionStorage.setItem('Authorization', loginResult.data.token);
                  window.sessionStorage.setItem('userPhoto', loginResult.data.photo);
                  window.sessionStorage.setItem('userName', loginResult.data.userName);
                  this.verifyLogin.reloadUser.emit(true);
                  this.router.navigateByUrl('/home');
                }
              } else {
                if ('message' in loginResult) {
                  this.msgAlert.onceErr(loginResult.message);
                }
              }
            });
          }
        } else {
          if ('message' in result) {
            this.msgAlert.onceErr(result.message);
          }
        }
      });
    }
  }
}
