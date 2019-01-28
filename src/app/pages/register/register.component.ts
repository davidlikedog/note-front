import {Component, OnInit, OnDestroy} from '@angular/core';
import {FootControlService} from '../../service/footControlService/foot-control.service';
import {HttpService} from '../../service/httpService/http.service';
import {Md5} from 'ts-md5';
import {FormBuilder, FormGroup, FormControl, Validators, ValidatorFn} from '@angular/forms';
import {Router} from '@angular/router';
import {MessageAlertService} from '../../service/messageAlertService/message-alert.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit, OnDestroy {
  register: FormGroup;
  accountIsOnly = true;
  coverImg = '';
  photoFile: File;

  constructor(
    private foot: FootControlService,
    private httpService: HttpService,
    private msgAlert: MessageAlertService,
    private router: Router,
    private fb: FormBuilder,
    private showUploadImg: DomSanitizer
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

  verifyAccount() {
    if (!this.register.controls.account.invalid) {
      const account = this.register.controls.account.value;
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
    console.log(this.photoFile);
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
        data.append('photo', value.photo);
      }
      data.append('account', value.account);
      data.append('email', value.email);
      data.append('verifyCode', value.verifyCode);
      data.append('password', value.password);
      data.append('nickName', value.nickName);
      this.httpService.register(data).subscribe(result => {
        console.log(result);
      });
    }
  }
}
