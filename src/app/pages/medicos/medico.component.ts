import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { MedicoService } from 'src/app/services/medico/medico.service';
import { HospitalService } from 'src/app/services/hospital/hospital.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Medico } from 'src/app/models/medico.model';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');

  constructor(
    public _medicoService: MedicoService,
    public _hospitalService: HospitalService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.params.subscribe(p=>{
      let id = p["id"]
      if (id!== "nuevo") {
        this.cargarMedico(id)
      }
    })
  }

  ngOnInit() {
    this._hospitalService.cargarHospitales()
          .subscribe( (hospitales:any) => {
            this.hospitales = hospitales.hospitales ;
          })
  }

  cargarMedico( id: string ) {
    this._medicoService.cargarMedico( id )
          .subscribe( medico => {
            this.medico = medico;
            this.medico.hospital = medico.hospital._id;
            this.cambioHospital( this.medico.hospital );
          });
  }

  guardarMedico( f: NgForm ) {
    if ( f.invalid ) {
      return;
    }
    this._medicoService.guardarMedico( this.medico )
            .subscribe( medico => {
              this.medico._id = medico._id;
              this.router.navigate(['/medico', medico._id ]);
            });

  }

  cambioHospital( id: string ) {
    this._hospitalService.obtenerHospital( id )
          .subscribe( hospital => this.hospital = hospital );
  }



}
