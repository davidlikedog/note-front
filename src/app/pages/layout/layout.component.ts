import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FootControlService} from '../../service/footControlService/foot-control.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less']
})
export class LayoutComponent implements OnInit {
  showFooter: boolean;

  constructor(
    private route: Router,
    private foot: FootControlService
  ) {
    this.showFooter = true;
  }

  ngOnInit() {
    this.foot.showFooter.subscribe(value => {
      this.showFooter = value;
    });
  }

}
