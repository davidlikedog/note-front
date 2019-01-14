import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  protected height: number;

  constructor() {
    this.height = 0;
  }

  ngOnInit() {
    this.height = window.innerHeight - 64;
  }

}
