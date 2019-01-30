import {Component, OnInit, Input} from '@angular/core';
import {Article} from '../../../interface/interface';
import {VerifyLoginService} from '../../../service/verifyLoginService/verify-login.service';
import {HttpService} from '../../../service/httpService/http.service';
import {MessageAlertService} from '../../../service/messageAlertService/message-alert.service';

@Component({
  selector: 'app-one-article',
  templateUrl: './one-article.component.html',
  styleUrls: ['./one-article.component.less']
})
export class OneArticleComponent implements OnInit {
  isLogin: boolean;
  @Input('oneArticle') oneArticle: Article;
  judgeUser: boolean;

  constructor(
    private verifyLogin: VerifyLoginService,
    private httpService: HttpService,
    private msgAlert: MessageAlertService,
  ) {
  }

  ngOnInit() {
    this.judgeUser = this.oneArticle.author === window.sessionStorage.getItem('userName');
    this.isLogin = Boolean(window.sessionStorage.getItem('Authorization'));
    this.verifyLogin.isLogin.subscribe(value => {
      this.isLogin = value;
    });
  }

  delete(id) {
    if (window.confirm('您确定删除该条文章吗')) {
      this.httpService.deleteArticle(id).subscribe(result => {
        if ('status' in result && result.status) {
          window.location.reload();
          if ('message' in result) {
            this.msgAlert.onceOk(result.message);
          }
        } else {
          this.msgAlert.onceErr(result.message);
        }
      });
    }
  }

  modifyPage(id) {
    window.location.href = `#/pages/add/${id}`;
  }

}
