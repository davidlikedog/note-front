import { Component } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-decoupled-document';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'app';
  public Editor = ClassicEditor;  // 此处加载它是因为，使用了懒加载，导致，如果没进入add页面，富文本框的css是不会上来的。。。
}
