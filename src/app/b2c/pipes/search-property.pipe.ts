import { Pipe, PipeTransform } from '@angular/core';
import { NormalizeStringPipe } from './normalize-string.pipe';

@Pipe({
  name: 'searchProperty'
})
export class SearchPropertyPipe implements PipeTransform {

  constructor(
    private normalizeStringPipe: NormalizeStringPipe
  ) { }

  transform(list: any[], filterText: string): any {
    return list && filterText ? list.filter(item => this.normalizeStringPipe.transform(item.title).search(new RegExp(this.normalizeStringPipe.transform(filterText), 'i')) > -1) : [];
  }

}
