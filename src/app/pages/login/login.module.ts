import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

import {LoginComponent} from './login.component';
import {LoginRoutingModule} from './login-routing.module';
import {MaterialModule} from './material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    LoginRoutingModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
  ],
  entryComponents: [
  ],
})
export class LoginModule {
}
