import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {
  // es como para crear variables y asignar elementos del dom
  @ViewChild('txt', {static: false}) txt:ElementRef
  @Input() leyenda:string='Leyenda'
  @Input() porcentaje:number = 50
  @Output() cambioValor:EventEmitter<number> = new EventEmitter() 
  constructor() {

  }

  ngOnInit() {
  }
  onChange(newValue:number){
    console.log(newValue);
    this.cambioValor.emit(this.porcentaje)
    console.log(this.txt);
    
  }
  cambiar(valor){
    if (this.porcentaje >= 100 && valor > 0) {
      this.porcentaje = 100
      return
    }
    if (this.porcentaje <=0 && valor < 0) {
      this.porcentaje = 0
      return
    }
    this.porcentaje = this.porcentaje + valor
    this.cambioValor.emit(this.porcentaje)
  }

}
