import { NgModule } from '@angular/core'
import { IonicModule } from 'ionic-angular';
import { ComponentsModule } from '../../componenti/components.module';
import { AgmCoreModule } from '@agm/core';
import { DashboardProcedimentoPage } from '../../../pages/procedimenti/dashboard-procedimento/dashboard-procedimento';

@NgModule({
	declarations: [DashboardProcedimentoPage],
	imports: [IonicModule, ComponentsModule, AgmCoreModule],
	exports: [DashboardProcedimentoPage]
})
export class DashboardProcedimentoModule {}
