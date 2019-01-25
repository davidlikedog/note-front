import {Component, OnInit, Inject} from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {MatDialog, MatDialogRef} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.less']
})
export class AddComponent implements OnInit {
  public Editor = ClassicEditor;
  public model = {
    editorData: '<p>Hello, world!1</p>'
  };
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
  ) {
    this.coverImg = '';
    this.coverImgType = '';
  }

  ngOnInit() {
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
    const file = e.srcElement.files[0];
    this.coverImg = window.URL.createObjectURL(file);
    this.coverImgType = 'upload';
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
