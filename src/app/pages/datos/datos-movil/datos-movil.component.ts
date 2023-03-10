import { Component, OnInit } from '@angular/core';
import { TipoService } from '../../../services/datos/tipo.service';
import { EstadosDatosService } from '../../../services/datos/estados-datos.service';

@Component({
  selector: 'app-datos-movil',
  templateUrl: './datos-movil.component.html'
})
export class DatosMovilComponent implements OnInit {

  public numPatente: string;
  public nomMarca: string
  public nomModelo: string;
  public numChasis: string;
  public numMotor: string;
  public ano: number;
  public estado: string;

  public tipoD: any;
  public cboTipo: string;

  public estDato: any;
  constructor(private tipoDato: TipoService,
              private estadoDtos:EstadosDatosService) {
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

   }

  ngOnInit(): void {
  }

}
