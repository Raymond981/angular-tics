import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'products'
})
export class ProductPipe implements PipeTransform {

  transform(value, args:string[]) : any {
    let products = [];
    for (let product in value) {
      products.push(product);
    }
    return products;
  }


}
