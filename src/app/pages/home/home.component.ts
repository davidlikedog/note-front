import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../service/httpService/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  constructor(
    private service: HttpService
  ) {
  }

  ngOnInit() {
    this.service.getAllArticle().subscribe(data => {
      console.log(data);
    });
  }

}
