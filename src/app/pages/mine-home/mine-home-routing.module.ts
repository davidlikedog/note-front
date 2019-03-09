import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {MineHomeComponent} from './mine-home.component';

const routes: Routes = [
  {path: '', component: MineHomeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MineHomeRoutingModule {
}
