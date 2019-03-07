import {Component, OnInit, Input, Inject} from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA} from '@angular/material';
import {OneComments, OneReply, ReplyData} from '../../../interface/interface';
import {MessageAlertService} from '../../../service/messageAlertService/message-alert.service';
import {HttpService} from '../../../service/httpService/http.service';
import {RefreshCommentsService} from '../../../service/refreshCommentsService/refresh-comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.less']
})
export class CommentsComponent implements OnInit {
  @Input('type') type: string;
  @Input('commentsData') commentsData: OneComments;
  @Input('replyData') replyData: OneReply;
  @Input('commentsId') commentsId: number;

  constructor(
    private reply: MatBottomSheet,
    private msgAlert: MessageAlertService
  ) {
  }

  ngOnInit() {
  }

  openReply(sayer): void {
    if (window.sessionStorage.getItem('Authorization')) {
      const replyWho: string = sayer.innerHTML.trim();
      this.reply.open(ReplyComponent, {
        data: {
          replyWho: replyWho,
          commentsId: Number(this.type === 'comments' ? this.commentsData.id : this.commentsId),
          articleId: this.type === 'comments' ? this.commentsData.articleId : this.replyData.articleId
        }
      });
    } else {
      this.msgAlert.onceErr('请登录');
    }
  }

}

interface ReplyWho {
  replyWho: string;
  commentsId: number;
  articleId: number;
}

@Component({
  selector: 'app-reply',
  templateUrl: 'reply.component.html',
  styleUrls: ['./reply.component.less']
})
export class ReplyComponent {
  replyContent = '';

  constructor(
    private bottomSheetRef: MatBottomSheetRef<ReplyComponent>,
    private msgAlert: MessageAlertService,
    private httpService: HttpService,
    private refreshComments: RefreshCommentsService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: ReplyWho
  ) {
  }

  addReply(event: MouseEvent): void {
    event.preventDefault();

    if (this.replyContent) {
      const replyData: ReplyData = {
        content: this.replyContent,
        toUserName: this.data.replyWho,
        commentsId: this.data.commentsId,
        articleId: this.data.articleId
      };
      this.httpService.addReply(replyData).subscribe(value => {
        if ('status' in value && value.status) {
          this.refreshComments.reFreshComments.emit(true);
        } else {
          if ('message' in value) {
            this.msgAlert.onceErr(value.message);
          }
        }
      });
      this.bottomSheetRef.dismiss();
    } else {
      this.msgAlert.onceErr('请输入内容');
    }
  }

  whenKeyDown(event) {
    if (event.keyCode === 13) {
      this.addReply(event);
    }
  }
}
