import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'valorEspecial',
  standalone: true
})
export class ValorEspecialPipe implements PipeTransform {
  transform(value: any): string {
    if (typeof value === 'string') {
      if (value.startsWith('#¡')) return 'N/A';
      return value.replace(',', '.');
    }
    return value?.toString() || '0';
  }
}