import { NgModule } from '@angular/core'
import { IonicModule } from 'ionic-angular';
import { ComponentsModule } from '../../componenti/components.module';
import { AgmCoreModule } from '@agm/core';
import { DashboardProfiloPage } from '../../../pages/profilo/dashboard-profilo';

@NgModule({
	declarations: [DashboardProfiloPage],
	imports: [IonicModule, ComponentsModule, AgmCoreModule],
	exports: [DashboardProfiloPage]
})
export class DashboardProfiloModule {}
