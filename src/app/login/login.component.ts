import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../servicios/api.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form_login: FormGroup
  
  constructor(private formBuilder: FormBuilder, private api: ApiService, private route: Router) {
    this.form_login = this.formBuilder.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    })
   }

  ngOnInit() {
  }

  login(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content_Type': 'application/x-wwww-form-urlencoded',
        'Accept': 'application/json',
      })
    }
    this.api.loginUser(this.form_login.value, httpOptions).subscribe(result =>{
      console.log(result)
      if(result.token != null){
        localStorage.setItem('token', result.token)
        localStorage.setItem('rol', result.rol)
        localStorage.setItem('id', result.id)
        this.api.enviarNotificacion("Hola", "Hola").subscribe(resultado =>{
          console.log(resultado)
        }, error =>{
          console.log(error)
        })
        this.route.navigateByUrl("/inventory")
      }
    }, error =>{
      console.log(error)
    })
  }

}
