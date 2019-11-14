import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { ApiService } from '../servicios/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  register: FormGroup

  constructor(private formBuilder: FormBuilder, private api: ApiService, private route: Router) { }

  ngOnInit() {
    this.register = this.formBuilder.group({
      'username': ['', Validators.required],
      'email': ['', Validators.required],
      'password': ['', Validators.required],
      'rol': ['2', Validators.required]
    })
  }

  registrar(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content_Type': 'application/x-wwww-form-urlencoded',
        'Accept': 'application/json',
      })
    }

    this.api.registrarse(this.register.value, httpOptions).subscribe(result =>{
      console.log(result)
      localStorage.setItem("token", result.token)
      localStorage.setItem("rol", result.rol)
      this.route.navigateByUrl("/inventory")
    }, error=>{
      console.log(error)
    })
  }

}
