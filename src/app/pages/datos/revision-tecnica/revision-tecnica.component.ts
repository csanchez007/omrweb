import { Component, OnInit } from '@angular/core';
import { DatosGeneralesService } from '../../../services/datos/datos-generales.service';
import { RevisionTecnicaService } from '../../../services/datos/revision-tecnica.service';
import Swal from 'sweetalert2';
declare var $:any;

@Component({
  selector: 'app-revision-tecnica',
  templateUrl: './revision-tecnica.component.html'
})
export class RevisionTecnicaComponent implements OnInit {

  f = new Date();
  fechaEnviar = (this.f.getFullYear() + '-' + this.pad((this.f.getMonth() + 1), 2) + '-' +  this.pad(this.f.getDate(), 2) );

  iFechai: string;
  iFechaf: string;

  datosGeneralesPatente: any;
  datosrevTec: any;

  cboPatente: string;
  txtLugarEmitido: string;
  txtObservaciones: string;
  txtQuienEmite: string;
  txtContaminates: string;

  idEditar = '0';

  constructor(private datosService:DatosGeneralesService,
              private revTecservice: RevisionTecnicaService) {

    this.iFechai = this.fechaEnviar;
    this.iFechaf = this.fechaEnviar;
    this.limpiarCampos()

    this.datosService.consultarPorDatosMovil()
    .then(
      async data => {
        console.log(data);
        this.datosGeneralesPatente = data;
      });

      this.dataosRevTecGrilla();

    }

  ngOnInit(): void {
  }
  pad(num: Number, size: Number): String {
    let s = num + '';
    while (s.length < size) { s = '0' + s; }
    return s;
  }

  dataosRevTecGrilla(){
    this.revTecservice.consultarRevTecnica()
    .then(
      async data => {
        this.datosrevTec = data;
      });
  }

  addRevTecnica(){
    let texto = $("#cboPatente").find('option:selected').text();
    if( this.cboPatente === '0' ||  this.txtObservaciones === '' ||
    this.txtLugarEmitido === '' || this.txtQuienEmite === '' || this.txtContaminates === '0'){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Existen campos vacios!',
      });
      return false;
    }
      const datos = {
        id_numPatente: this.cboPatente,
        fchDesde: this.iFechai,
        fchHasta: this.iFechaf,
        observaciones: this.txtObservaciones,
        lugarEmitido: this.txtLugarEmitido,
        quienEmite: this.txtQuienEmite,
        certContaminate: this.txtContaminates,
        estado: '1'
      };
      this.revTecservice.revTecnicaAdd(datos)
      .then(
        async data => {

          if (data === 2){
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: `Este Móvil con patente '${texto}' ya esta ingresado` ,
            });
            this.limpiarCampos();
          }else{
          this.dataosRevTecGrilla();
          Swal.fire('Se insertaron correctamente los datos');
          this.limpiarCampos();
          }
        }
      )
      .catch(
        error => {
          console.log(error + 'no se pudo insertar datos');
        }
      );

  }

  conultarRevTecID(id: number){
    this.revTecservice.consultPorRevTec(id)
    .then(
      data => {
        this.cboPatente = data[0]['id_numPatente'];
        this.iFechai = data[0]['fchDesde'];
        this.iFechaf = data[0]['fchHasta'];
        this.txtObservaciones = data[0]['observaciones'];
        this.txtLugarEmitido = data[0]['lugarEmitido'];
        this.txtQuienEmite = data[0]['quienEmite'];
        this.txtContaminates = data[0]['certContaminate'];
        this.idEditar =  data[0]['id']
      }
    )
    .catch(
      error => {
        console.log(error);
      }
    );
  }
  updateRevTec(id){
    if( this.cboPatente === '0' ||  this.txtObservaciones === '' ||
      this.txtLugarEmitido === '' || this.txtQuienEmite === '' || this.txtContaminates === '0'){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Existen campos vacios!',
      });
      return false;
    }
    const datos = {
      id: id,
      id_numPatente: this.cboPatente,
      fchDesde: this.iFechai,
      fchHasta: this.iFechaf,
      observaciones: this.txtObservaciones,
      lugarEmitido: this.txtLugarEmitido,
      quienEmite: this.txtQuienEmite,
      certContaminate: this.txtContaminates,
      estado: '1'
    };
    this.revTecservice.datosRevTecUpdate(datos)
    .then(
      async data => {
        console.log(data);
        this.dataosRevTecGrilla();
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

deleteRevTec(id){
  this.revTecservice.deleteRevTec(id)
  .then(
    data => {
    console.log(data);
    if (data === '1'){
      Swal.fire({
        icon: 'error',
        title: 'Eliminar',
        text: 'Se elimino el dato seleccionado!'
      })
      this.dataosRevTecGrilla();
      this.limpiarCampos()
    }


    }
  )
}
  limpiarCampos(){
    this.cboPatente = '0';
    this.iFechai = this.fechaEnviar;
    this.iFechaf = this.fechaEnviar;
    this.txtObservaciones = '';
    this.txtLugarEmitido = '';
    this.txtQuienEmite = '';
    this.txtContaminates = 'SI';
    this.idEditar = '0';
  }
}
