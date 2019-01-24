import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {PagesRoutingModule} from './pages-routing.module';
import {MaterialModule} from './materialModules/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';

import {PagesComponent} from './pages.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './home/home.component';
import {AddComponent} from './add/add.component';
import {ModifyComponent} from './modify/modify.component';
import {DetailComponent} from './detail/detail.component';
import {PictureRotateComponent} from './picture-rotate/picture-rotate.component';
import {LayoutComponent} from './layout/layout.component';
import {ReplyComponent} from './commonComponent/comments/comments.component';
import {CommentsComponent} from './commonComponent/comments/comments.component';
import {CoverComponent} from './add/add.component';

import {VerifyLogin} from './verify/verifyLogin/verifyLogin';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CKEditorModule,
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
    CommentsComponent,
    ReplyComponent,
    CoverComponent,
  ],
  providers: [
    VerifyLogin
  ],
  entryComponents: [
    ReplyComponent,
    CoverComponent,
  ],
})
export class PagesModule {
}
