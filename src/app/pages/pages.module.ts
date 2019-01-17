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
import {MaterialModule} from './materialModules/material.module';
import {LayoutComponent} from './layout/layout.component';

import {VerifyLogin} from './verify/verifyLogin/verifyLogin';
import { PictureRotateComponent } from './picture-rotate/picture-rotate.component';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
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
    LayoutComponent,
  ],
  providers: [
    VerifyLogin
  ],
})
export class PagesModule {
}
