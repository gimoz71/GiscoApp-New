import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { IonicSelectableModule } from 'ionic-selectable';
import { DashboardChiusuraPage } from '../../../pages/osservazioni/dashboard-chiusura/dashboard-chiusura';

@NgModule({
	declarations: [DashboardChiusuraPage],
	imports: [IonicModule, IonicSelectableModule],
	exports: [DashboardChiusuraPage]
})
export class DashboardChiusuraModule {}
