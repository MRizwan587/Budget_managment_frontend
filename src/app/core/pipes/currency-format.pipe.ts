import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat'
})
export class CurrencyFormatPipe implements PipeTransform {

 
  transform(value: number | string, symbol: string = ''): string {
    if (value === null || value === undefined) return '';

    const numberValue = Number(value);
    if (isNaN(numberValue)) return '';

    const formattedNumber = numberValue.toLocaleString('en-PK', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });

    return `${symbol} ${formattedNumber}`;
  }

}
