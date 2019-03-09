import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DetailComponent} from './detail.component';
import {CommentsModule} from '../commonComponent/comments/comments.module';
import {FormsModule} from '@angular/forms';

import {DetailRoutingModule} from './detail-routing.module';
import {MaterialModule} from './material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {TidyNumPipeModule} from '../../pipe/tidy-num-pipe.module';

@NgModule({
  imports: [
    CommonModule,
    DetailRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    TidyNumPipeModule,
    FormsModule,
    CommentsModule
  ],
  declarations: [
    DetailComponent,
  ],
  providers: [
  ],
  entryComponents: [
  ],
})
export class DetailModule {
}
