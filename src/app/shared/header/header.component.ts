import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  usuario:Usuario
  constructor(public userService:UsuarioService, public router: Router) { }

  ngOnInit() {
    this.usuario = this.userService.usuario
  }
  buscar(termino){
    this.router.navigate(['/busqueda', termino])
  }
}
