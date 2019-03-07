import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tidyNumPipe'
})
export class TidyNumPipePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (Number(value) > 10000) {
      return '1w+';
    }
    return value;
  }

}
