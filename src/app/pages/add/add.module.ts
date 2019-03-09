import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {AddComponent} from './add.component';
import {CoverComponent} from './add.component';
import {MaterialModule} from './material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AddRoutingModule} from './add-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    CKEditorModule,
    FlexLayoutModule,
    FormsModule,
    AddRoutingModule
  ],
  declarations: [
    AddComponent,
    CoverComponent
  ],
  providers: [
  ],
  entryComponents: [
    CoverComponent
  ],
})
export class AddModule {
}
