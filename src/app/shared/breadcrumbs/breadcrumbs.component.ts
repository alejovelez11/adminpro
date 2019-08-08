import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {
  titulo:string
  constructor(private router:Router, private title:Title, private meta:Meta) { 
    this.getDataRouter()
    .subscribe(e=>{
      this.titulo = e.titulo

      // para poner el titulo de la ventana del navegador de forma dinamica
      this.title.setTitle(this.titulo)
      const metaTag:MetaDefinition={
        name:'descripcion',
        content:this.titulo
      }
      this.meta.updateTag(metaTag)
    })
  }

  ngOnInit() {
  }
  getDataRouter(){
    // events pendings for to investigate
    return this.router.events.pipe(
      filter(e => e instanceof ActivationEnd),
      filter((e:ActivationEnd) => e.snapshot.firstChild === null),
      map((e:ActivationEnd) => e.snapshot.data)
    )
    
  }

}
