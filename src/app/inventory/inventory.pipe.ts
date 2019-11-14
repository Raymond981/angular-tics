import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'inventories'
})
export class InventoryPipe implements PipeTransform {

  transform(value, args:string[]) : any {
    let inventories = [];
    for (let inventory in value) {
      inventories.push(inventory);
    }
    return inventories;
  }

}
