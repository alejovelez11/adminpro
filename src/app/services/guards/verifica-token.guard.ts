import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {
  constructor(public _usuarioService:UsuarioService){
        
  }
  canActivate() : Promise<boolean> | boolean {
    console.log("verifica token");
    let token = this._usuarioService.token
    let payload = JSON.parse(atob(token.split(".")[1]))
    let expirado = this.expirado(payload.exp)
    if (expirado) {
      return false
    }  
    
    return true;
  }
  expirado(fechaExp:number){
    let ahora = new Date().getTime() / 1000
    if (fechaExp < ahora) {
      return true
    } else {
      return false
    }
  }
}
