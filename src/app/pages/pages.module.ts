import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// Modulos
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { DatosGeneralesComponent } from './datos/datos-generales/datos-generales.component';
import { DatosMovilComponent } from './datos/datos-movil/datos-movil.component';
import { RevisionTecnicaComponent } from './datos/revision-tecnica/revision-tecnica.component';
import { PermisoCirculacionComponent } from './datos/permiso-circulacion/permiso-circulacion.component';
import { AlineacionComponent } from './mantencion/alineacion/alineacion.component';
import { BalenceoComponent } from './mantencion/balenceo/balenceo.component';
import { ControlAguaComponent } from './mantencion/control-agua/control-agua.component';
import { ControlAceiteComponent } from './mantencion/control-aceite/control-aceite.component';
import { ControlCombustibleComponent } from './mantencion/control-combustible/control-combustible.component';
import { NeumaticosComponent } from './mantencion/neumaticos/neumaticos.component';
import { FrenosComponent } from './mantencion/frenos/frenos.component';
import { PreventivoComponent } from './mantencion/preventivo/preventivo.component';
import { ReportesComponent } from './informes/reportes/reportes.component';
import { SolucionComponent } from './informes/solucion/solucion.component';
import { MensajesComponent } from './informes/mensajes/mensajes.component';
import { NotificacionesComponent } from './informes/notificaciones/notificaciones.component';
import { StockComponent } from './stock/stock.component';
import { EquipamientoComponent } from './equipamiento/equipamiento.component';
import { RegistroMovilComponent } from './documentos/registro-movil/registro-movil.component';
import { RegistroConductorComponent } from './documentos/registro-conductor/registro-conductor.component';
import { OtrosDocumentosComponent } from './documentos/otros-documentos/otros-documentos.component';
import { CombustibleComponent } from './informes/combustible/combustible.component';
import { MovilComponent } from './datos/movil/movil.component';




@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    DatosGeneralesComponent,
    DatosMovilComponent,
    RevisionTecnicaComponent,
    PermisoCirculacionComponent,
    AlineacionComponent,
    BalenceoComponent,
    ControlAguaComponent,
    ControlAceiteComponent,
    ControlCombustibleComponent,
    NeumaticosComponent,
    FrenosComponent,
    PreventivoComponent,
    ReportesComponent,
    SolucionComponent,
    MensajesComponent,
    NotificacionesComponent,
    StockComponent,
    EquipamientoComponent,
    RegistroMovilComponent,
    RegistroConductorComponent,
    OtrosDocumentosComponent,
    CombustibleComponent,
    MovilComponent,
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule,
    ComponentsModule
  ]
})
export class PagesModule { }
