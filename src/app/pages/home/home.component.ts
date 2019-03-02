import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../service/httpService/http.service';
import {Article} from '../../interface/interface';
import {MessageAlertService} from '../../service/messageAlertService/message-alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  articleList: Array<Article>;

  constructor(
    private service: HttpService,
    private msgAlert: MessageAlertService
  ) {
    this.articleList = [];
  }

  ngOnInit() {
    this.service.getAllArticle().subscribe(data => {
      if ('status' in data && data.status) {
        if ('data' in data) {
          this.articleList = data.data;
        } else {
          this.msgAlert.onceErr('数据获取失败');
        }
      } else {
        if ('message' in data) {
          this.msgAlert.onceErr(data.message);
        }
      }
    });
  }

  optLike(id: number) {
    if (window.sessionStorage.getItem('Authorization')) {
      for (let i = 0; i < this.articleList.length; i++) {
        if (this.articleList[i].id === id) {
          this.articleList[i].doILike = !this.articleList[i].doILike;
          this.articleList[i].doILike ? this.articleList[i].like += 1 : this.articleList[i].like -= 1;
          this.service.like(id, this.articleList[i].doILike).subscribe(result => {
            if (result && 'status' in result && result.status === false) {
              if ('message' in result) {
                this.msgAlert.onceErr(result.message);
              }
            }
          });
        }
      }
    } else {
      this.msgAlert.onceErr('请登录');
    }
  }

}
