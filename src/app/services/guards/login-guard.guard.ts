import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  constructor(public userService:UsuarioService, public router:Router){

  }
  canActivate(){
    if (this.userService.estaLogueado()) {
      return true
    }else{
      this.router.navigate(["/login"])
      return false;

    }
    
  }
  
}
