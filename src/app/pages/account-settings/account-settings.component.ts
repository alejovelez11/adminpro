import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SettingsService } from 'src/app/services/settings/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {
  // con este inject accedo a completamente a todo el DOM y lo simbolizo con la variable _document
  constructor(@Inject(DOCUMENT) private _document, public ajustes:SettingsService) { }

  ngOnInit() {
    this.colocarCheck()
  }
  cambiaColor(tema:string, link:any){
    this.aplicarCheck(link)
    this.ajustes.aplicarTema(tema)
  }
    
  aplicarCheck(link:any){
    let selectores:any = document.getElementsByClassName("selector")
    for (const ref of selectores) {
      ref.classList.remove("working")
    }

    link.classList.add("working")
  }
  colocarCheck(){
    let selectores:any = document.getElementsByClassName("selector")
    let tema = this.ajustes.ajustes.tema
    for (const ref of selectores) {
      if (ref.getAttribute("data-theme") == tema) {
        ref.classList.add("working")
        break
      }
    }
  }
}
