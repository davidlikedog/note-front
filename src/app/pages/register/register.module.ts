import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';

import {RegisterComponent} from './register.component';
import {RegisterRoutingModule} from './register-routing.module';
import {MaterialModule} from './material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    RegisterRoutingModule
  ],
  declarations: [
    RegisterComponent
  ],
  providers: [
  ],
  entryComponents: [
  ],
})
export class RegisterModule {
}
