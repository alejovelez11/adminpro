import { Component, OnInit } from '@angular/core';
import { HospitalService } from 'src/app/services/hospital/hospital.service';
import { Hospital } from 'src/app/models/hospital.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit {
  hospitales:Hospital[] = []
  totalHospitales:number = 0
  cargando:boolean = true
  desde:number = 0
  constructor(public hospitalService:HospitalService) { }

  ngOnInit() {
    this.cargarHospitales()
  }

  cargarHospitales(){
    this.cargando = true
    this.hospitalService.cargarHospitales(this.desde).subscribe((res:any)=>{
      this.hospitales = res["hospitales"]
      this.totalHospitales = res["total"]
      this.cargando = false
    })
  }
  cambiarDesde(valor:number){
    let desde = this.desde + valor
    if (desde>=this.totalHospitales) {
      return
    }
    if (desde<0) {
        return
    }
    this.desde +=valor
    this.cargarHospitales()
  }

  async registrarHospital(){
    const { value: hospital } = await Swal.fire({
      title: 'Nombre del hospital',
      input: 'text',
      inputPlaceholder: 'Ingresa el nombre del hospital'
    })
    if (hospital) {
      this.hospitalService.crearHospital(hospital).subscribe(res=>{
        this.cargarHospitales()
      })
    }

  }

  borrarHospital(hospital:Hospital){
    Swal.fire({
      title: 'Estas seguro?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result) {
        this.hospitalService.borrarHospital(hospital._id).subscribe(res=>{
          this.cargarHospitales()
        })
      }
    })
  }
  buscarHospital(termino:string){
    if (termino.length <= 0) {
      this.cargarHospitales()
      return
    }
    this.hospitalService.buscarHospital(termino).subscribe((res:any) => {
      this.hospitales = res
    })
  }

  actualizarHospital(hospital:Hospital){
    this.hospitalService.actualizarHospital(hospital).subscribe()
  }
}
