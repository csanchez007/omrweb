import { Injectable } from '@angular/core';
import { URL_SERVIS } from '../../config/url.servicios';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class RevisionTecnicaService {

  constructor(private http: HttpClient, private router: Router) { }

  // ==============================================================
  // CONSULTA TODOS LOS DATOS GENERALES
  // ==============================================================
  consultarRevTecnica() {
    return new Promise(
      resolve => {
        this.http.get(URL_SERVIS + 'servicios/rev_tecnica.php?getAllrevTec')
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

  // ==============================================================
  // INSERTAR REV TECNICA
  // ==============================================================
    revTecnicaAdd(datos) {
    const body = JSON.stringify(datos);
    return new Promise(
      resolve => {
        this.http.post(URL_SERVIS + 'servicios/rev_tecnica.php?addDatosRevTec', body)
          .subscribe(
            data => {
              resolve(data);
            },
            err => {
              console.log(err);
            });
      }
    );
  }

  // ==============================================================
  // CONSULTA DE REV TECNICA POR ID
  // ==============================================================
  consultPorRevTec(id) {
    return new Promise(
      resolve => {
        this.http.get(URL_SERVIS + 'servicios/rev_tecnica.php?id=' + id + '&getOneRevTec')
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

  // ==============================================================
  // UPDATE REV TECNICA
  // ==============================================================
  datosRevTecUpdate(datos) {
    const body = JSON.stringify(datos);
    return new Promise(
      resolve => {
        this.http.post(URL_SERVIS + 'servicios/rev_tecnica.php?updateRevTec', body)
          .subscribe(
            data => {
              resolve(data);
            },
            err => {
              console.log(err);
            });
      }
    );
  }
  // ==============================================================
  // DELETE REV TECNICA
  // ==============================================================
  deleteRevTec(id) {
    return new Promise(
      resolve => {
        this.http.get(URL_SERVIS + 'servicios/rev_tecnica.php?id=' + id + '&deleteRevTec')
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

