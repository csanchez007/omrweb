import { Component } from '@angular/core';



@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  public labels1: string[] = ['Respuestos', 'Accesorios', 'Neumáticos'];
  public data1 = [
    [10, 15, 40],
  ];

  public labels2: string[] = ['Colectivos', 'Camion', 'Buses'];
  public data2 = [
    [15, 35, 40],
  ];

  public labels3: string[] = ['Respuestos', 'Accesorios', 'Neumáticos'];
  public data3 = [
    [20, 10, 70],
  ];
  public labels4: string[] = ['En espera', 'En reparación', 'Reparados'];
  public data4 = [
    [30, 40, 30],
  ];
}
