import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map, catchError } from "rxjs/operators";
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { ArchivoImagenService } from '../subir-archivo/archivo-imagen.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario:Usuario
  token:string
  menu:any = []
  constructor(public http:HttpClient, public router:Router, public subirArchivo:ArchivoImagenService) { 
    this.cargarStorage() 
  }
  
  renuevaToken(){
    let url = `${URL_SERVICIOS}/login/renuevatoken?token=${this.token}`
    return this.http.get(url)
    .pipe(
      map((res:any)=>{
        this.token = res.token
        localStorage.setItem("token", this.token)
          return true
      },catchError(err=>{
        this.router.navigate(["/login"])
        Swal.fire({
          title: 'No se pudo renovar token',
          type: 'error',
          confirmButtonText: 'Aceptar'
        })
        return Observable.throw(err)
      }))
    )
  }

  // Esta funcion es para comprobar si el usuario esta logueado o no...
  // funcion para el guard
  estaLogueado(){
    return(this.token.length > 5) ? true : false
  }
// Aqui guardo la informacion cuando el logueo se hizo exitosamente
  guardarStorage(id:string, token:string, usuario:Usuario, menu:any){
    localStorage.setItem("id", id)
    localStorage.setItem("token", token)
    localStorage.setItem("usuario", JSON.stringify(usuario))
    localStorage.setItem("menu", JSON.stringify(menu))
    this.usuario = usuario
    this.token = token
    this.menu = menu
  }
  // Esta funcion es para cuando se borre los
  // valores de localStorage por alguna razon y debido a eso se tiene setear 
  // las variables de token y usuario
  // para no romper el codigo
  cargarStorage(){
    if (localStorage.getItem("token")) {
      this.token = localStorage.getItem("token")
      this.usuario = JSON.parse(localStorage.getItem("usuario"))
      this.menu = JSON.parse(localStorage.getItem("menu"))
    }else{
      this.token = ""
      this.usuario = null
      this.menu = []
    }
  }
  // funcion de logueo, recibo los datos de autenticacion y los mando al servicio
  login(usuario:Usuario){  
     let url = URL_SERVICIOS + '/login' 
     return this.http.post(url, usuario)
                      .pipe(
                        map((res:any) => {
                           this.guardarStorage(res.id, res.token, res.usuario, res.menu)
                        })
                      )
  }
// funcion para crear usuarios
  crearUsuario(usuario:Usuario){
    let url = URL_SERVICIOS + '/usuario'
    return this.http.post(url, usuario)
    .pipe(
      map((resp:any) => {
        Swal.fire({
          title: 'Se creó correctamente',
          text: usuario.correo,
          type: 'success',
          confirmButtonText: 'Aceptar'
        })
        return resp.usuario
      })
    )
  }
  
  logout(){
    this.token = ""
    this.usuario = null
    this.menu = []
    localStorage.removeItem("token")
    localStorage.removeItem("usuario")
    localStorage.removeItem("menu")
    this.router.navigate(["/login"])
  }

  actualizarUsuario(usuario:Usuario){
    let url = URL_SERVICIOS+"/usuario/"+usuario._id
    url+="?token=" + this.token
    return this.http.put(url, usuario)
    .pipe(
      map((res:any)=>{
        if (usuario._id === this.usuario._id) {
          let usuarioDB:Usuario = res.usuario
          this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu)
        }
        Swal.fire({
          title: 'Se actualizó correctamente',
          text: usuario.nombre,
          type: 'success',
          confirmButtonText: 'Aceptar'
        })  
        return true
      })
    )
  }

  cambiarImagen( archivo: File, id: string ) {
    this.subirArchivo.subirArchivo(archivo, 'usuarios', id).then((res:any) => {
      console.log(res)
      this.usuario.img = res.usuario.img
      this.guardarStorage( id, this.token, this.usuario, this.menu);
    }).catch(res=>{
      console.log(res)
    })
  }
  // cargo los usuarios poniendole un limite para la paginacion
  cargarUsuarios(desde:number = 0){
    let url = `${URL_SERVICIOS}/usuario?desde=${desde}`
    return this.http.get(url)
  }
  // funcion para buscar un usuario
  buscarUsuario(termino:string){
    let url = `${URL_SERVICIOS}/busqueda/coleccion/usuarios/${termino}`
    return this.http.get(url)
    .pipe(
      map((res:any) => res.usuarios)
    )
    
  }
  // funcion para borrar un usuario
  borrarUsuario(id:string){
    let url = `${URL_SERVICIOS}/usuario/${id}?token=${this.token}`
    return this.http.delete(url)
    .pipe(
      map(res=>{
        Swal.fire({
          title: 'Se borró correctamente',
          type: 'success',
          confirmButtonText: 'Aceptar'
        })
        return true  
      })
    )
  }
}
