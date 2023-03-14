import { Component, OnInit } from '@angular/core';
import { ReporteService } from '../../../services/informes/reporte.service';
import Swal from 'sweetalert2';

declare function loadTabla(id): any;
declare var $:any;


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
  public cboPredefinido: string;
  public txtNumUnidad: string;
  public txtDescripcion: string;

  public definidoSelctId: number;
  public definidoSelectText: string;

  public DescripcionRS: string

  public idEditar = '0';

  constructor(private reporteService: ReporteService) {
    this.cboPredefinido = "0";
    this.definidoSelctId = 0;
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
  // ==============================================================
  // CONSULTA UNO DE LOS REPORTES
  // ==============================================================
  llamarReportePorId(){
    this.reporteService.consultarPorReporte(this.cboPredefinido)
    .then(
      async data => {
         console.log(data);
         this.txtNumUnidad = data['numPatente'];
      });
  }
  // ==============================================================
  // CONSULTA TODOS LOS SERVICIOS DE SOLUCION
  // ==============================================================
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
  // ==============================================================
  // CONSULTA UNO DE LAS SOLUCIONES
  // ==============================================================
  llamarSolucionPorId(idSoluion){
    this.reporteService.consultarPorSolucion(idSoluion)
    .then(
      async data => {

         this.txtDescripcion = data[0]['descripcion'];
         this.fechaDesde = data[0]['desde'];
         this.fechaHata = data[0]['hasta'];
         this.idEditar = data[0]['id'];
         this.llamarReportePorIdSolucionados(data[0]['idReporte'])

      });
  }
  // ================================================================
  // CONSULTA UNO DE LOS REPORTES YA SOLUCIONADO OBTENGO LA PANTENTE
  // ================================================================
  llamarReportePorIdSolucionados(idReporte){
    console.log(idReporte);
    this.reporteService.consultarPorReporte(idReporte)
    .then(
      async data => {
         console.log(data);
        this.txtNumUnidad = data['numPatente'];
      });
  }
  limpiar() {
    const f = new Date();
    this.fechaDesde = f.getFullYear() + '-' + this.pad((f.getMonth() + 1), 2) + '-' +  this.pad(f.getDate(), 2);
    this.fechaHata = f.getFullYear() + '-' + this.pad((f.getMonth() + 1), 2) + '-' +  this.pad(f.getDate(), 2);
    this.txtNumUnidad= '';
    this.txtDescripcion=''
    $("#cboPredefinido").prop( "disabled", false );
  }

  llamarAlbumSolucion(idReporte, descRS) {
    this.reporteService.consultarSolucionadoUrl(idReporte)
    .then(
      async data => {
        console.log(data);
        // tslint:disable-next-line:no-string-literal
        this.urls = data;
        this.DescripcionRS = descRS
      });
  }


  // ==============================================================
  //  EDITAR SOLUCIÓN
  // ==============================================================
  solucionEdit(){
    if( this.txtDescripcion === '' ){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Existen campos vacios!',
      });
      return false;
    }
      const datos = {
        descripcion: this.txtDescripcion,
        desde: this.fechaDesde,
        hasta: this.fechaHata,
        id: this.idEditar,
      };
      this.reporteService.solucionEditData(datos)
      .then(
        async data => {
          console.log(data);
          this.llamarTablaSolucion();
          Swal.fire('Se actualizarón correctamente los datos');
          this.limpiar();
        }
      )
      .catch(
        error => {
          console.log(error + 'no se pudo actualizar los datos');
        }
      );

  }

}
