import { Injectable } from '@angular/core';
import { URL_SERVIS } from '../../config/url.servicios';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DatosMovilService {

  constructor(private http: HttpClient, private router: Router) { }

  // ==============================================================
  // CONSULTA DE POR DATO MÓVIL
  // ==============================================================
  consultPorDatoMovil() {
    return new Promise(
      resolve => {
        this.http.get(URL_SERVIS + 'servicios/datos_movil.php?getAllDatosMovil')
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
  datosMovilAdd(datos) {
    const body = JSON.stringify(datos);
    return new Promise(
      resolve => {
        this.http.post(URL_SERVIS + 'servicios/datos_movil.php?addDatosMovil', body)
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
  // CONSULTA TODOS LOS DATOS GENERALES DEL MÓVIL POR ID
  // ==============================================================
  consultarDatosMovilID(id) {
    return new Promise(
      resolve => {
        this.http.get(URL_SERVIS + 'servicios/datos_movil.php?id=' + id + '&getAllDatosMovilId')
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
  datosMovilEdit(datos) {
    const body = JSON.stringify(datos);
    return new Promise(
      resolve => {
        this.http.post(URL_SERVIS + 'servicios/datos_movil.php?updateDatos', body)
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
  // DELETE DE POR DATO MOVIL
  // ==============================================================
  deletePorDatoMovil(id) {
    return new Promise(
      resolve => {
        this.http.get(URL_SERVIS + 'servicios/datos_movil.php?id=' + id + '&deleteDatosMovil')
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
