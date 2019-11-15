import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  usuario: Usuario;

  constructor(public sidebarService:SidebarService, public userService:UsuarioService) { }

  ngOnInit() {
    this.usuario = this.userService.usuario;
    this.sidebarService.cargarMenu()
  }

}
