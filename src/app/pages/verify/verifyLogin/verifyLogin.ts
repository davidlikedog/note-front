import {CanActivate} from '@angular/router';

export class VerifyLogin implements CanActivate {
  canActivate() {
    console.log('you are login');
    return true;
  }
}
