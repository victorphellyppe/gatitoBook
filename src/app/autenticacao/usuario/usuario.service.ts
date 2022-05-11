import { TokenService } from './../token.service';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { Usuario } from './usuario';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuarioSubject = new BehaviorSubject<Usuario>({});

  constructor(private tokenSvc: TokenService) {
    if(this.tokenSvc.possuiToken()){
      this.decodificaJWT();
    }
   }

  private decodificaJWT() {
    const token = this.tokenSvc.retornaToken();
    const usuario = jwt_decode(token) as Usuario;

    this.usuarioSubject.next(usuario);
  }

  retornaUsuario(){
    return this.usuarioSubject.asObservable();
  }

  logout(){
    this.tokenSvc.excluiToken();
    this.usuarioSubject.next({});
  }

  estaLogado(){
    return this.tokenSvc.possuiToken();
  }

  salvaToken(token: string){
    this.tokenSvc.salvaToken(token);
    this.decodificaJWT();
  }
}
