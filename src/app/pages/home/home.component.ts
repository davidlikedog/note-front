import {Component, OnInit, HostListener} from '@angular/core';
import {HttpService} from '../../service/httpService/http.service';
import {Article} from '../../interface/interface';
import {MessageAlertService} from '../../service/messageAlertService/message-alert.service';
import {lineTotal} from '../../global-data/global-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  articleList: Array<Article>;
  currentArticleId = 0;
  numOfAtBottom = 0;
  haveMore = true;
  isTheFirstScrolling = true;

  @HostListener('window:scroll')
  public windowScrolled() {
    if (this.haveMore && !this.isTheFirstScrolling) {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.body.clientHeight;
      if (scrollTop + clientHeight - scrollHeight >= -1 && scrollTop + clientHeight - scrollHeight <= 1) {
        this.numOfAtBottom += 1;
        this.currentArticleId = this.numOfAtBottom * lineTotal;
        this.service.getAllArticle(this.currentArticleId).subscribe(data => {
          if ('status' in data && data.status) {
            if ('data' in data) {
              this.articleList = this.articleList.concat(data.data);
            } else {
              this.msgAlert.onceErr('数据获取失败');
            }
          } else {
            this.haveMore = !this.haveMore;
            if ('message' in data) {
              // this.msgAlert.onceErr(data.message);
            }
          }
        });
      }
    }
    this.isTheFirstScrolling = false;
  }

  constructor(
    private service: HttpService,
    private msgAlert: MessageAlertService
  ) {
    this.articleList = [];
  }

  ngOnInit() {
    this.service.getAllArticle(this.currentArticleId).subscribe(data => {
      if ('status' in data && data.status) {
        if ('data' in data) {
          this.articleList = data.data;
          if (data.data.length < 10) {
            this.haveMore = false;
          }
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
