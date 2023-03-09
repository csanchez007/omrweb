import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Gráficas', url: 'grafica' },
      ]
    },
    {
      titulo: 'Datos',
      icono: 'mdi mdi-bullseye',
      submenu: [
        { titulo: 'Datos Móvil', url: 'datos-movil' },
        { titulo: 'Revisión Técnica', url: 'revision-tec' },
        { titulo: 'Permiso de Circu.', url: 'permiso-circ' },
        { titulo: 'Datos Generales', url: 'datos-generales' },
       /* { titulo: 'Otros', url: 'datos-movil' }*/
      ]
    },
   /* {
      titulo: 'Mantención',
      icono: 'mdi mdi-brightness-5',
      submenu: [
        { titulo: 'Alineación', url: 'alineacion' },
        { titulo: 'Balanceo', url: 'balenceo' },
        { titulo: 'Control aceite', url: 'control-aceite' },
        { titulo: 'Control Agua', url: 'control-agua' },
        { titulo: 'Control Combustible', url: 'control-combustible' },
        { titulo: 'Neumáticos', url: 'neumaticos' },
        { titulo: 'Frenos', url: 'frenos' },
        { titulo: 'Preventivo', url: 'preventivo' },
        { titulo: 'Otras ', url: 'preventivo' },
      ]
    },*/
    {
      titulo: 'Stock',
      icono: 'mdi mdi-vector-polygon',
      submenu: [
        { titulo: 'Stock', url: 'stock' },
        { titulo: 'Equipamiento', url: 'equipamiento' },
      ]
    },
    {
      titulo: 'Informes',
      icono: 'mdi mdi-information-outline',
      submenu: [
        { titulo: 'Reportes', url: 'reportes' },
        { titulo: 'Solución', url: 'solucion' },
        /*{ titulo: 'Mensajes', url: 'mensajes' },
        { titulo: 'Notificaciones', url: 'notificaciones' },*/
      ]
    },
    {
      titulo: 'Documentación',
      icono: 'mdi mdi-file-document',
      submenu: [
        { titulo: 'Registro Móvil', url: 'removil' },
        { titulo: 'Registro Conductor', url: 'reconductor' },
        { titulo: 'Otros Documentos', url: 'tipodoc' },
      ]
    },
    {
      titulo: 'Configuración',
      icono: 'mdi mdi-wrench',
      submenu: [
      /*  { titulo: 'Registro móvil', url: 'reportes' },
        { titulo: 'Registro Conductor', url: 'solucion' },
        { titulo: 'Equipamiento móvil', url: 'solucion' },*/
      ]
    },
  ];

  constructor() { }
}
