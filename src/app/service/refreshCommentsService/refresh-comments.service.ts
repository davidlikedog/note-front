import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RefreshCommentsService {
  reFreshComments: EventEmitter<boolean>;

  constructor() {
    this.reFreshComments = new EventEmitter();
  }
}
