import { Component, OnInit } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseStorageService } from '../servicios/firebase-storage.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  inventoryList: any = []

  productList: any = []

  _object = Object

  rol: String

  btn = true
  btn2 = true

  id: String
  idVenta: String
  idProducto: String

  cantidadActual: number
  pecioProducto: number

  descuentoTotal: number

  edit_product: FormGroup

  make_sale: FormGroup

  public mensajeArchivo = 'No hay un archivo seleccionado';
  public datosFormulario = new FormData();
  public nombreArchivo = '';
  public URLPublica = '';
  public porcentaje = 0;
  public finalizado = false;

  constructor(private api: ApiService, private formBuilder: FormBuilder, private route: Router, private firebaseStorage: FirebaseStorageService) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content_Type': 'application/x-wwww-form-urlencoded',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    }

    this.edit_product = this.formBuilder.group({
      'code': ['', Validators.required],
      'name': ['', Validators.required],
      'description': ['', Validators.required],
      'archivo': [null, Validators.required],
      'price': ["", Validators.required],
      'tax': ["", Validators.required],
      'quantity': ["", Validators.required],

    })

    this.make_sale = this.formBuilder.group({
      'product_id': [''],
      'user_id': [localStorage.getItem('id')],
      'quantity': [''],
      'discount': [''],
      'total': [''],
      'status': [''],
      'payment_method': ['']
    })
  

  }

  ngOnInit() {
    this.api.enviarNotificacion("HOLA", "HOLA").subscribe(result =>{
      console.log(result)
    }, error =>{
      console.log(error)
    })
    this.rol = localStorage.getItem('rol')
    const httpOptions = {
      headers: new HttpHeaders({
        'Content_Type': 'application/x-wwww-form-urlencoded',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    }

    this.api.obtenerTodoInventario(httpOptions).subscribe(result => {
      this.inventoryList = result
      console.log(this.inventoryList)
      //this.api.enviarNotificacion("Hola", "hola")
    }, error => {
      console.log(error)
    })
  }

  crearProducto() {
    this.route.navigateByUrl('/product')
  }


  verTransacciones() {
    this.route.navigateByUrl("/transaction")
  }

  verVentas(){
    this.route.navigateByUrl("/sale")
  }

  eliminar(id) {
    console.log(id)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content_Type': 'application/x-wwww-form-urlencoded',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    }
    this.api.eliminarInventario(id, httpOptions).subscribe(result => {
      console.log(result)
      let index = this.inventoryList.findIndex(servicio => servicio.id === this.inventoryList.id)
      this.inventoryList.splice(index, 1)
    }, error => {
      console.log(error)
    })
  }

  modificarInventario(data: any) {
    this.btn = false
    this.id = data.id
    this.idProducto = data.product_id
    this.edit_product = this.formBuilder.group({
      'code': [data.code, Validators.required],
      'name': [data.name, Validators.required],
      'description': [data.description, Validators.required],
      'archivo': [null, Validators.required],
      'price': [data.price, Validators.required],
      'tax': [data.tax, Validators.required],
      'quantity': [data.quantity, Validators.required],
      'image_url': [data.image_url]
    })
  }

  updateInventory() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content_Type': 'application/x-wwww-form-urlencoded',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    }

    this.api.actualizarInventario(this.id, this.edit_product.value, httpOptions).subscribe(result => {
      console.log("Imprime algo", result)
      this.ngOnInit()
      this.btn = true
      this.edit_product = this.formBuilder.group({
        'code': ['', Validators.required],
        'name': ['', Validators.required],
        'description': ['', Validators.required],
        'archivo': [null, Validators.required],
        'price': ["", Validators.required],
        'tax': ["", Validators.required],
        'quantity': ["", Validators.required],

      })

    }, error => {
      console.log(error)
    })

    this.api.actualizarProducto(this.idProducto, this.edit_product.value, httpOptions).subscribe(result =>{
      console.log("Actualizo producto igual", result)
      this.ngOnInit()
    }, error =>{
      console.log(error)
    })

  }

  cambioArchivo(event) {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.mensajeArchivo = `Archivo preparado: ${event.target.files[i].name}`;
        this.nombreArchivo = event.target.files[i].name;
        this.datosFormulario.delete('archivo');
        this.datosFormulario.append('archivo', event.target.files[i], event.target.files[i].name)
      }
    } else {
      this.mensajeArchivo = 'No hay un archivo seleccionado';
    }
  }


  venderProducto(data:any){
    this.btn2 = false
    this.idProducto = data.product_id
    this.cantidadActual = data.quantity
    this.pecioProducto = data.price
    this.make_sale = this.formBuilder.group({
      'product_id': [this.idProducto],
      'user_id': [localStorage.getItem('id')],
      'quantity': [''],
      'discount': [''],
      'total': [''],
      'status': [''],
      'payment_method': ['']
    })
  }

  sellProduct(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content_Type': 'application/x-wwww-form-urlencoded',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    }
    this.btn2 = true

    this.descuentoTotal = (this.pecioProducto * this.make_sale.get('quantity').value) * this.make_sale.get('quantity').value
    let datas = {
      'product_id': this.idProducto,
      'user_id': localStorage.getItem('id'),
      'quantity': this.make_sale.get('quantity').value,
      'discount': this.make_sale.get('discount').value,
      'total': (this.pecioProducto * this.make_sale.get('quantity').value)-this.descuentoTotal,
      'status': 1,
      'payment_method': this.make_sale.get('payment_method').value
    }

    this.api.hacerVenta(datas, httpOptions).subscribe(result =>{
      console.log(result)
    }, errro =>{
      console.log(errro)
    })
    
    let datos = {
      quantity: this.cantidadActual - this.make_sale.get('quantity').value
    }

    this.api.actualizarInventario(this.idProducto, datos, httpOptions).subscribe(result =>{
      console.log("Cantidades modificadas")
    }, error =>{
      console.log("error")
    })

    this.ngOnInit()

  }


}
