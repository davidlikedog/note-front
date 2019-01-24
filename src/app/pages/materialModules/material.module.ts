import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatSidenavModule,
  MatToolbarModule,
  MatProgressBarModule,
  MatMenuModule,
  MatBottomSheetModule,
  MatCheckboxModule,
  MatDialogModule,
  MatRadioModule,
} from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatMenuModule,
    MatBottomSheetModule,
    MatCheckboxModule,
    MatDialogModule,
    MatRadioModule,
  ],
  declarations: [],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatMenuModule,
    MatBottomSheetModule,
    MatCheckboxModule,
    MatDialogModule,
    MatRadioModule,
  ],
})
export class MaterialModule { }
