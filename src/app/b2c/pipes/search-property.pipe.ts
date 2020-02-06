import { Pipe, PipeTransform } from '@angular/core';
import { NormalizeStringPipe } from './normalize-string.pipe';

@Pipe({
  name: 'searchProperty'
})
export class SearchPropertyPipe implements PipeTransform {

  constructor(
    private normalizeStringPipe: NormalizeStringPipe
  ) { }

  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = this.normalizeStringPipe.transform(searchText.toLowerCase());
    let compatible = [];
    items.forEach(it => {
      for (let key of Object.keys(it)) {
        let prop = it[key];
        if (Array.isArray(prop) && prop.length > 0) {
          prop.forEach(_el => {
            if (_el.description) {
              let desc = this.normalizeStringPipe.transform(_el.description).toLowerCase();
              if (desc.includes(searchText)) {
                if (!compatible.includes(it)) {
                  compatible.push(it);
                }
              }
            }
          });
        } else {
          if (key === 'toilets' && searchText.includes('banheiro') && searchText.includes(String(prop))) {
            if (!compatible.includes(it)) {
              compatible.push(it);
            }
          } else if (key === 'bedrooms' && searchText.includes('quarto') && searchText.includes(String(prop))) {
            if (!compatible.includes(it)) {
              compatible.push(it);
            }
          } else if (key === 'garage' && searchText.includes('garage') && searchText.includes(String(prop))) {
            if (!compatible.includes(it)) {
              compatible.push(it);
            }
          } else if (
            (String(prop).includes('ha') || 
            String(prop).includes('m') || 
            String(prop).includes('m²'))
            && searchText.includes(String(prop))) { // size
            if (!compatible.includes(it)) {
              compatible.push(it);
            }
          } else if (
            ((key == 'priceNumber' && prop !== null) && String(prop).includes(searchText)) ||
            ((key == 'priceCustom' && prop !== null) && prop.includes(searchText))
          ) { // price
            if (!compatible.includes(it)) {
              compatible.push(it);
            }
          } else { // another
            if ((key !== '_id' && key !== 'toilets' && key !== 'bedrooms' && key !== 'garage' && key !== '__v') && prop !== null && this.normalizeStringPipe.transform(String(prop.hasOwnProperty('description') ? prop.description : prop)) !== '' &&  this.normalizeStringPipe.transform(String(prop.hasOwnProperty('description') ? prop.description : prop)).includes(searchText)) {
              if (!compatible.includes(it)) {
                compatible.push(it);
              }
            }
          }
          /*if (this.normalizeStringPipe.transform(String(prop)).toLowerCase().includes(searchText)) {
            if (!compatible.includes(it)) {
              compatible.push(it);
            }
          }*/
        }
      }
    });
    return compatible;
  }

}
