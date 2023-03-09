import { Component, OnInit } from '@angular/core';
import { ReporteService } from '../../../services/informes/reporte.service';
import { DatosGeneralesService } from '../../../services/datos/datos-generales.service';

declare function loadTabla(id): any;

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html'
})
export class ReportesComponent implements OnInit {

  f = new Date();
  fecha = (this.pad(this.f.getDate(), 2) + '-' + this.pad((this.f.getMonth() + 1), 2) + '-' + this.f.getFullYear());
  fechaReporte: string;
  predefinido: any;
  detallesReport: any;
  urls: any;

  public datosGeneralesPatente: any;
  public cboPatente: string;
  constructor(private reporteService: ReporteService,
              private datosService:DatosGeneralesService) {
    this.limpiar();

    this.reporteService.consultPredefinido()
    .then(
      async data => {
        // tslint:disable-next-line:no-string-literal
        this.predefinido = data;
      });
    // LLAMAR TABLAS
      this.llamarTablaReporte();

      this.datosService.consultarPorDatosReporte()
      .then(
        async data => {
          this.datosGeneralesPatente = data;
        });
  }

  ngOnInit(): void {
  }

  llamarTablaReporte(){
    this.reporteService.consultServis()
    .then(
      async data => {
         console.log(data);
         this.detallesReport = data;
          await loadTabla('tblInfoReporte');
      });
  }
  // tslint:disable-next-line:ban-types
  pad(num: Number, size: Number): String {
    let s = num + '';
    while (s.length < size) { s = '0' + s; }
    return s;
  }

  limpiar() {
    const f = new Date();
    this.fechaReporte = f.getFullYear() + '-' + this.pad((f.getMonth() + 1), 2) + '-' +  this.pad(f.getDate(), 2);
  }

  llamarAlbumReporte(idReporte) {
    this.reporteService.consultarReporteUrl(idReporte)
    .then(
      async data => {
        console.log(data);
        // tslint:disable-next-line:no-string-literal
        this.urls = data;
      });
  }


}
