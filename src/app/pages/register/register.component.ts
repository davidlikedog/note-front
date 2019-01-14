import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {
  protected height: number;

  constructor() {
    this.height = 0;
  }

  ngOnInit() {
    this.height = window.innerHeight - 64;
  }

}
