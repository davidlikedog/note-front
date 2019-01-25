import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {NotFoundComponent} from './not-found/not-found.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {HomeComponent} from './home/home.component';
import {PagesComponent} from './pages.component';
import {AddComponent} from './add/add.component';
import {ModifyComponent} from './modify/modify.component';
import {DetailComponent} from './detail/detail.component';
import {MineHomeComponent} from './mine-home/mine-home.component';

import {VerifyLogin} from './verify/verifyLogin/verifyLogin';

// todo: 添加修改删除操作需要校验有没有登陆

const routes: Routes = [
  {
    path: '', component: PagesComponent,
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
      {path: 'detail/:id', component: DetailComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'add', component: AddComponent, canActivate: [VerifyLogin]},
      {path: 'mine', component: MineHomeComponent, canActivate: [VerifyLogin]},
      {path: 'modify/:id', component: ModifyComponent, canActivate: [VerifyLogin]},
      {path: '**', component: NotFoundComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
