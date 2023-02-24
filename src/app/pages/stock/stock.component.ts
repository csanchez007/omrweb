import { Component, OnInit } from '@angular/core';
import { StockService } from '../../services/stock/stock.service';
import Swal from 'sweetalert2';
import { URL_SERVIS } from 'src/app/config/url.servicios';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  public nom_producto: string;
  public cod_producto: string;
  public descripcion: string;
  public cantidad_entrante: number;
  public cantidad_saliente: number;
  public cantidad_total: number;
  public precio: number;
  public ruta_foto: string;
  public estado: string;
  public tipo: string;

  public idEditar = '0';

  public detallesStock: any;

  public urlImage: string;

  constructor(private stockService:StockService, public http: HttpClient,) {
    this.tipo = '1';
    this.estado= '0';
    this.cantidad_entrante = 0;
    this.cantidad_saliente = 0;
    this.cantidad_total = 0;
    this.precio = 0;

    this.stockService.consultTodoStock(1)
    .then(
      async data => {
         console.log(data);
         this.detallesStock = data;
      });
  }

  ngOnInit(): void {
  }
  calculoStock(){
    this.cantidad_total= this.cantidad_entrante - this.cantidad_saliente
  }
  stockGralGrilla(){
    this.stockService.consultTodoStock(1)
    .then(
      async data => {
         console.log(data);
         this.detallesStock = data;
      });
  }
  addSock(){
    if( this.nom_producto === undefined || this.nom_producto === '' ||
      this.cod_producto === undefined || this.cod_producto === '' ||
      this.descripcion === undefined || this.descripcion === '' ||
      this.cantidad_entrante === null || this.cantidad_saliente === null || this.precio === null){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Existen campos vacios!',
      });
      return false;
    }
    let total = this.cantidad_entrante - this.cantidad_saliente
      const datos = {
        nom_producto: this.nom_producto,
        cod_producto: this.nom_producto,
        descripcion: this.descripcion,
        cantidad_entrante: this.cantidad_entrante,
        cantidad_saliente: this.cantidad_saliente,
        cantidad_total: total,
        precio: this.precio,
        ruta_foto: this.urlImage,
        estado: this.estado,
        tipo: this.tipo,
      };
      this.stockService.addStock(datos)
      .then(
        async data => {
          console.log(data);
          this.stockGralGrilla();
          Swal.fire('Se insertaron correctamente los datos');
         /* this.limpiarCampos();*/
        }
      )
      .catch(
        error => {
          console.log(error + 'no se pudo insertar datos');
        }
      );

  }
  conultarPorStock(id, tipo){

      this.stockService.consultPorStock(id, tipo)
      .then(
        data => {
         console.log(data['nom_producto']);
          this.nom_producto = data['nom_producto'];
          this.cod_producto = data['cod_producto'];
          this.descripcion = data['descripcion'];
          this.cantidad_entrante = data['cantidad_entrante'];
          this.cantidad_saliente = data['cantidad_saliente'];
          this.cantidad_total = data['cantidad_total'];
          this.precio = data['precio'];
          this.ruta_foto =  data['ruta_foto']
          this.estado =  data['estado']
          this.idEditar =  data['id']
        }
      )
      .catch(
        error => {
          console.log(error);
        }
      );
   }

   updateDGral(id){
    if( this.nom_producto === undefined || this.nom_producto === '' ||
      this.cod_producto === undefined || this.cod_producto === '' ||
      this.descripcion === undefined || this.descripcion === '' ||
      this.cantidad_entrante === null || this.cantidad_saliente === null || this.precio === null){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Existen campos vacios!',
      });
      return false;
    }
    let total = this.cantidad_entrante - this.cantidad_saliente
    const datos = {
      id: id,
      nom_producto: this.nom_producto,
      cod_producto: this.nom_producto,
      descripcion: this.descripcion,
      cantidad_entrante: this.cantidad_entrante,
      cantidad_saliente: this.cantidad_saliente,
      cantidad_total: total,
      precio: this.precio,
      ruta_foto: this.urlImage,
      estado: this.estado,
      tipo: this.tipo,
    };
    this.stockService.stockUpdate(datos)
    .then(
      async data => {
        console.log(data);
        this.stockGralGrilla();
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
deleteStockl(id){
  this.stockService.deleteStock(id)
  .then(
    data => {
    console.log(data);
    if (data === 1){
      Swal.fire({
        icon: 'error',
        title: 'Eliminar',
        text: 'Se elimino el dato seoleccionado!'
      })
      this.stockGralGrilla();
    }


    }
  )
}
setrIMGvar(value) {
  this.urlImage = value;
}
async uploadimagen(id) {


    const url = URL_SERVIS + '/omrservice/assets/detalle_reporte/images.php';
    // tslint:disable-next-line:prefer-const
    let postData = new FormData();

    postData.append('file', this.ruta_foto);
    // tslint:disable-next-line:prefer-const
    // tslint:disable-next-line:typedef-whitespace
    // tslint:disable-next-line:prefer-const
    let data: Observable<any> = this.http.post(url, postData);
    data.subscribe(async (result) => {
      console.log(result.image_url);
      this.setrIMGvar(result.image_url);
      if(id === 0){
       this.addSock();
      }else{
        this.updateDGral(id);
      }


    });
}
  limpiarCampos(){
    this.nom_producto = '0';
    this.cod_producto = '';
    this.descripcion = '';
    this.cantidad_entrante = 0;
    this.cantidad_saliente = 0;
    this.cantidad_total = 0;
    this.precio = 0;
    this.estado = '0'
    this.ruta_foto = '';
    this.idEditar = '0';
  }
}
