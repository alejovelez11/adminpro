import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
 
  usuario: Usuario;

  imagenSubir: File;
  imagenTemp: any;

  constructor(public _usuarioService:UsuarioService) {
    this.usuario = this._usuarioService.usuario;
   }

  ngOnInit() {
  }
  guardar( usuario: Usuario ) {

    this.usuario.nombre = usuario.nombre;
    this.usuario.correo = usuario.correo;
    if ( !this.usuario.google ) {
      this.usuario.correo = usuario.correo;
    }
  // console.log(usuario);
  // console.log(this.usuario);
  
    this._usuarioService.actualizarUsuario( this.usuario )
                .subscribe();

  }
  seleccionImage( archivo: File ) {

    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0 ) {
      // swal('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result;

  }

 
  cambiarImagen() {

    this._usuarioService.cambiarImagen( this.imagenSubir, this.usuario._id );

  }
}
