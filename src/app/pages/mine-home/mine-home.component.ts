import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../service/httpService/http.service';
import {AddLeaveMessageInner, Article, LeaveMessageInner, OneDetailMsgInner, SingleInformation} from '../../interface/interface';
import {MessageAlertService} from '../../service/messageAlertService/message-alert.service';
import {ReplyComponent} from '../commonComponent/comments/comments.component';
import {MatBottomSheet} from '@angular/material';
import {RefreshCommentsService} from '../../service/refreshCommentsService/refresh-comments.service';
import {ActivatedRoute} from '@angular/router';
import {lineTotal} from '../../global-data/global-data';

@Component({
  selector: 'app-mine-home',
  templateUrl: './mine-home.component.html',
  styleUrls: ['./mine-home.component.less']
})
export class MineHomeComponent implements OnInit {
  articleList: Array<Article>;
  myInformation: Array<SingleInformation>;
  oneDetailMsg: OneDetailMsgInner;
  leaveMessage: Array<LeaveMessageInner>;
  addLeaveMsgContent = '';
  currentArticleId = 0;
  numOfAtBottom = 0;
  haveMore = true;
  isTheFirstScrolling = true;

  constructor(
    private httpService: HttpService,
    private msgAlert: MessageAlertService,
    private reply: MatBottomSheet,
    private reFreshComments: RefreshCommentsService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.articleList = [];
    this.myInformation = [];
    this.leaveMessage = [];
    this.oneDetailMsg = new class implements OneDetailMsgInner {
      aboutMe: string;
      mail: string;
      photo: string;
      userName: string;
    };
  }

  ngOnInit() {
    const name: string = this.activatedRoute.snapshot.paramMap.get('name');
    if (!name) {
      this.msgAlert.onceErr('参数错误');
      return;
    }
    this.httpService.getSomeoneDetailMsg(name).subscribe(data => {
      if ('status' in data && data.status) {
        if ('data' in data) {
          this.oneDetailMsg = data.data.detailMsg;
        } else {
          this.msgAlert.onceErr('数据获取失败');
        }
      } else {
        if ('message' in data) {
          this.msgAlert.onceErr(data.message);
        }
      }
    });
    this.httpService.getMineArticle(name, this.currentArticleId).subscribe(data => {
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
    this.getSthAboutMe(name);
    this.getLeaveMessage(name);
    this.reFreshComments.reFreshComments.subscribe(value => {
      if (value) {
        this.getSthAboutMe(name);
      }
    });
    window.onscroll = () => {
      if (this.haveMore && !this.isTheFirstScrolling) {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.body.clientHeight;
        if (scrollTop + clientHeight === scrollHeight) {
          this.numOfAtBottom += 1;
          this.currentArticleId = this.numOfAtBottom * lineTotal;
          this.httpService.getMineArticle(name, this.currentArticleId).subscribe(data => {
            if ('status' in data && data.status) {
              if ('data' in data) {
                this.articleList = this.articleList.concat(data.data);
              } else {
                this.msgAlert.onceErr('数据获取失败');
              }
            } else {
              this.haveMore = !this.haveMore;
              if ('message' in data) {
                this.msgAlert.onceErr(data.message);
              }
            }
          });
        }
      }
      this.isTheFirstScrolling = false;
    };
  }

  getLeaveMessage(name): void {
    this.httpService.getLeaveMessage(name).subscribe(data => {
      if ('status' in data && data.status) {
        if ('data' in data) {
          this.leaveMessage = data.data;
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

  getSthAboutMe(name): void {
    this.httpService.getNewInformation(name).subscribe(data => {
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
  }

  openReply(sayer, commentsId: number, articleId: number): void {
    if (window.sessionStorage.getItem('Authorization')) {
      let replyWho: string = sayer.innerHTML;
      replyWho = replyWho.slice(0, replyWho.length - 1);
      this.reply.open(ReplyComponent, {
        data: {
          replyWho: replyWho,
          commentsId: commentsId,
          articleId: articleId
        }
      });
    } else {
      this.msgAlert.onceErr('请登录');
    }
  }

  goToAuthorPage(event: MouseEvent, authorName: string) {
    event.stopPropagation();
    event.preventDefault();
    window.location.href = `#/pages/mine/${authorName}`;
    window.location.reload();
  }

  addLeaveMsg(toUserName: string) {
    if (window.sessionStorage.getItem('Authorization')) {
      if (this.addLeaveMsgContent && this.addLeaveMsgContent !== '') {
        // todo
        const data: AddLeaveMessageInner = {
          content: this.addLeaveMsgContent,
          toUserName: toUserName
        };
        this.httpService.addLeaveMessage(data).subscribe(result => {
          if ('status' in result && result.status) {
            this.addLeaveMsgContent = '';
            this.getLeaveMessage(toUserName);
          } else {
            if ('message' in result) {
              this.msgAlert.onceErr(result.message);
            }
          }
        });
      } else {
        this.msgAlert.onceErr('不能为空');
      }
    } else {
      this.msgAlert.onceErr('没登录');
    }
  }

}

