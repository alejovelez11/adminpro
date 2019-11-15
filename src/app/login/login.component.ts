import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';
// declare function init_plugins();
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form:FormGroup
  
  constructor(public _usuarioService:UsuarioService, public router:Router) { }

  ngOnInit() {
     this.form = new FormGroup({
       correo: new FormControl(null, [Validators.required, Validators.email]),
       password: new FormControl(null, Validators.required),
     })

  }
  login(form){
    let usuario = new Usuario(
      null,
      this.form.value.correo,
      this.form.value.password
    )
    
    this._usuarioService.login(usuario)
                        .subscribe(res => {
                          this.router.navigate(["/dashboard"])
                        })
  }

}
