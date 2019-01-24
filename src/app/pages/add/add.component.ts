import {Component, OnInit, Inject} from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

interface CoverName {
  name: string;
}

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.less']
})
export class AddComponent implements OnInit {
  chooseCover: boolean;
  public Editor = ClassicEditor;
  public model = {
    editorData: '<p>Hello, world!1</p>'
  };

  constructor(
    public dialog: MatDialog
  ) {
    this.chooseCover = false;
  }

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CoverComponent, {
      // width: '500px',
      data: {name: '123'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
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
    @Inject(MAT_DIALOG_DATA) public data: CoverName) {
  }

  getValue() {
    console.log(this.coverImg);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
