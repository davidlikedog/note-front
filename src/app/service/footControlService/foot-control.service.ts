import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FootControlService {
  showFooter: EventEmitter<boolean>;

  constructor() {
    this.showFooter = new EventEmitter();
  }
}
