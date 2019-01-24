import { Component, OnInit, Input } from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.less']
})
export class CommentsComponent implements OnInit {
  @Input() type: string;

  constructor(
    private reply: MatBottomSheet
  ) {
  }

  ngOnInit() {
  }

  openReply(): void {
    this.reply.open(ReplyComponent);
  }

}

@Component({
  selector: 'app-reply',
  templateUrl: 'reply.component.html',
  styleUrls: ['./reply.component.less']
})
export class ReplyComponent {
  constructor(private bottomSheetRef: MatBottomSheetRef<ReplyComponent>) {}

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
