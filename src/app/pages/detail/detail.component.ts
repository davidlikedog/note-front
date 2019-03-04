import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpService} from '../../service/httpService/http.service';
import {Article, Comments, OneComments, OneReply} from '../../interface/interface';
import {MessageAlertService} from '../../service/messageAlertService/message-alert.service';
import {RefreshCommentsService} from '../../service/refreshCommentsService/refresh-comments.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.less']
})
export class DetailComponent implements OnInit {
  articleDetail: Article;
  commentsList: Array<OneComments>;
  doILike = false;
  addCommentsContent = '';

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService,
    private msgAlert: MessageAlertService,
    private reFreshComments: RefreshCommentsService,
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
      doILike: boolean;
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
      } else {
        if ('message' in value) {
          this.msgAlert.onceErr(value.message);
        }
      }
    });
    this.getOneArticleComments(id);
    this.reFreshComments.reFreshComments.subscribe(value => {
      if (value) {
        this.getOneArticleComments(id);
      }
    });
  }

  getOneArticleComments(commentsId: string) {
    this.httpService.getOneArticleComments(commentsId).subscribe(value => {
      if ('status' in value && value.status) {
        if ('data' in value && value.data && value.data.length > 0) {
          this.commentsList = value.data;
        }
      } else {
        if ('message' in value) {
          this.msgAlert.onceErr(value.message);
        }
      }
    });
  }

  like(articleId) {
    if (window.sessionStorage.getItem('Authorization')) {
      this.doILike = !this.doILike;
      this.doILike ? this.articleDetail.like += 1 : this.articleDetail.like -= 1;
      this.httpService.like(articleId, this.doILike).subscribe(result => {
        if (result && 'status' in result && result.status === false) {
          if ('message' in result) {
            this.msgAlert.onceErr(result.message);
          }
        }
      });
    } else {
      this.msgAlert.onceErr('请登录');
    }
  }

  addComments() {
    const articleId: string = this.route.snapshot.paramMap.get('id');
    if (!this.addCommentsContent) {
      this.msgAlert.onceErr('请输入内容');
    } else {
      const data: Comments = {
        comments: this.addCommentsContent
      };
      this.httpService.addComments(articleId, data).subscribe(value => {
        if ('status' in value && value.status) {
          this.getOneArticleComments(articleId);
          this.addCommentsContent = '';
        } else {
          if ('message' in value) {
            this.msgAlert.onceErr(value.message);
          }
        }
      });
    }
  }

}
