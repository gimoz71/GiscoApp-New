import { NgModule } from '@angular/core'
import { IonicModule } from 'ionic-angular';
import { ComponentsModule } from '../../componenti/components.module';
import { AgmCoreModule } from '@agm/core';
import { DashboardComunicazionePage } from '../../../pages/comunicazioni/dashboard-comunicazione/dashboard-comunicazione';

@NgModule({
	declarations: [DashboardComunicazionePage],
	imports: [IonicModule, ComponentsModule, AgmCoreModule],
	exports: [DashboardComunicazionePage]
})
export class DashboardComunicazioneModule {}
