import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hospital } from 'src/app/models/hospital.model';
import { URL_SERVICIOS } from 'src/app/config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  url:string = URL_SERVICIOS
  constructor(public http:HttpClient, public userService:UsuarioService) { }

  cargarHospitales(desde:number = 0){
    return this.http.get(`${this.url}/hospital?desde=${desde}`)
  }

  obtenerHospital(id:string){
    let url = `${this.url}/hospital/${id}`
    return this.http.get(url)
    .pipe(
      map(
        (res:any)=>{
          return res.hospital
        }
      )
    )
  }

  borrarHospital(id:string){
    let id_hospital = id
    let token = this.userService.token
    let url = `${this.url}/hospital/${id_hospital}?token=${token}`
    return this.http.delete(url)
    .pipe(
      map(res=>{
        Swal.fire(
          'Eliminado!',
          'El hospital ha sido eliminado.',
          'success'
        )
      })
    )
  }

  crearHospital(nombre:string){
    let token = this.userService.token
    let url = `${this.url}/hospital?token=${token}`
     return this.http.post(url, {nombre: nombre})
     .pipe(
       map((res:any)=>{
        Swal.fire('Registrado correctamente: <br>' + res.hospital["nombre"])
       })
     )
  }

  buscarHospital(termino:string){
    let url = `${this.url}/busqueda/coleccion/hospitales/${termino}`
    return this.http.get(url)
    .pipe(
      map((res:any) => res.hospitales)
    )
  }

  actualizarHospital(hospital:Hospital){
    let id_hospital = hospital._id
    let token = this.userService.token
    let url = `${this.url}/hospital/${id_hospital}?token=${token}`
    return this.http.put(url, {nombre: hospital.nombre})
    .pipe(
      map(res=>{
        Swal.fire({
          title: 'Se actualizó correctamente',
          text: hospital.nombre,
          type: 'success',
          confirmButtonText: 'Aceptar'
        })  
        return true
      })
    )
  }
}
