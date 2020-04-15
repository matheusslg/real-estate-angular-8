import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'geo'
})
export class GeoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) return null;
    if (!value) return null;
    switch (args) {
      case 'lat':
        return Number(value.split(',')[0].replace(/\s/g, ""));
        break;
      case 'lng':
        return Number(value.split(',')[1].replace(/\s/g, ""));
        break;
    }
  }

}
