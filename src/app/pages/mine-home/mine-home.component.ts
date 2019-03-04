import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../service/httpService/http.service';
import {Article, SingleInformation} from '../../interface/interface';
import {MessageAlertService} from '../../service/messageAlertService/message-alert.service';

@Component({
  selector: 'app-mine-home',
  templateUrl: './mine-home.component.html',
  styleUrls: ['./mine-home.component.less']
})
export class MineHomeComponent implements OnInit {
  articleList: Array<Article>;
  myInformation: Array<SingleInformation>;

  constructor(
    private httpService: HttpService,
    private msgAlert: MessageAlertService
  ) {
    this.articleList = [];
    this.myInformation = [];
  }

  ngOnInit() {
    if (window.sessionStorage.getItem('Authorization')) {
      this.httpService.getMineArticle().subscribe(data => {
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
      this.httpService.getNewInformation().subscribe(data => {
        if ('status' in data && data.status) {
          if ('data' in data) {
            this.myInformation = data.data.articleData;
          } else {
            this.msgAlert.onceErr('数据获取失败');
          }
        } else {
          if ('message' in data) {
            this.msgAlert.onceErr(data.message);
          }
        }
      });
    } else {
      this.msgAlert.onceErr('请登录后再使用');
    }
  }

}
