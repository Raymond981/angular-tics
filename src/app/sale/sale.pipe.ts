import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sales'
})
export class SalePipe implements PipeTransform {

  transform(value, args:string[]) : any {
    let sales = [];
    for (let sale in value) {
      sales.push(sale);
    }
    return sales;
  }

}
