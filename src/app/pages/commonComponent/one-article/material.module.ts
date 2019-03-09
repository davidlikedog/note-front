import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
} from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
  declarations: [],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
})
export class MaterialModule { }
