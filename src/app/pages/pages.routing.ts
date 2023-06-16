import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
/* ==============================================================
  DATOS
  ============================================================== */
import { DatosGeneralesComponent } from './datos/datos-generales/datos-generales.component';
import { DatosMovilComponent } from './datos/datos-movil/datos-movil.component';
import { RevisionTecnicaComponent } from './datos/revision-tecnica/revision-tecnica.component';
import { PermisoCirculacionComponent } from './datos/permiso-circulacion/permiso-circulacion.component';
/* ==============================================================
   SOTCK-EQUIPAMIENTO
   ============================================================== */
import { StockComponent } from './stock/stock.component';
import { EquipamientoComponent } from './equipamiento/equipamiento.component';
/* ==============================================================
   MANTENIMIENTO
   ============================================================== */
import { AlineacionComponent } from './mantencion/alineacion/alineacion.component';
import { BalenceoComponent } from './mantencion/balenceo/balenceo.component';
import { ControlAceiteComponent } from './mantencion/control-aceite/control-aceite.component';
import { ControlAguaComponent } from './mantencion/control-agua/control-agua.component';
import { ControlCombustibleComponent } from './mantencion/control-combustible/control-combustible.component';
import { FrenosComponent } from './mantencion/frenos/frenos.component';
import { NeumaticosComponent } from './mantencion/neumaticos/neumaticos.component';
import { PreventivoComponent } from './mantencion/preventivo/preventivo.component';
/* ==============================================================
   INFORMES DESDE EL DISPOSITIVO MÓVIL
   ============================================================== */
import { ReportesComponent } from './informes/reportes/reportes.component';
import { SolucionComponent } from './informes/solucion/solucion.component';
import { MensajesComponent } from './informes/mensajes/mensajes.component';
import { NotificacionesComponent } from './informes/notificaciones/notificaciones.component';
/* ==============================================================
    DOCUMENTOS
  ============================================================== */
import { RegistroMovilComponent } from './documentos/registro-movil/registro-movil.component';
import { RegistroConductorComponent } from './documentos/registro-conductor/registro-conductor.component';
import { OtrosDocumentosComponent } from './documentos/otros-documentos/otros-documentos.component';
import { PdfComponent } from './pdf/pdf.component';
import { DocumentosComponent } from './documentos/documentos/documentos.component';
/* ==============================================================
    CONFIGURACIÓN
  ============================================================== */
import { UsuarioComponent } from './configuracion/usuario/usuario.component';
import { RegistroUsuarioComponent } from './registro-usuario/registro-usuario.component';


const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        children: [
            { path: '', component: Grafica1Component, data: { titulo: 'Dashboard' } },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar' }},
            { path: 'grafica', component: Grafica1Component, data: { titulo: 'Gráfica' }},
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de cuenta' }},
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' }},
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' }},
            /* ==============================================================
               DATOS
               ============================================================== */
            { path: 'datos-generales', component: DatosGeneralesComponent, data: { titulo: 'Datos Generales' }},
            { path: 'datos-movil', component: DatosMovilComponent, data: { titulo: 'Datos Móvil' }},
            { path: 'revision-tec', component: RevisionTecnicaComponent, data: { titulo: 'Revisión Técnica' }},
            { path: 'permiso-circ', component: PermisoCirculacionComponent, data: { titulo: 'Permiso de Circulación' }},
            /* ==============================================================
               STOCK
               ============================================================== */
            { path: 'stock', component: StockComponent, data: { titulo: 'Stock' }},
            { path: 'equipamiento', component: EquipamientoComponent, data: { titulo: 'Equipamiento' }},
            /* ==============================================================
               MANTENIMIENTO
               ============================================================== */
            { path: 'alineacion', component: AlineacionComponent, data: { titulo: 'Aliniación' }},
            { path: 'balenceo', component: BalenceoComponent, data: { titulo: 'Balanceo' }},
            { path: 'control-aceite', component: ControlAceiteComponent, data: { titulo: 'Control Aceite' }},
            { path: 'control-agua', component: ControlAguaComponent, data: { titulo: 'Control Agua' }},
            { path: 'control-combustible', component: ControlCombustibleComponent, data: { titulo: 'Control Combustible' }},
            { path: 'neumaticos', component: NeumaticosComponent, data: { titulo: 'Neumáticos' }},
            { path: 'frenos', component: FrenosComponent, data: { titulo: 'Frenos' }},
            { path: 'preventivo', component: PreventivoComponent, data: { titulo: 'Preventivo' }},
            /* ==============================================================
               INFORMES DESDE EL DISPOSITIVO MÓVIL
               ============================================================== */
            { path: 'reportes', component: ReportesComponent, data: { titulo: 'Reportes' }},
            { path: 'solucion', component: SolucionComponent, data: { titulo: 'Solucion' }},
            { path: 'mensajes', component: MensajesComponent, data: { titulo: 'Mensajes' }},
            { path: 'notificaciones', component: NotificacionesComponent, data: { titulo: 'Notificaciones' }},
            /* ==============================================================
               DOCUMENTOS
              ============================================================== */
            { path: 'documentos', component: DocumentosComponent, data: { titulo: 'Documentos' }},
            { path: 'removil', component: RegistroMovilComponent, data: { titulo: 'Registro Móvil' }},
            { path: 'reconductor', component: RegistroConductorComponent, data: { titulo: 'Registro Conductor' }},
            { path: 'tipodoc', component: OtrosDocumentosComponent, data: { titulo: 'Otros Documentos' }},
            { path: 'pdf', component: PdfComponent, data: { titulo: 'PDF' }},
            /* ==============================================================
               DOCUMENTOS
              ============================================================== */
            { path: 'usuarios', component: UsuarioComponent, data: { titulo: 'Usuarios' }},
            { path: 'registro-usuario', component: RegistroUsuarioComponent, data: { titulo: 'Registro de Usuarios' }},
          ]
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})
export class PagesRoutingModule {}


