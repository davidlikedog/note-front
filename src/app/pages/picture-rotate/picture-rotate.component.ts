import {Component, OnInit, AfterViewInit, ViewChild} from '@angular/core';
import {PicReturn} from '../../../assets/picture-play';

@Component({
  selector: 'app-picture-rotate',
  templateUrl: './picture-rotate.component.html',
  styleUrls: ['./picture-rotate.component.less']
})
export class PictureRotateComponent implements OnInit, AfterViewInit {
  private picture: any;
  @ViewChild('picBox') picBox;
  @ViewChild('points') points;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.picture = new PicReturn(this.picBox, 2000, this.points, 'pointSelected');
      this.picture.start();
    }, 100);
  }

}
