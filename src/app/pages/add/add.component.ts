import {Component, OnInit, Inject} from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {MatDialog, MatDialogRef} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {MessageAlertService} from '../../service/messageAlertService/message-alert.service';
import {HttpService} from '../../service/httpService/http.service';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.less']
})
export class AddComponent implements OnInit {
  public isAddOrUpdate: string;
  public Editor = ClassicEditor;
  public model = {
    editorData: '<p>Hello, world!1</p>'
  };
  public title = '';
  public description = '';
  public isPrivate = false;
  private uploadCover: File;
  coverImg: string;
  coverImgType: string;
  editConfig = {
    ckfinder: {
      // 返回的数据格式return json([‘uploaded’=>true,’url’=>$url]);
      uploadUrl: 'http://localhost?act=uploadImg'
    },
  };

  constructor(
    public dialog: MatDialog,
    public uploadImg: DomSanitizer,
    private msgAlert: MessageAlertService,
    private httpService: HttpService,
    private router: Router,
    private activateRouter: ActivatedRoute
  ) {
    this.coverImg = '';
    this.coverImgType = '';
  }

  ngOnInit() {
    // 通过参数判断是添加页，还是修改页
    const id = this.activateRouter.snapshot.paramMap.get('id');
    if (id) {
      this.isAddOrUpdate = 'update';
    } else {
      this.isAddOrUpdate = 'add';
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CoverComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.coverImg = result;
      }
      this.coverImgType = 'choose';
    });
  }

  fileChange(e) {
    this.uploadCover = e.target.files[0];
    const file = e.srcElement.files[0];
    this.coverImg = window.URL.createObjectURL(file);
    this.coverImgType = 'upload';
  }

  submit() {
    if (this.coverImgType === '') {
      this.msgAlert.onceErr('必须选择 或 上传一张封面');
    }
    if (this.title !== '' && this.description !== '' && this.coverImgType !== '' && this.model.editorData !== '') {
      const articleData: FormData = new FormData();
      articleData.append('title', this.title);
      articleData.append('description', this.description);
      articleData.append('isPrivate', String(this.isPrivate));
      articleData.append('content', this.model.editorData);
      if (this.coverImgType === 'upload') {
        articleData.append('cover', this.uploadCover, this.uploadCover.name);
      } else {
        articleData.append('cover', this.coverImg);
      }

      this.httpService.addArticle(articleData).subscribe(response => {
        if ('status' in response && response.status) {
          if ('message' in response) {
            this.msgAlert.onceOk(response.message);
          }
          setTimeout(() => {
            this.router.navigateByUrl('/home');
          }, 1000);
        } else {
          this.msgAlert.onceErr(response.message);
        }
      });
    } else {
      this.msgAlert.onceErr('您还有数据尚未完成！');
    }
  }

}

@Component({
  selector: 'app-cover',
  templateUrl: 'cover.component.html',
  styleUrls: ['./cover.component.less']
})
export class CoverComponent {
  coverImg: string;

  constructor(
    public dialogRef: MatDialogRef<CoverComponent>,
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
