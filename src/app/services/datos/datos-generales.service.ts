import { Injectable } from '@angular/core';
import { URL_SERVIS } from '../../config/url.servicios';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DatosGeneralesService {

  constructor(private http: HttpClient, private router: Router) { }

  // ==============================================================
  // CONSULTA TODOS LOS DATOS GENERALES
  // ==============================================================
  consultarPorDatosReporte() {
    return new Promise(
      resolve => {
        this.http.get(URL_SERVIS + '/omrservice/servicios/datos.php?getAllDatos')
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
  // INSERTAR DATOS GENERALES
  // ==============================================================
  datosGralAdd(datos) {
    const body = JSON.stringify(datos);
    return new Promise(
      resolve => {
        this.http.post(URL_SERVIS + 'omrservice/servicios/datos.php?addDatos', body)
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
  // CONSULTA DE POR DATO GRAL.
  // ==============================================================
  consultPorDatoGral(id) {
    return new Promise(
      resolve => {
        this.http.get(URL_SERVIS + 'omrservice/servicios/datos.php?id=' + id + '&getOneDatosGral')
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
  // UPDATE DATOS GENERALES
  // ==============================================================
  datosGralUpdate(datos) {
    const body = JSON.stringify(datos);
    return new Promise(
      resolve => {
        this.http.post(URL_SERVIS + 'omrservice/servicios/datos.php?updateDatos', body)
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
  // DELETE DE POR DATO GRAL.
  // ==============================================================
  deletePorDatoGral(id) {
    return new Promise(
      resolve => {
        this.http.get(URL_SERVIS + 'omrservice/servicios/datos.php?id=' + id + '&deleteDatosGral')
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

