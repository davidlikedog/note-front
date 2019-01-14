import {NgModule} from '@angular/core';
import {LayoutComponent} from './layout.component';

import {
  MatSidenavModule,
  MatButtonModule,
  MatToolbarModule,
  MatProgressBarModule,
  MatIconModule
} from '@angular/material';

@NgModule({
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatIconModule
  ],
  declarations: [
    LayoutComponent,
  ],
  exports: [
    LayoutComponent,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatIconModule
  ],
})
export class LayoutModule {
}
