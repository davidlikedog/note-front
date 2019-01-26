import {Component, OnInit, Input} from '@angular/core';
import {Article} from '../../../interface/interface';
import {VerifyLoginService} from '../../../service/verifyLoginService/verify-login.service';

@Component({
  selector: 'app-one-article',
  templateUrl: './one-article.component.html',
  styleUrls: ['./one-article.component.less']
})
export class OneArticleComponent implements OnInit {
  isLogin: boolean;
  @Input('oneArticle') oneArticle: Article;

  constructor(
    private verifyLogin: VerifyLoginService
  ) {
    this.isLogin = false;
  }

  ngOnInit() {
    this.verifyLogin.isLogin.subscribe(value => {
      this.isLogin = value;
    });
  }

}
