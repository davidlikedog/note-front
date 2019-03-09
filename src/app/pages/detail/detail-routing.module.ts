import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {DetailComponent} from './detail.component';

const routes: Routes = [
  {path: '', component: DetailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailRoutingModule {
}
