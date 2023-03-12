import { Component, OnInit } from '@angular/core';
import { ReporteService } from '../../../services/informes/reporte.service';
import { DatosGeneralesService } from '../../../services/datos/datos-generales.service';
import Swal from 'sweetalert2'

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

  public cboPredefinido: string;
  public cboSolucionado: string;
  public txtDescripcion: string;
  public isEnabled: boolean;
  public DescripcionRS: string

  idEditar = '0';
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

      this.datosService.consultarPorDatosMovil()
      .then(
        async data => {
          this.datosGeneralesPatente = data;
        });
        this.cboPatente = '0';
        this.cboSolucionado = '0';
        this.cboPredefinido ='0';
        this.isEnabled = true;
  }

  ngOnInit(): void {
  }

  llamarTablaReporte(){
    this.reporteService.consultServis()
    .then(
      async data => {
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

  llamarAlbumReporte(idReporte, descRS) {
    this.reporteService.consultarReporteUrl(idReporte)
    .then(
      async data => {
        console.log(data);
        // tslint:disable-next-line:no-string-literal
        this.urls = data;
        this.DescripcionRS = descRS
      });
  }

  llamarReporteID(idReporte) {
    this.reporteService.consultarPorReporte(idReporte)
    .then(
      async data => {
        this.cboPatente = data['id_numPatente'];
        this.cboPredefinido = data['idPredef'];
        this.cboSolucionado = data['IDSolucionado'];
        this.txtDescripcion = data['descripcion'];
        this.idEditar = data['id'];
        this.isEnabled = false;
      });
  }

  updateReporte(id){
    if( this.txtDescripcion === '0' ||  this.cboPredefinido === '0'){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Existen campos vacios!',
      });
      return false;
    }
    const datos = {
      id: id,
      idPredef: this.cboPredefinido,
      descripcion: this.txtDescripcion,

    };
    this.reporteService.reporteUpdate(datos)
    .then(
      async data => {
        console.log(data);
        this.llamarTablaReporte();
        Swal.fire('Se actualizaron correctamente los datos');
        this.limpiarCampos();
      }
    )
    .catch(
      error => {
        console.log(error + 'no se pudo insertar datos');
      }
    );

}

limpiarCampos(){
  this.cboPatente ='0';
  this.cboPredefinido = '0';
  this.cboSolucionado = '0';
  this.txtDescripcion = '';
  this.isEnabled = true;
  this.idEditar = '0';
}
}
