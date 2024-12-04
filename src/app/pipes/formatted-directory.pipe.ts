import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formattedDirectory',
  standalone: true,
})
export class FormattedDirectoryPipe implements PipeTransform {

  transform<T extends Record<number | string, string>>(directory: T): { key: number; value: string }[] {
    return Object.entries(directory).map(([key, value]) => ({
      key: Number(key),
      value
    }));
  }

}
