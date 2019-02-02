import {Component, OnInit, Inject} from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import {MatDialog, MatDialogRef} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {MessageAlertService} from '../../service/messageAlertService/message-alert.service';
import {HttpService} from '../../service/httpService/http.service';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {URL} from '../../global-data/global-data';

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
      // 自定义上传适配器来监听上传图片成功后的回调函数
      uploadUrl: `${URL}/uploadImg`
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

  onReady( editor ) {
    editor.ui.view.editable.element.parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.view.editable.element
    );
  }

  // 通过参数判断是添加页，还是修改页
  private judgeIfIdInRouter(): boolean | number {
    const id = this.activateRouter.snapshot.paramMap.get('id');
    if (id) {
      this.isAddOrUpdate = 'update';
      return Number(id);
    } else {
      this.isAddOrUpdate = 'add';
      return false;
    }
  }

  ngOnInit() {
    const judgeId = this.judgeIfIdInRouter();
    if (judgeId) {
      this.httpService.getModifyArticleData(Number(judgeId)).subscribe(modifyData => {
        if ('status' in modifyData && modifyData.status) {
          if ('data' in modifyData && modifyData.data) {
            if (
              'title' in modifyData.data &&
              'description' in modifyData.data &&
              'cover' in modifyData.data &&
              'isPrivate' in modifyData.data &&
              'content' in modifyData.data
            ) {
              this.title = modifyData.data.title;
              this.description = modifyData.data.description;
              modifyData.data.isPrivate === 'true' ? this.isPrivate = true : this.isPrivate = false;
              this.model.editorData = modifyData.data.content;
              this.coverImg = modifyData.data.cover;
              this.coverImgType = 'modify';
            }
          }
        } else {
          if ('message' in modifyData) {
            this.msgAlert.onceErr(modifyData.message);
          }
        }
      });
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
      return;
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

      if (this.judgeIfIdInRouter()) {
        this.httpService.saveModifyArticleData(Number(this.judgeIfIdInRouter()), articleData).subscribe(result => {
          if ('status' in result && result.status) {
            if ('message' in result) {
              this.msgAlert.onceOk(result.message);
            }
          } else {
            if ('message' in result) {
              this.msgAlert.onceErr(result.message);
            }
          }
        });
      } else {
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
      }
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
