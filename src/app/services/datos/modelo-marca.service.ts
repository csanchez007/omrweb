import { Injectable } from '@angular/core';
import { URL_SERVIS } from '../../config/url.servicios';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ModeloMarcaService {

  constructor(private http: HttpClient, private router: Router) { }

  consultarModeloMarcaDatos() {
    return new Promise(
      resolve => {
        this.http.get(URL_SERVIS + 'servicios//servicios.php?getAllMMD')
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
