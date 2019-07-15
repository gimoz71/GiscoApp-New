import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { DashboardDocumentoPage } from '../../../pages/documenti/dashboard-documento/dashboard-documento';

@NgModule({
  declarations: [DashboardDocumentoPage],
  imports: [IonicModule],
	exports: [DashboardDocumentoPage]
})
export class DashboardDocumentoModule {}
