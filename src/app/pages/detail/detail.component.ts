import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpService} from '../../service/httpService/http.service';
import {Article, OneComments, OneReply} from '../../interface/interface';
import {MessageAlertService} from '../../service/messageAlertService/message-alert.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.less']
})
export class DetailComponent implements OnInit {
  articleDetail: Article;
  commentsList: Array<OneComments>;
  doILike = false;

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
    private msgAlert: MessageAlertService
  ) {
    this.articleDetail = new class implements Article {
      author: string;
      comments: number;
      content: string;
      cover: string;
      createTime: string;
      description: string;
      id: number;
      like: number;
      read: number;
      title: string;
    }();
    this.commentsList = [];
  }

  ngOnInit() {
    const id: string = this.route.snapshot.paramMap.get('id');
    this.httpService.getOneArticle(id).subscribe(value => {
      if ('status' in value && value.status && 'data' in value && value.data && 'doILike' in value.data) {
        if ('articleResult' in value.data && value.data.articleResult && value.data.articleResult.length > 0) {
          this.articleDetail = value.data.articleResult[0];
          this.doILike = value.data.doILike;
        }
        if ('commentsResult' in value.data) {
          this.commentsList = value.data.commentsResult;
        }
      } else {
        if ('message' in value) {
          this.msgAlert.onceErr(value.message);
        }
      }
    });
  }

  like(articleId) {
    this.doILike = !this.doILike;
    this.doILike ? this.articleDetail.like += 1 : this.articleDetail.like -= 1;
    this.httpService.like(articleId, this.doILike).subscribe(result => {
      console.log(result);
    });
  }

}
