import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {

  salesList: any = []

  edit_sale: FormGroup

  btn = true

  id: String

  rol: String

  cantidad: any

  httpOptions = {
    headers: new HttpHeaders({
      'Content_Type': 'application/x-wwww-form-urlencoded',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
  }

  constructor(private api: ApiService, private formBuilder: FormBuilder, private route: Router) {
    this.rol = localStorage.getItem('rol')
    this.edit_sale = this.formBuilder.group({
      'quantity': [''],
      'discount': [''],
      'total': [''],
      'statatus': [''],
      'payment_method': ['']
    })


    this.api.obtenerSales(this.httpOptions).subscribe(result => {
      console.log(result)
      this.salesList = result
    }, error => {
      console.log(error)
    })
  }

  ngOnInit() {

    this.api.enviarNotificacion("ta", "lacion").subscribe(result => {
      console.log(result)
    }, error => {
      console.log(error)
    })

    this.api.obtenerSales(this.httpOptions).subscribe(result => {
      console.log(result)
      this.salesList = result
    }, error => {
      console.log(error)
    })
  }

  modificarSales(data: any) {
    this.btn = false
    this.id = data.id
    this.edit_sale = this.formBuilder.group({
      'quantity': [data.quantity],
      'discount': [data.discount],
      'total': [data.total],
      'statatus': [data.status],
      'payment_method': [data.payment_method]
    })
  }

  verInventario() {
    this.route.navigateByUrl("/inventory")
  }

  updateSale() {
    this.api.actualizarSale(this.id, this.edit_sale.value, this.httpOptions).subscribe(result => {
      console.log(result)
      this.btn = true
      this.id = ""
      this.ngOnInit()
    }, error => {
      console.log(error)
    })
  }

  solicitarCancelacion(objecto: any) {
    let data = {
      'status': "2"
    }
    this.api.enviarNotificacion("Un cajero quiere eliminar una venta", "Peticion de cancelacion").subscribe(result => {
      console.log(result)
    }, error => {
      console.log(error)
    })
    this.api.actualizarSale(objecto.id, data, this.httpOptions).subscribe(result => {
      console.log(result)

      this.ngOnInit()
    }, error => {
      console.log(error)
    })
  }

  confirmarCancelacion(objecto: any) {
    let data = {}
    this.api.obtenerUnInventario(objecto.product_id, this.httpOptions).subscribe(resultw => {
      console.log(resultw)
      data = {
        'status': "3",
        'quantity': objecto.quantity + resultw[0].quantity
      }
      this.api.actualizarSale(objecto.id, data, this.httpOptions).subscribe(result => {
        console.log(result)
        this.api.enviarNotificacion("El admin acepto la cancelación de la venta", "Cancelación aceptada").subscribe(result => {
          console.log(result)
        }, error => {
          console.log(error)
        })
        this.ngOnInit()
      }, error => {
        console.log(error)
      })
    }, error => {
      console.log(error)
    })

  }

}
