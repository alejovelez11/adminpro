import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  usuarios:Usuario[] = []
  desde:number = 0
  totalRegistros = 0
  cargando:boolean = true
  constructor(public userService:UsuarioService) { }

  ngOnInit() {
    this.cargarUsuarios()
  }
  cargarUsuarios(){
    this.cargando = true
    this.userService.cargarUsuarios(this.desde).subscribe((res:any)=>{
      console.log(res);
      this.totalRegistros = res.total
      this.usuarios = res.usuarios
      this.cargando = false
    })
  }
  cambiarDesde(valor:number){
    let desde = this.desde + valor
    if (desde>=this.totalRegistros) {
      return
    }
    if (desde<0) {
        return
    }
    this.desde +=valor
    this.cargarUsuarios()
  }

  buscarUsuario(termino:string){
    if (termino.length<=0) {
      this.cargarUsuarios()
      return
    }
    this.cargando = true
     this.userService.buscarUsuario(termino).subscribe((usuarios:Usuario[])=>{
       this.usuarios = usuarios
       this.cargando = false
     })
    
  }
  borrarUsuario(usuario:Usuario){
    if (usuario._id === this.userService.usuario._id) {
      Swal.fire({
        title: 'No se puede borrar a si mismo',
        type: 'error',
        confirmButtonText: 'Aceptar'
      })
      return  
    }
    Swal.fire({
      title: 'Estas Seguro?',
      text: `Estas apunto de borrar a ${usuario.nombre}`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar'
    }).then((borrar) => {
      if (borrar) {
        this.userService.borrarUsuario(usuario._id).subscribe(res=>{
  
          this.cargarUsuarios()
        })
      }
    })
  
  }
  guardarUsuario(usuario:Usuario){
    this.userService.actualizarUsuario(usuario).subscribe()
  }

}
