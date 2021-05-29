import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { NuevoUsuario } from '../modelos/nuevo-usuario';
import { Observable } from 'rxjs';
import { LoginUsuario } from '../modelos/login-usuario';
import { Jwtdto } from '../modelos/jwtdto';
const API_URL = environment.API_URL;
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( 
    private httpcliente: HttpClient,
    private router: Router,
    ) { }

    public nuevo(nuevoUsuario: NuevoUsuario): Observable<any>{
       return this.httpcliente.post<any>(API_URL + 'nuevo', nuevoUsuario);
    }

    public login(loginUsuario: LoginUsuario): Observable<Jwtdto>{
      return this.httpcliente.post<Jwtdto>(API_URL + 'login', loginUsuario);
   }

}
