import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FirebaseStorageService } from '../servicios/firebase-storage.service';
import { ApiService } from '../servicios/api.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  create_product: FormGroup

  public mensajeArchivo = 'No hay un archivo seleccionado';
  public datosFormulario = new FormData();
  public nombreArchivo = '';
  public URLPublica = '';
  public porcentaje = 0;
  public finalizado = false;

  productList:any = []

  constructor(private formBuilder: FormBuilder, private firebaseStorage: FirebaseStorageService, private api: ApiService, private route:Router) { }

  ngOnInit() {
    this.create_product = this.formBuilder.group({
      'code':  ['', Validators.required],
      'name': ['', Validators.required],
      'description': ['', Validators.required],
      'archivo': [null, Validators.required],
      'price': ["", Validators.required],
      'tax': ["", Validators.required],
      'quantity': ["", Validators.required],

    })

    const httpOptions = {
      headers: new HttpHeaders({
        'Content_Type': 'application/x-wwww-form-urlencoded',
        'Accept': 'application/json',
        'Authorization': 'Bearer '+ localStorage.getItem('token')
      })
    }

    this.api.obtenerTodoProducto(httpOptions).subscribe(result =>{
      this.productList = result
    },error =>{
      console.log(error)
    })
  }

  //Sube el archivo a Cloud Storage
  public guardar() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content_Type': 'application/x-wwww-form-urlencoded',
        'Accept': 'application/json',
        'Authorization': 'Bearer '+ localStorage.getItem('token')
      })
    } 

    let archivo = this.datosFormulario.get('archivo');
    let referencia = this.firebaseStorage.referenciaCloudStorage(this.nombreArchivo);
    let tarea = this.firebaseStorage.tareaCloudStorage(this.nombreArchivo, archivo);

    //Cambia el porcentaje
    tarea.percentageChanges().subscribe((porcentaje) => {
      this.porcentaje = Math.round(porcentaje);
      if (this.porcentaje == 100) {
        this.finalizado = true;
      }
    },error =>{
      console.log("error")
    });

    referencia.getDownloadURL().subscribe((URL) => {
      this.URLPublica = URL;
      const datos = {
        code: this.create_product.get('code').value,
        name: this.create_product.get('name').value,
        description: this.create_product.get('description').value,
        quantity: this.create_product.get('quantity').value,
        price: this.create_product.get('price').value,
        tax: this.create_product.get('tax').value,
        image_url: this.URLPublica,
        user_id: localStorage.getItem('id')
      }

      this.api.crearProducto(datos, httpOptions).subscribe(result =>{
        console.log(result)
      }, error =>{
        console.log(error)
      }) 
    },error =>{
      console.log(error)
    });
  }

  public cambioArchivo(event) {
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

  eliminar(id:any){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content_Type': 'application/x-wwww-form-urlencoded',
        'Accept': 'application/json',
        'Authorization': 'Bearer '+ localStorage.getItem('token')
      })
    } 
    this.api.eliminarProducto(id, httpOptions).subscribe(result =>{
      console.log(result)
    }, error =>{
      console.log(error)
    })
  }

  verInventario(){
    this.route.navigateByUrl("/inventory")
  }

}
