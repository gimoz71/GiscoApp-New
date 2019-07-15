

import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { IonicSelectableModule } from 'ionic-selectable';
import { DashboardOsservazionePage } from '../../../pages/osservazioni/dashboard-osservazione/dashboard-osservazione';

@NgModule({
	declarations: [DashboardOsservazionePage],
	imports: [IonicModule, IonicSelectableModule],
	exports: [DashboardOsservazionePage]
})
export class DashboardOsservazioneModule {}
