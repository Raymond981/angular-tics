import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transactions'
})
export class TransactionPipe implements PipeTransform {

  transform(value, args:string[]) : any {
    let transactions = [];
    for (let transaction in value) {
      transactions.push(transaction);
    }
    return transactions;
  }


}
