import {ExtraOptions, RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {NotFoundComponent} from './pages/not-found/not-found.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', loadChildren: './pages/home/home.module#HomeModule'},
  {path: 'detail/:id', loadChildren: './pages/detail/detail.module#DetailModule'},
  {path: 'login', loadChildren: './pages/login/login.module#LoginModule'},
  {path: 'register', loadChildren: './pages/register/register.module#RegisterModule'},
  {path: 'add', loadChildren: './pages/add/add.module#AddModule'},
  {path: 'add/:id', loadChildren: './pages/add/add.module#AddModule'},
  {path: 'mine/:name', loadChildren: './pages/mine-home/mine-home.module#MineHomeModule'},
  {path: 'notFound', component: NotFoundComponent},
  {path: '**', redirectTo: 'notFound'},
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
