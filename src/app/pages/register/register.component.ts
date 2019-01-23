import { Component, OnInit, OnDestroy } from '@angular/core';
import {FootControlService} from '../../service/footControlService/foot-control.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit, OnDestroy {
  protected height: number;

  constructor(
    private foot: FootControlService,
  ) {
    this.height = 0;
  }

  ngOnInit() {
    this.height = window.innerHeight - 64;
    this.foot.showFooter.emit(false);
  }

  ngOnDestroy() {
    this.foot.showFooter.emit(true);
  }

}
