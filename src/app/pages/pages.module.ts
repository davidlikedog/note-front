import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PagesComponent} from './pages.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './home/home.component';
import {AddComponent} from './add/add.component';
import {ModifyComponent} from './modify/modify.component';
import {DetailComponent} from './detail/detail.component';

import {PagesRoutingModule} from './pages-routing.module';
import {MaterialModule} from './material/material.module';
import {LayoutModule} from './layout/layout.module';

import {VerifyLogin} from './verify/verifyLogin/verifyLogin';
import { PictureRotateComponent } from './picture-rotate/picture-rotate.component';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    MaterialModule,
    LayoutModule,
  ],
  declarations: [
    PagesComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AddComponent,
    ModifyComponent,
    DetailComponent,
    PictureRotateComponent,
  ],
  providers: [
    VerifyLogin
  ],
})
export class PagesModule {
}
