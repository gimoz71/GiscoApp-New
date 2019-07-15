

import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { IonicSelectableModule } from 'ionic-selectable';
import { DashboardAttivitaPage } from '../../../pages/attivita/dashboard-attivita/dashboard-attivita';

@NgModule({
	declarations: [DashboardAttivitaPage],
	imports: [IonicModule, IonicSelectableModule],
	exports: [DashboardAttivitaPage]
})
export class DashboardAttivitaModule {}
