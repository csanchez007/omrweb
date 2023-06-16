import { Injectable } from '@angular/core';
import { URL_SERVIS } from '../../config/url.servicios';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  // user = localStorage.getItem('usuario');
  user = '310';

  constructor(private http: HttpClient, private router: Router) { }

  // ==============================================================
  // CONSULTA TODOS LOS USUARIOS
  // ==============================================================
  consultPredefinido() {
    return new Promise(
      resolve => {
        this.http.get(URL_SERVIS + 'servicios/usuarios.php?consultaPredefinido')
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
        this.http.get(URL_SERVIS + 'servicios/servicios.php?user=' + this.user + '&getAllServicios')
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
        this.http.get(URL_SERVIS + 'servicios/servicios.php?idReporte=' + idReporte + '&getOneServiciosFotos')
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
  // CONSULTA FOTO POR SOLUCIONADO
  // ==============================================================
  consultarSolucionadoUrl(idReporte) {
    return new Promise(
      resolve => {
        this.http.get(URL_SERVIS + 'servicios/servicios.php?idSolucion=' + idReporte + '&getOneSolucionFotos')
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
  // CONSULTA UNO DE LOS REPORTES
  // ==============================================================
  consultarPorReporte(idReporte) {
    return new Promise(
      resolve => {
        this.http.get(URL_SERVIS + 'servicios/servicios.php?idReporte=' + idReporte + '&getOneServicios')
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
  // UPDATE REV REOIRTE
  // ==============================================================
  reporteUpdate(datos) {
    const body = JSON.stringify(datos);
    return new Promise(
      resolve => {
        this.http.post(URL_SERVIS + 'servicios/servicios.php?updateReporte', body)
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
  // CONSULTA TODOS LOS SERVICIOS DE SOLUCION
  // ==============================================================
  detalleSolcion() {
    return new Promise(
      resolve => {
        this.http.get(URL_SERVIS + 'servicios/servicios.php?user=' + this.user + '&getAllSolucion')
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
  // CONSULTA UNO DE LAS SOLUCIONES
  // ==============================================================
  consultarPorSolucion(idSoluion) {
    return new Promise(
      resolve => {
        this.http.get(URL_SERVIS + 'servicios/servicios.php?idReporte=' + idSoluion + '&getOneSolucion')
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
      usuario: this.user,// localStorage.getItem('usuario'),
      reporte,
      desde,
      hasta,
      descripcion,
     // rutaFoto: urlImage,
      usuario_crea:  this.user,
     // coords
    };
    const body = JSON.stringify(datos);
    return new Promise(
      resolve => {
        this.http.post(URL_SERVIS + 'servicios/usuarios.php?nuevoSolucionpos', body)
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
  // UPDATE SOLUCION
  // ==============================================================
  solucionEditData(datos) {
    const body = JSON.stringify(datos);
    return new Promise(
      resolve => {
        this.http.post(URL_SERVIS + 'servicios/usuarios.php?updateSolucion', body)
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
  // GUARDAR DOCUMENTOS
  // ==============================================================
  insertarDocService(datos) {
    const body = JSON.stringify(datos);
    return new Promise(
      resolve => {
        this.http.post(URL_SERVIS + 'servicios/servicios.php?addDoc', body)
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
  consultaAllDoc(){
    return new Promise(
      resolve => {
        this.http.get(URL_SERVIS + 'servicios/servicios.php?getAllDOC')
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
  // CONSULTA UNO DE LAS SOLUCIONES
  // ==============================================================
  consultarPoDoc(id) {
    return new Promise(
      resolve => {
        this.http.get(URL_SERVIS + 'servicios/servicios.php?id=' + id + '&getOneDocument')
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
