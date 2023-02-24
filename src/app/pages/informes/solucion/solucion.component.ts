import { Component, OnInit } from '@angular/core';
import { ReporteService } from '../../../services/informes/reporte.service';

declare function loadTabla(id): any;


@Component({
  selector: 'app-solucion',
  templateUrl: './solucion.component.html'
})
export class SolucionComponent implements OnInit {

  f = new Date();
  fecha = (this.pad(this.f.getDate(), 2) + '-' + this.pad((this.f.getMonth() + 1), 2) + '-' + this.f.getFullYear());
  public fechaDesde: string;
  public fechaHata: string;
  predefinido: any;
  detallesSolucion: any;
  urls: any;

  public idReporte: number;
  public usuario: string;
  public descripcion: string;
  public cboPredefinido: number;
  public txtNumUnidad: string;

  constructor(private reporteService: ReporteService) {
    this.cboPredefinido = 0;
    this.limpiar();

    this.reporteService.consultServis()
    .then(
      async data => {
        // tslint:disable-next-line:no-string-literal
        this.predefinido = data;
      });
    // LLAMAR TABLAS
    this.llamarTablaSolucion();
  }

  ngOnInit(): void {

  }
  llamarReportePorId(){
    this.reporteService.consultarPorReporte(this.cboPredefinido)
    .then(
      async data => {
         console.log(data);
         this.txtNumUnidad = data[0]['unidad'];
      });
  }

  llamarTablaSolucion(){
    this.reporteService.detalleSolcion()
    .then(
      async data => {
         console.log(data);
         this.detallesSolucion = data;
          await loadTabla('tblInfoSolucion');
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
    this.fechaDesde = f.getFullYear() + '-' + this.pad((f.getMonth() + 1), 2) + '-' +  this.pad(f.getDate(), 2);
    this.fechaHata = f.getFullYear() + '-' + this.pad((f.getMonth() + 1), 2) + '-' +  this.pad(f.getDate(), 2);
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


  // Enviar Reporte
  async SolucionAdd() {

    this.reporteService.enviarSolucionAdd(
     // this.usuario,
      this.idReporte,
      this.fechaDesde,
      this.fechaHata,
      this.descripcion
      //this.urlImage,
      //this.post.coords
      )
      .then(
        async data => {
          console.log(data);
          // this.enviarNotReporte(this.reporte);
        //  this.limpiarCampos();
          //this.irSolucionFoto();
        }
      )
      .catch(
        error => {
          console.log(error + 'no se pudo insertar datos');
        }
      );
  }
}
