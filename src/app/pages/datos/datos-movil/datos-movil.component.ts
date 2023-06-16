import { Component, OnInit } from '@angular/core';
import { TipoService } from '../../../services/datos/tipo.service';
import { EstadosDatosService } from '../../../services/datos/estados-datos.service';
import { DatosMovilService } from '../../../services/datos/datos-movil.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-datos-movil',
  templateUrl: './datos-movil.component.html'
})
export class DatosMovilComponent implements OnInit {

  public numCarro: string;
  public numPatente: string;
  public nomMarca: string
  public nomModelo: string;
  public numChasis: string;
  public numMotor: string;
  public ano: string;
  public estado: string;

  public tipoD: any;
  public cboTipo: string;

  public estDato: any;

  public dtMoviles: any;
  idEditar = '0';

  constructor(private tipoDato: TipoService,
              private estadoDtos:EstadosDatosService,
              private datosMoviles:DatosMovilService) {
                this.cboTipo = '0';
                this.estado = '0';

                this.tipoDato.consultarTipoDatos()
                .then(
                  async data => {
                  this.tipoD = data;
              });

              this.estadoDtos.consultarEstadosDatos()
              .then(
                async data => {
                  this.estDato = data;
              });

              this.dataosMovilGrilla();

   }

  ngOnInit(): void {
  }

  dataosMovilGrilla(){
    this.datosMoviles.consultPorDatoMovil()
    .then(
      async data => {
        this.dtMoviles = data;
      });
  }

  addDMovil(){
    if( this.numCarro === '' || this.numPatente === '' || this.cboTipo === '0' || this.nomMarca === '' ||
        this.nomModelo === '' || this.numChasis === '' || this.numMotor  === ''||
        this.ano  ==='' || this.estado ==='0'){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Existen campos vacios!',
      });
      return false;
    }
      const datos = {
        numCarro: this.numCarro,
        numPatente: this.numPatente,
        idTipoMovil: this.cboTipo,
        nomMarca: this.nomMarca,
        nomModelo: this.nomModelo,
        numChasis: this.numChasis,
        numMotor: this.numMotor,
        ano: this.ano,
        estado: this.estado
      };
      this.datosMoviles.datosMovilAdd(datos)
      .then(
        async data => {
          //console.log(data);
          if (data === 2){
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: `Este Nº ${this.numPatente} de patente ya esta ingresada!`,
            });
            this.limpiarCampos();
          }else{
            this.dataosMovilGrilla();
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

  llamardatosMovil(id){
    this.datosMoviles.consultarDatosMovilID(id)
    .then(
      async data => {
        console.log(data);
        this.numCarro = data['numCarro'];
        this.numPatente = data['numPatente'];
        this.cboTipo = data['idTipoMovil'];
        this.nomMarca = data['nomMarca'];
        this.nomModelo = data['nomModelo'];
        this.numChasis = data['numChasis'];
        this.numMotor = data['numMotor'];
        this.ano =  data['ano']
        this.estado = data['estadoID'];
        this.idEditar =  data['id']
      });
  }


     editDMovil(id){
    if( this.numPatente === '' ||this.numPatente === '' || this.cboTipo === '0'
       || this.nomMarca === '' || this.nomModelo === '' || this.numChasis === ''
       || this.numMotor  === ''|| this.ano  ==='' || this.estado ==='0'){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Existen campos vacios!',
      });
      return false;
    }
      const datos = {
        id: id,
        numCarro: this.numCarro,
        numPatente: this.numPatente,
        idTipoMovil: this.cboTipo,
        nomMarca: this.nomMarca,
        nomModelo: this.nomModelo,
        numChasis: this.numChasis,
        numMotor: this.numMotor,
        ano: this.ano,
        estado: this.estado
      };
      this.datosMoviles.datosMovilEdit(datos)
      .then(
        async data => {
          this.dataosMovilGrilla();
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

  deleteDatoMovill(id){
    this.datosMoviles.deletePorDatoMovil(id)
    .then(
      data => {
      console.log(data);
      if (data === '1'){
        Swal.fire({
          icon: 'error',
          title: 'Eliminar',
          text: 'Se elimino el dato seleccionado!'
        })
        this.dataosMovilGrilla();
      }
      }
    )
  }


  limpiarCampos(){
    this.numCarro= '';
    this.numPatente = '';
    this.cboTipo = '0';
    this.nomMarca= '';
    this.nomModelo = '';
    this.numChasis = '';
    this.numMotor = '';
    this.ano = '';
    this.estado = '0'
    this.idEditar = '0';
  }
}
