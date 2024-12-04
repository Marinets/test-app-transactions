import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formattedDate',
  standalone: true,
})
export class FormattedDatePipe implements PipeTransform {

  transform(value: Date): string {
    try {
      const day =(value.getDate()).toString().padStart(2, "0");
      const month = value.toLocaleString('en-US', { month: 'long' });
      const year = value.getFullYear();
      return `${day} ${month} ${year}`;
    } catch (e: any) {
      return '-'
    }
  }

}
