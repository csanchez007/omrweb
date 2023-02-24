import { Component, OnInit } from '@angular/core';
import { DatosGeneralesService } from '../../../services/datos/datos-generales.service';
import { UsuariosService } from '../../../services/usuarios/usuarios.service';
import { EstadosDatosService } from '../../../services/datos/estados-datos.service';
import { TipoService } from '../../../services/datos/tipo.service';
import { ModeloMarcaService } from '../../../services/datos/modelo-marca.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-datos-generales',
  templateUrl: './datos-generales.component.html'
})
export class DatosGeneralesComponent implements OnInit {

  datosGenerales: any;
  usuarios: any;
  estDato: any;
  tipoD: any;
  modMarD: any;

  idEditar = '0';
  txtPatente: string;
  revTecnica: number;
  perCirculacion: number;
  chasis: string;
  numMotor: string;
  cboUsuario: string;
  cboModeloMarca: string;
  cboTipo: string;

  constructor(private datosService:DatosGeneralesService,
              private usuarioService:UsuariosService,
              private estadoDtos:EstadosDatosService,
              private tipoDato: TipoService,
              private mmD: ModeloMarcaService) {
      this.revTecnica = 0;
      this.perCirculacion = 0;
      this.cboUsuario = '0';
      this.cboTipo = '0';
      this.limpiatCampos();
      this.dataosGralGrilla()

      this.usuarioService.consultarAllUser()
      .then(
        async data => {
          this.usuarios = data;
        });

        this.estadoDtos.consultarEstadosDatos()
        .then(
          async data => {
            this.estDato = data;
        });

        this.tipoDato.consultarTipoDatos()
          .then(
            async data => {
            this.tipoD = data;
        });

        this.mmD.consultarModeloMarcaDatos()
        .then(
          async data => {
          this.modMarD = data;
      });
  }

  ngOnInit(): void {
  }


  addDGral(){
    if( this.cboUsuario === '' ||  this.txtPatente === '' ||  this.numMotor === '' ||
    this.revTecnica === 0 || this.perCirculacion === 0 || this.chasis === ''){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Existen campos vacios!',
      });
      return false;
    }
      const datos = {
        rutUsuario: this.cboUsuario,
        numPatente: this.txtPatente,
        numMotor: this.numMotor,
        revTecnica: this.revTecnica,
        perCirculacion: this.perCirculacion,
        numChasis: this.chasis,
        modelo_marca: this.cboModeloMarca,
        tipo_movil: this.cboTipo,
        estado: '1'
      };
      this.datosService.datosGralAdd(datos)
      .then(
        async data => {
          console.log(data);
          this.dataosGralGrilla();
          Swal.fire('Se insertaron correctamente los datos');
          this.limpiatCampos();
        }
      )
      .catch(
        error => {
          console.log(error + 'no se pudo insertar datos');
        }
      );

  }
  dataosGralGrilla(){
    this.datosService.consultarPorDatosReporte()
    .then(
      async data => {
        this.datosGenerales = data;
      });
  }

  conultarPorDatoGral(id){
    this.datosService.consultPorDatoGral(id)
    .then(
      data => {
      //  console.log(data[0]['rutUsuario']);
        this.cboUsuario = data[0]['rutUsuario'];
        this.txtPatente = data[0]['numPatente'];
        this.numMotor = data[0]['numMotor'];
        this.revTecnica = data[0]['revTecnica'];
        this.perCirculacion = data[0]['perCirculacion'];
        this.chasis = data[0]['numChasis'];
        this.cboModeloMarca = data[0]['nomModelo'];
        this.cboTipo =  data[0]['tipo']
        this.idEditar =  data[0]['id']
      }
    )
    .catch(
      error => {
        console.log(error);
      }
    );
  }

  updateDGral(id){
    if( this.cboUsuario === '0' ||  this.txtPatente === '' ||  this.numMotor === '' ||
    this.revTecnica === 0 || this.perCirculacion === 0 || this.chasis === ''){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Existen campos vacios!',
      });
      return false;
    }
    const datos = {
      id: id,
      rutUsuario: this.cboUsuario,
      numPatente: this.txtPatente,
      numMotor: this.numMotor,
      revTecnica: this.revTecnica,
      perCirculacion: this.perCirculacion,
      numChasis: this.chasis,
      modelo_marca: this.cboModeloMarca,
      tipo_movil: this.cboTipo,
      estado: '1'
    };
    this.datosService.datosGralUpdate(datos)
    .then(
      async data => {
        console.log(data);
        this.dataosGralGrilla();
        Swal.fire('Se actualizaron correctamente los datos');
        this.limpiatCampos();
      }
    )
    .catch(
      error => {
        console.log(error + 'no se pudo insertar datos');
      }
    );

}

deletePorDatoGral(id){
  this.datosService.deletePorDatoGral(id)
  .then(
    data => {
    console.log(data);
    if (data === '1'){
      Swal.fire({
        icon: 'error',
        title: 'Eliminar',
        text: 'Se elimino el dato seoleccionado!'
      })
      this.dataosGralGrilla();
    }


    }
  )
}

limpiatCampos(){
  this.cboUsuario = '0';
  this.txtPatente = '';
  this.numMotor = '';
  this.revTecnica = 0;
  this.perCirculacion = 0;
  this.cboModeloMarca = '0';
  this.cboTipo = '0';
  this.chasis = ''
  this.idEditar = '0';
}
}
