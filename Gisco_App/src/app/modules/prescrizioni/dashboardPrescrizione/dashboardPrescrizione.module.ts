import { NgModule } from '@angular/core'
import { IonicModule } from 'ionic-angular';
import { ComponentsModule } from '../../componenti/components.module';
import { AgmCoreModule } from '@agm/core';
import { DashboardPrescrizionePage } from '../../../pages/prescrizioni/dashboard-prescrizione/dashboard-prescrizione';

@NgModule({
	declarations: [DashboardPrescrizionePage],
	imports: [IonicModule, ComponentsModule, AgmCoreModule],
	exports: [DashboardPrescrizionePage]
})
export class DashboardPrescrizioneModule {}
