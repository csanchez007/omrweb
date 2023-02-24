import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVIS } from '../../config/url.servicios';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient, private router: Router) { }

  // ==============================================================
  // CONSULTA TODOS LOS USUARIOS
  // ==============================================================
  consultarAllUser() {
    return new Promise(
      resolve => {
        this.http.get(URL_SERVIS + '/omrservice/servicios/usuarios.php?getAll')
          .subscribe(
            data => {
              resolve(data);
            },
            err => {
              console.log(err);
            }
          );
      }
    );
  }
}
