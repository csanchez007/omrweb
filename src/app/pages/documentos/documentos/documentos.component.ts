import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { ReporteService } from 'src/app/services/informes/reporte.service';

declare function loadTabla(id): any;

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html'
})
export class DocumentosComponent implements OnInit {

  public selectDoc: string;
  public numCarroDoc: string;

  public archivos: any = [];
  public pdfString: string;
  public getAllMMD: any

  public document:string

  constructor(public http: HttpClient,
              private sanitizer: DomSanitizer,
              private docService: ReporteService) { }

  ngOnInit(): void {
    this.docGralGrilla();
  }


  capturarFile(event):any{
    const archivoCapturado = event.target.files[0];
    this.extraerBase64(archivoCapturado).then((pdf: any) => {
      this.pdfString = pdf.base;
      console.log( this.pdfString);

    })
    this.archivos.push(archivoCapturado);
    //console.log(event.target.files);
  }

  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafePDF = window.URL.createObjectURL($event);
      const pdf = this.sanitizer.bypassSecurityTrustUrl(unsafePDF);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  })


  async insertPDF() {
    if( this.numCarroDoc === undefined || this.numCarroDoc === '' ||
    this.pdfString === undefined || this.pdfString === ''){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Existen campos vacios!',
      });
      return false;
    }
    const datos = {
      idUsuario: 310,
      tipo_doc: this.selectDoc,
      num_doc_carro: this.numCarroDoc,
      doc: this.pdfString,

    };
    this.docService.insertarDocService(datos)
    .then(
      async data => {
        console.log(data);
        Swal.fire('Se actualizaron correctamente los datos');
        await this.docGralGrilla()
      }
    )
    .catch(
      error => {
        console.log(error + 'no se pudo insertar datos');
      }
    );

}

docGralGrilla(){
  this.docService.consultaAllDoc()
  .then(
    async data => {
       console.log(data);
       this.getAllMMD = data;
       await loadTabla('tblInfoDoc');
    });
}

  llamarUnDoc(id){
      this.docService.consultarPoDoc(id)
      .then(
        async data => {
          console.log(data)
          this.document = data[0]['doc'];
          const tipo = data[0]['tipo_doc'];
          const carro =data[0]['num_doc_carro'];
          this.showDoc(this.document, tipo, carro)

        });
    }
    showDoc(data, tipo, carro) {
      const linkSource = data;
      const downloadLink = document.createElement('a');
      const fileName = tipo +'_'+carro;

      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    }
}
