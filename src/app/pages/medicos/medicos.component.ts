import { Component, OnInit } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from 'src/app/services/medico/medico.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {
  medicos:Medico[] = []
  constructor(public medicoService:MedicoService) { }

  ngOnInit() {
    this.cargarMedicos()
  }
  cargarMedicos(){
    this.medicoService.cargarMedicos().subscribe(res=>{
      this.medicos = res
    })
  }
  
  buscarMedico(termino:string){
    if (termino.length <=0) {
      this.cargarMedicos()
      return
    }
    this.medicoService.buscarMedicos(termino).subscribe(medicos=>{
      this.medicos = medicos
    })
  }
  borrarMedico(medico:Medico){
    this.medicoService.borrarMedico(medico._id).subscribe(()=>{
      this.cargarMedicos()
    })
  }
 
}
