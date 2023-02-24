import { Injectable } from '@angular/core';
import { URL_SERVIS } from '../../config/url.servicios';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  // usser = localStorage.getItem('usuario');
  usser = '1-9';

  constructor(private http: HttpClient, private router: Router) { }

  // ==============================================================
  // CONSULTA TODOS LOS USUARIOS
  // ==============================================================
  consultPredefinido() {
    return new Promise(
      resolve => {
        this.http.get(URL_SERVIS + '/omrservice/servicios/usuarios.php?consultaPredefinido')
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
  consultServis(){
    return new Promise(
      resolve => {
        this.http.get(URL_SERVIS + '/omrservice/servicios/servicios.php?usser=' + this.usser + '&getAllServicios')
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
  // CONSULTA FOTO POR REPORTE
  // ==============================================================
  consultarReporteUrl(idReporte) {
    return new Promise(
      resolve => {
        this.http.get(URL_SERVIS + '/omrservice/servicios/servicios.php?idReporte=' + idReporte + '&getOneServiciosFotos')
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
  // CONSULTA UNO DE LOS SERVICIOS
  // ==============================================================
  consultarPorReporte(idReporte) {
    return new Promise(
      resolve => {
        this.http.get(URL_SERVIS + '/omrservice/servicios/servicios.php?idReporte=' + idReporte + '&getOneServicios')
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
  // CONSULTA TODOS LOS SERVICIOS DE SOLUCION
  // ==============================================================
  detalleSolcion() {
    return new Promise(
      resolve => {
        this.http.get(URL_SERVIS + '/omrservice/servicios/servicios.php?usser=' + this.usser + '&getAllSolucion')
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
  // REGISTRO DE  REPORTES SOLUCION
  // ==============================================================
  enviarSolucionAdd( reporte, desde, hasta, descripcion/*, urlImage, coords*/) {
    //this.setrRUTvarFoto(usuario);
    const datos = {
      usuario: this.usser,// localStorage.getItem('usuario'),
      reporte,
      desde,
      hasta,
      descripcion,
     // rutaFoto: urlImage,
      usuario_crea:  this.usser,
     // coords
    };
    const body = JSON.stringify(datos);
    return new Promise(
      resolve => {
        this.http.post(URL_SERVIS + '/omrservice/servicios/usuarios.php?nuevoSolucionpos', body)
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
}
