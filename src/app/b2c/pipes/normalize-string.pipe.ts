import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'normalizeString'
})
export class NormalizeStringPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    function removeAccents(value) {
      return value
        .replace(/á/g, 'a')
        .replace(/é/g, 'e')
        .replace(/í/g, 'i')
        .replace(/ó/g, 'o')
        .replace(/ô/g, 'o')
        .replace(/õ/g, 'o')
        .replace(/ú/g, 'u')
        .replace(/ã/g, 'a')
        .replace(/Á/g, 'a')
        .replace(/É/g, 'e')
        .replace(/Í/g, 'i')
        .replace(/Ó/g, 'o')
        .replace(/Ô/g, 'o')
        .replace(/Õ/g, 'o')
        .replace(/Ú/g, 'u')
        .replace(/Ã/g, 'a');
    }
    return removeAccents(value).toLowerCase();
  }

}
