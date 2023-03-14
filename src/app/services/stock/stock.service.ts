import { Injectable } from '@angular/core';
import { URL_SERVIS } from '../../config/url.servicios';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient, private router: Router) { }
  // ==============================================================
  // CONSULTA TODOS EL STOCK
  // ==============================================================
  consultTodoStock(tipo) {
    return new Promise(
      resolve => {
        this.http.get(URL_SERVIS + 'servicios/stock.php?tipo=' + tipo + '&getAllStock')
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
  // INSERTAR STOCK
  // ==============================================================
  addStock(datos) {
    const body = JSON.stringify(datos);
    return new Promise(
      resolve => {
        this.http.post(URL_SERVIS + 'servicios/stock.php?newstock', body)
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
  consultPorStock(id, tipo) {
    return new Promise(
      resolve => {
        this.http.get(URL_SERVIS + 'servicios/stock.php?id=' + id +'&tipo=' + tipo + '&consultaPorStock')
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
  stockUpdate(datos) {
    const body = JSON.stringify(datos);
    return new Promise(
      resolve => {
        this.http.post(URL_SERVIS + 'servicios/stock.php?upadateStock', body)
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
  // DELETE STOCK
  // ==============================================================
  deleteStock(id) {
    return new Promise(
      resolve => {
        this.http.get(URL_SERVIS + 'servicios/stock.php?id=' + id + '&deleteStock')
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
