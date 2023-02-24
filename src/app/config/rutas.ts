import { Routes } from '@angular/router';


export const RUTAS: Routes = [
    {
      path: '',
      redirectTo: 'carga',
      pathMatch: 'full'
    },
    {
      path: 'home',
      loadChildren: './home/home.module#HomePageModule'
    },
    {
      path: 'list',
      loadChildren: './list/list.module#ListPageModule'
    },
    { path: 'carga', loadChildren: './carga/carga.module#CargaPageModule' },
    { path: 'sesion', loadChildren: './sesion/sesion.module#SesionPageModule' },
    { path: 'detalle-reporte', loadChildren: './detalle-reporte/detalle-reporte.module#DetalleReportePageModule' },
    { path: 'detalle-solucion', loadChildren: './detalle-solucion/detalle-solucion.module#DetalleSolucionPageModule' },
    { path: 'usuario', loadChildren: './usuario/usuario.module#UsuarioPageModule' },
    { path: 'ronda-list', loadChildren: './ronda-list/ronda-list.module#RondaListPageModule' },
    { path: 'iniciarronda', loadChildren: './iniciarronda/iniciarronda.module#IniciarrondaPageModule' },
    { path: 'detenerronda', loadChildren: './detenerronda/detenerronda.module#DetenerrondaPageModule' },
    { path: 'scanpunto', loadChildren: './scanpunto/scanpunto.module#ScanpuntoPageModule' },
    { path: 'fotos-reporte', loadChildren: './fotos-reporte/fotos-reporte.module#FotosReportePageModule' },
    { path: 'detalle-por-reporte', loadChildren: './detalles/detalle-por-reporte/detalle-por-reporte.module#DetallePorReportePageModule' },
    { path: 'album-reporte', loadChildren: './album/album-reporte/album-reporte.module#AlbumReportePageModule' },
    { path: 'album-solucion', loadChildren: './album/album-solucion/album-solucion.module#AlbumSolucionPageModule' },
    { path: 'list-solucion', loadChildren: './list-solucion/list-solucion.module#ListSolucionPageModule' },
    { path: 'de-solucion', loadChildren: './detalles/de-solucion/de-solucion.module#DeSolucionPageModule' },
    { path: 'foto-solucion', loadChildren: './foto-solucion/foto-solucion.module#FotoSolucionPageModule' },
    { path: 'notificaciones', loadChildren: './notificaciones/notificaciones.module#NotificacionesPageModule' },
  ];
