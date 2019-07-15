import { NgModule } from '@angular/core'
import { DashboardSitoPage } from '../../../pages/siti/dashboard-sito/dashboard-sito';
import { IonicModule } from 'ionic-angular';
import { ComponentsModule } from '../../componenti/components.module';
import { AgmCoreModule } from '@agm/core';

@NgModule({
	declarations: [DashboardSitoPage],
	imports: [IonicModule, ComponentsModule, AgmCoreModule],
	exports: [DashboardSitoPage]
})
export class DashboardSitoModule {}
