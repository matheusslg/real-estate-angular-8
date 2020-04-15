import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'propertyDescriptionLimit'
})
export class PropertyDescriptionLimitPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) return null;
    return value.split('<u')[0].replace(/<.*?>/g, '');
  }

}
