import { Component, OnInit } from '@angular/core';
import { ReporteService } from '../../../services/informes/reporte.service';
import { DatosGeneralesService } from '../../../services/datos/datos-generales.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
declare function loadTabla(id): any;

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: [ './reportes.component.css' ]
})
export class ReportesComponent implements OnInit {

  fechaReporte: string;
  predefinido: any;
  detallesReport: any;
  urls: any;

  public datosGeneralesPatente: any;
  public cboPatente: string;

  public cboPredefinido: string;
  public numMovil: string;
  public cboSolucionado: string;
  public txtDescripcion: string;
  public txtDescripcionSolucion: string;
  public isEnabled: boolean;
  public DescripcionRS: string

  public fotoReporte: any;

  idEditar = '0';
  constructor(private reporteService: ReporteService,
              private datosService:DatosGeneralesService,
              private router: Router) {
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
          console.log(data);
      });
  }


  limpiar() {
    const f = new Date();
  }

  llamarAlbumReporte(idReporte, descRS) {
    this.reporteService.consultarReporteUrl(idReporte)
    .then(
      async data => {
        console.log(data);
        this.urls = data;
        this.DescripcionRS = descRS
      });
  }

  llamarReporteID(idReporte) {
    this.reporteService.consultarPorReporte(idReporte)
    .then(
      async data => {
        this.numMovil = data['numMovil'];
        this.cboPredefinido = data['idPredef'];
        this.cboSolucionado = data['IDSolucionado'];
        this.txtDescripcion = data['descripcion'];
        this.txtDescripcionSolucion = data['descripcionSolucion'];
        this.idEditar = data['id'];
        this.isEnabled = false;
      });
  }

  updateReporte(id){
    if( this.txtDescripcion === '0'){
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
      descripcionSolucion: this.txtDescripcionSolucion

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
  this.numMovil = '';
  this.cboPatente ='0';
  this.cboPredefinido = '0';
  this.cboSolucionado = '0';
  this.txtDescripcion = '';
  this.isEnabled = true;
  this.idEditar = '0';
}

createPdf(idReporte){
  console.log(idReporte);
  this.reporteService.consultarPorReporte(idReporte)
  .then(
    async data => {
      console.log(data)
      const numMovil = data['numMovil'];
      /*this.cboPredefinido = data['idPredef'];
      this.cboSolucionado = data['IDSolucionado'];*/
      const DescripcionPDF = data['descripcion'];
      const fecha = data['fecha'];
      const descripcionSolucion = data['descripcionSolucion'];

      this.reporteService.consultarReporteUrl(idReporte)
      .then(
        async data => {
          this.urls = data;
        });

        this.reporteService.consultarReporteUrl(idReporte)
        .then(
          async data => {
            this.urls = data;

           const fotoReport = this.urls;
           const fot = []

           fotoReport.forEach(value => {

            fot.push({image: [value.fotoReporte],	width: 280,
                      height:450, margin: [130, 5]})
           });

           this.fotoReporte = fot;
           console.log(this.fotoReporte);

        const pdfOT: any= {
          content: [
            {
                  image: 'data:image/jpeg;base64,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',
                  width: 90,
                  height:90
            },
            {
              text:'Bus Service Solutions',fontSize: 14, bold: true, margin:[220, 7, 0, 0]
            },
            {
              text: 'Nº Carro:', fontSize: 12, bold: true, margin:[0, 7, 0, 0]
            },
            numMovil,
            {
              text: 'Problema - Causa :', fontSize: 12, bold: true, margin:[0, 7, 0, 0]
            },
            DescripcionPDF,
            {
              text: 'Solución', fontSize: 12, bold: true, margin:[0, 7, 0, 0]
            },
            descripcionSolucion,
            {
              text: 'fecha', fontSize: 12, bold: true, margin:[0, 7, 0, 0]
            },
            fecha,


            this.fotoReporte,


            ]
  }

  const pdf = pdfMake.createPdf(pdfOT);
  pdf.open();
});
});
}
}
