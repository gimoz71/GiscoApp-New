import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'giscoDateFormat_gg_mm_aaaa' })
export class GiscoDatePipe implements PipeTransform {
    transform(value: string, times: number) {
        // in input ho sempre una stringa contenente il long della data
        const date = new Date(+value);
        return this.leftpad(date.getDate(), 2)
            + '/' + this.leftpad(date.getMonth() + 1, 2)
            + '/' + date.getFullYear();
    }

    private leftpad(val, resultLength = 2, leftpadChar = '0'): string {
        return (String(leftpadChar).repeat(resultLength)
            + String(val)).slice(String(val).length);
    }
}
