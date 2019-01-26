import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[appPreventEvent]'
})
export class PreventEventDirective {

  constructor() {
  }

  @HostListener('click')
  onClick(e) {
    console.log('e:', e);
    // $event.preventDefault();
    // $event.stopPropagation();
  }

}
