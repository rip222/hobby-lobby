import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitCamelCase'
})
export class SplitCamelCasePipe implements PipeTransform {

  transform(value: string, ...args: any[]): any {
    return value
            .replace(/([A-Z][a-z])/g, ' $1') // insert splace before all caps
            .replace(/^./, str => str.slice(0, 1).toUpperCase()); // uppercase the first characater
  }

}
