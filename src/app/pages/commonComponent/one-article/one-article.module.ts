import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from './material.module';
import {RouterModule} from '@angular/router';
import {TidyNumPipeModule} from '../../../pipe/tidy-num-pipe.module';
import {OneArticleComponent} from './one-article.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    TidyNumPipeModule
  ],
  declarations: [OneArticleComponent],
  exports: [
    OneArticleComponent
  ],
})
export class OneArticleModule {
}
