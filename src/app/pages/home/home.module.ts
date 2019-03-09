import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeComponent} from './home.component';
import {OneArticleModule} from '../commonComponent/one-article/one-article.module';
import {PictureRotateComponent} from '../picture-rotate/picture-rotate.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MaterialModule} from './material.module';

import {HomeRoutingModule} from './home-routing.module';
import {TidyNumPipeModule} from '../../pipe/tidy-num-pipe.module';


@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    TidyNumPipeModule,
    OneArticleModule
  ],
  declarations: [
    HomeComponent,
    PictureRotateComponent,
  ],
  providers: [
  ],
  entryComponents: [
  ],
})
export class HomeModule {
}
