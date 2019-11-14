import { Component, OnInit } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import { HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {


  httpOptions = {
    headers: new HttpHeaders({
      'Content_Type': 'application/x-wwww-form-urlencoded',
      'Accept': 'application/json',
      'Authorization': 'Bearer '+ localStorage.getItem('token')
    })
  } 

  listaTransactions:any = []

  edit_transaction: FormGroup
  

  btn = true

  id: String

  constructor(private api: ApiService, private   formBuilder: FormBuilder, private route:Router) {
    this.api.obtenerTransaciones(this.httpOptions).subscribe(result =>{
      console.log(result)
      this.listaTransactions = result
    }, error =>{
      console.log(error)
    })
   }
  ngOnInit() {
    this.edit_transaction = this.formBuilder.group({
      'quantity': [''],
      'type': ['']
    })
  }

  eliminar(id){
    this.api.eliminarTransaction(id, this.httpOptions).subscribe(result =>{
      console.log(result)
      let index = this.listaTransactions.findIndex(servicio => servicio.id === this.listaTransactions.id)
      this.listaTransactions.splice(index,1)
    }, error =>{
      console.log(error)
    })
  }

  modificarTransaccion(data:any){
    this.btn = false
    this.id = data.id
    this.edit_transaction = this.formBuilder.group({
      'quantity': [data.quantity],
      'type': [data.type]
    })
  }

  updateTransaction(){
    this.api.actualizarTransaction(this.id, this.edit_transaction.value, this.httpOptions).subscribe(result =>{
      console.log(result)
      this.getTransactions()
      this.btn = true
      this.edit_transaction = this.formBuilder.group({
        'type':[''],
        'quantity':['']
      })
    })
  }

  getTransactions(){
    this.api.obtenerTransaciones(this.httpOptions).subscribe(result =>{
      console.log(result)
      this.listaTransactions = result
    }, error =>{
      console.log(error)
    })
  }

  verInventario(){
    this.route.navigateByUrl("/inventory")
  }


}
