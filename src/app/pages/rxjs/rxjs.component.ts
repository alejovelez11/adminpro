import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {
  suscripcion:Subscription
  constructor() { 

    this.suscripcion = this.regresaObservable().subscribe(
      num => console.log(`sub ${num}`),
      err => console.log(`Error ${err}`),
      () => console.log(`Se terminó!`)
      )
  }

  ngOnInit() {
  }
  ngOnDestroy(){
    this.suscripcion.unsubscribe()
  }
  regresaObservable():Observable<any>{
    return new Observable((observer:Subscriber<any>)=>{
      let contador = 0
      let intervalo = setInterval(()=>{
        contador++
        const salida = {
          valor:contador
        }
        observer.next(salida)
        // if (contador === 3) {
        //   clearInterval(intervalo)
        //   observer.complete()
        // }
        // if (contador === 2) {
        //   // clearInterval(intervalo)
        //   observer.error("Error")
        // }
      }, 1000)
    }).pipe(
      map(resp=>{
        return resp.valor
      })
    )
  
  }

}
