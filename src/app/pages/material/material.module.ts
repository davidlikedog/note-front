import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatButtonModule,
  MatIconModule,
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
  ],
  declarations: [],
  exports: [
    MatButtonModule,
    MatIconModule,
  ],
})
export class MaterialModule { }
