import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {MaterialModule} from './material.module';
import {TidyNumPipeModule} from '../../../pipe/tidy-num-pipe.module';
import {CommentsComponent} from './comments.component';
import {ReplyComponent} from './comments.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    TidyNumPipeModule,
    FormsModule
  ],
  declarations: [
    CommentsComponent,
    ReplyComponent
  ],
  exports: [
    CommentsComponent
  ],
  entryComponents: [
    ReplyComponent
  ],
})
export class CommentsModule {
}
