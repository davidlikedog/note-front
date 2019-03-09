import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {AddComponent} from './add.component';

const routes: Routes = [
  {path: '', component: AddComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddRoutingModule {
}
