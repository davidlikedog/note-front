import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {TidyNumPipePipe} from './tidy-num-pipe.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [TidyNumPipePipe],
  exports: [
    TidyNumPipePipe
  ],
})
export class TidyNumPipeModule { }
