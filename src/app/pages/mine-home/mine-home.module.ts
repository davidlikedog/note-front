import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';

import {MineHomeComponent} from './mine-home.component';
import {MineHomeRoutingModule} from './mine-home-routing.module';
import {MaterialModule} from './material.module';
import {CommentsModule} from '../commonComponent/comments/comments.module';
import {OneArticleModule} from '../commonComponent/one-article/one-article.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    MineHomeRoutingModule,
    OneArticleModule,
    CommentsModule,
    FlexLayoutModule,
  ],
  declarations: [
    MineHomeComponent,
  ],
  providers: [
  ],
  entryComponents: [
  ],
})
export class MineHomeModule {
}
