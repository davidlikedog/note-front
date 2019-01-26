import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpService} from '../../service/httpService/http.service';
import {Article} from '../../interface/interface';
import {MessageAlertService} from '../../service/messageAlertService/message-alert.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.less']
})
export class DetailComponent implements OnInit {
  articleDetail: Article;

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
    };
  }

  ngOnInit() {
    const id: string = this.route.snapshot.paramMap.get('id');
    this.httpService.getOneArticle(id).subscribe(value => {
      console.log(value);
      if ('status' in value && value.status && 'data' in value && value.data.length > 0) {
        this.articleDetail = value.data[0];
      } else {
        if ('message' in value) {
          this.msgAlert.onceErr(value.message);
        }
      }
    });
  }

}
