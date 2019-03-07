import {Component, OnInit, HostListener} from '@angular/core';
import {HttpService} from '../../service/httpService/http.service';
import {
  AddLeaveMessageInner,
  Article,
  LeaveMessageInner,
  ModifyNameAndDescription,
  OneDetailMsgInner,
  SingleInformation
} from '../../interface/interface';
import {MessageAlertService} from '../../service/messageAlertService/message-alert.service';
import {ReplyComponent} from '../commonComponent/comments/comments.component';
import {MatBottomSheet} from '@angular/material';
import {RefreshCommentsService} from '../../service/refreshCommentsService/refresh-comments.service';
import {ActivatedRoute, Router} from '@angular/router';
import {lineTotal} from '../../global-data/global-data';
import {VerifyLoginService} from '../../service/verifyLoginService/verify-login.service';

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
  isTheFirstScrolling = 0;
  name = '';
  modifyMyMsg = {
    showChoosePhotoInput: false,
    showModifyUserNameInput: false,
    showModifyDescriptionInput: false,
  };

  @HostListener('window:scroll')  // 当其他页面有滚动高度时，进入该页面会触发scroll函数。而且最开始默认为直接滚动到了底部。做了滚动次数大于3次...
  public windowScrolled() {
    if (this.haveMore && this.isTheFirstScrolling > 3) {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.body.clientHeight;
      if (scrollTop + clientHeight - scrollHeight >= -1 && scrollTop + clientHeight - scrollHeight <= 1) {
        this.numOfAtBottom += 1;
        this.currentArticleId = this.numOfAtBottom * lineTotal;
        this.httpService.getMineArticle(this.name, this.currentArticleId).subscribe(data => {
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
    this.isTheFirstScrolling += 1;
  }

  constructor(
    private httpService: HttpService,
    private msgAlert: MessageAlertService,
    private reply: MatBottomSheet,
    private reFreshComments: RefreshCommentsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private reloadUser: VerifyLoginService
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
    this.name = name;
    this.httpService.getSomeoneDetailMsg(name).subscribe(data => {
      if ('status' in data && data.status) {
        if ('data' in data) {
          this.oneDetailMsg = data.data.detailMsg;
        } else {
          this.msgAlert.onceErr('数据获取失败');
        }
      } else {
        if ('message' in data) {
          // this.msgAlert.onceErr(data.message);
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
        this.haveMore = false;
        if ('message' in data) {
          // this.msgAlert.onceErr(data.message);
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
          // this.msgAlert.onceErr(data.message);
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
          // this.msgAlert.onceErr(data.message);
        }
      }
    });
  }

  openReply(sayer, commentsId: number, articleId: number): void {
    if (window.sessionStorage.getItem('Authorization')) {
      const replyWho: string = sayer.innerHTML.trim();
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

  saveMyPhoto(event) {
    if (event.target.files[0]) {
      const data: FormData = new FormData();
      data.append('photo', event.target.files[0], event.target.files[0].name);
      this.httpService.saveMyPhoto(data).subscribe(result => {
        if ('status' in result && result.status) {
          if ('userPhoto' in result) {
            window.sessionStorage.setItem('userPhoto', result.userPhoto);
            this.reloadUser.reloadUser.emit(true);
          }
        } else {
          if ('message' in result) {
            this.msgAlert.onceErr(result.message);
          }
        }
      });
    }
  }

  openMyUserNameInput() {
    if (window.sessionStorage.getItem('userName') === this.oneDetailMsg.userName) {
      this.modifyMyMsg.showModifyUserNameInput = true;
    }
  }

  saveMyName() {
    this.modifyMyMsg.showModifyUserNameInput = false;
    if (!window.sessionStorage.getItem('Authorization')) {
      this.msgAlert.onceErr('您还未登录');
      return;
    }
    if (this.oneDetailMsg.userName === '') {
      this.msgAlert.onceErr('不能为空');
      return;
    }
    const data: ModifyNameAndDescription = {
      content: this.oneDetailMsg.userName
    };
    this.httpService.saveMyName(data).subscribe(result => {
      if ('status' in result && result.status && 'token' in result) {
        window.sessionStorage.setItem('userName', this.oneDetailMsg.userName);
        window.sessionStorage.setItem('Authorization', result.token);
        this.router.navigateByUrl(`/pages/mine/${this.oneDetailMsg.userName}`);
        this.reloadUser.reloadUser.emit(true);
      } else {
        if ('message' in result) {
          this.msgAlert.onceErr(result.message);
        }
      }
    });
  }

  openMyDescriptionInput() {
    if (window.sessionStorage.getItem('userName') === this.oneDetailMsg.userName) {
      this.modifyMyMsg.showModifyDescriptionInput = true;
    }
  }

  saveMyDescription() {
    this.modifyMyMsg.showModifyDescriptionInput = false;
    if (!window.sessionStorage.getItem('Authorization')) {
      this.msgAlert.onceErr('您还未登录');
      return;
    }
    if (window.sessionStorage.getItem('userName') !== this.oneDetailMsg.userName) {
      this.msgAlert.onceErr('您无权限修改别人的个人信息');
      return;
    }
    if (this.oneDetailMsg.aboutMe === '') {
      this.msgAlert.onceErr('不能为空');
      return;
    }
    const data: ModifyNameAndDescription = {
      content: this.oneDetailMsg.aboutMe
    };
    this.httpService.saveMyDescription(data).subscribe(result => {
      if ('status' in result && !result.status) {
        if ('message' in result) {
          this.msgAlert.onceErr(result.message);
        }
      }
    });
  }

}

