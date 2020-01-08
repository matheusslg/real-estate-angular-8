import { Pipe, PipeTransform } from '@angular/core';
import { NormalizeStringPipe } from './normalize-string.pipe';

@Pipe({
  name: 'filterProperties'
})
export class FilterPropertiesPipe extends NormalizeStringPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let newValue = [];

    if (args.length == 0) {
      return value;
    }
    
    value.forEach(_property => {
      args.forEach(_arg => {
        _property.locations.forEach(_location => {
          if (super.transform(_location.description) == _arg) {
            newValue.push(_property);
          }
        });
        _property.categories.forEach(_category => {
          if (super.transform(_category.description) == _arg) {
            newValue.push(_property);
          }
        });
        _property.types.forEach(_type => {
          if (super.transform(_type.description) == _arg) {
            newValue.push(_property);
          }
        });
      });
    });

    return newValue;
  }

}
