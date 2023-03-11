import { Component, OnInit } from '@angular/core';
import { DatosGeneralesService } from '../../../services/datos/datos-generales.service';
import { PermisoCirculacionService } from '../../../services/datos/permiso-circulacion.service';
import Swal from 'sweetalert2';

declare var $:any;

@Component({
  selector: 'app-permiso-circulacion',
  templateUrl: './permiso-circulacion.component.html'
})
export class PermisoCirculacionComponent implements OnInit {

  f = new Date();
  fechaEnviar = (this.f.getFullYear() + '-' + this.pad((this.f.getMonth() + 1), 2) + '-' +  this.pad(this.f.getDate(), 2) );

  iFechai: string;
  iFechaf: string;

  datosGeneralesPatente: any;
  datosperCir: any;

  cboPatente: string;
  txtLugarEmitido: string;
  txtObservaciones: string;
  txtQuienEmite: string;
  selloVerde: string;

  idEditar = '0';

  constructor(private datosService:DatosGeneralesService,
              private perCirservice: PermisoCirculacionService) {

    this.iFechai = this.fechaEnviar;
    this.iFechaf = this.fechaEnviar;
    this.limpiarCampos()

    this.datosService.consultarPorDatosMovil()
    .then(
      async data => {
        console.log(data);
        this.datosGeneralesPatente = data;
      });

      this.dataosperCirGrilla();

    }

  ngOnInit(): void {
  }
  pad(num: Number, size: Number): String {
    let s = num + '';
    while (s.length < size) { s = '0' + s; }
    return s;
  }

  dataosperCirGrilla(){
    this.perCirservice.consultarPerCir()
    .then(
      async data => {
        this.datosperCir = data;
      });
  }

  addperCirnica(){
    let texto = $("#cboPatente").find('option:selected').text();
    if( this.cboPatente === '0' ||  this.txtObservaciones === '' ||
    this.txtLugarEmitido === '' || this.txtQuienEmite === '' || this.selloVerde === '0'){
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
        selloVerde: this.selloVerde,
        estado: '1'
      };
      this.perCirservice.perCirAdd(datos)
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
          console.log(data);
          this.dataosperCirGrilla();
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

  conultarperCirID(id: number){
    this.perCirservice.consultPorPerCir(id)
    .then(
      data => {
        this.cboPatente = data[0]['numPatente'];
        this.iFechai = data[0]['fchDesde'];
        this.iFechaf = data[0]['fchHasta'];
        this.txtObservaciones = data[0]['observaciones'];
        this.txtLugarEmitido = data[0]['lugarEmitido'];
        this.txtQuienEmite = data[0]['quienEmite'];
        this.selloVerde = data[0]['selloVerde'];
        this.idEditar =  data[0]['id']
      }
    )
    .catch(
      error => {
        console.log(error);
      }
    );
  }
  updateperCir(id){
    if( this.cboPatente === '0' ||  this.txtObservaciones === '' ||
      this.txtLugarEmitido === '' || this.txtQuienEmite === '' || this.selloVerde === '0'){
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
      selloVerde: this.selloVerde,
      estado: '1'
    };
    this.perCirservice.datosPerCirUpdate(datos)
    .then(
      async data => {
        console.log(data);
        this.dataosperCirGrilla();
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

deleteperCir(id){
  this.perCirservice.deletePerCir(id)
  .then(
    data => {
    console.log(data);
    if (data === '1'){
      Swal.fire({
        icon: 'error',
        title: 'Eliminar',
        text: 'Se elimino el dato seleccionado!'
      })
      this.dataosperCirGrilla();
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
    this.selloVerde = '';
    this.idEditar = '0';
  }
}
