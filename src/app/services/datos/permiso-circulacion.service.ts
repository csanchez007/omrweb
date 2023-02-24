import { Injectable } from '@angular/core';
import { URL_SERVIS } from '../../config/url.servicios';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class PermisoCirculacionService {

  constructor(private http: HttpClient, private router: Router) { }

  // ==============================================================
  // CONSULTA TODOS LOS DATOS GENERALES
  // ==============================================================
  consultarPerCir() {
    return new Promise(
      resolve => {
        this.http.get(URL_SERVIS + '/omrservice/servicios/per_circulacion.php?getAllPerCir')
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
  perCirAdd(datos) {
    const body = JSON.stringify(datos);
    return new Promise(
      resolve => {
        this.http.post(URL_SERVIS + 'omrservice/servicios/per_circulacion.php?addDatosPerCir', body)
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
  consultPorPerCir(id) {
    return new Promise(
      resolve => {
        this.http.get(URL_SERVIS + 'omrservice/servicios/per_circulacion.php?id=' + id + '&getOnePerCir')
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
  datosPerCirUpdate(datos) {
    const body = JSON.stringify(datos);
    return new Promise(
      resolve => {
        this.http.post(URL_SERVIS + 'omrservice/servicios/per_circulacion.php?updatePerCir', body)
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
  deletePerCir(id) {
    return new Promise(
      resolve => {
        this.http.get(URL_SERVIS + 'omrservice/servicios/per_circulacion.php?id=' + id + '&deletePerCir')
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

