import { NgModule } from '@angular/core'
import { DashboardDispositivoPage } from '../../../pages/dispositivi/dashboard-dispositivo/dashboard-dispositivo';
import { IonicModule } from 'ionic-angular';
import { ComponentsModule } from '../../componenti/components.module';
import { AgmCoreModule } from '@agm/core';

@NgModule({
	declarations: [DashboardDispositivoPage],
	imports: [IonicModule, ComponentsModule, AgmCoreModule],
	exports: [DashboardDispositivoPage]
})
export class DashboardDispositivoModule {}
