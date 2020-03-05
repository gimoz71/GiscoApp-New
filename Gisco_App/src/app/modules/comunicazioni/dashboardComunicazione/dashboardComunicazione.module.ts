import { NgModule } from '@angular/core'
import { IonicModule } from 'ionic-angular';
import { ComponentsModule } from '../../componenti/components.module';
import { AgmCoreModule } from '@agm/core';
import { DashboardComunicazionePage } from '../../../pages/comunicazioni/dashboard-comunicazione/dashboard-comunicazione';
import { PipesModule } from '../../../pipes/pipes.module';
import { File } from '@ionic-native/file/ngx';

@NgModule({
	declarations: [DashboardComunicazionePage],
	imports: [IonicModule, ComponentsModule, AgmCoreModule,
		PipesModule],
	providers: [File],
	exports: [DashboardComunicazionePage]
})
export class DashboardComunicazioneModule { }
