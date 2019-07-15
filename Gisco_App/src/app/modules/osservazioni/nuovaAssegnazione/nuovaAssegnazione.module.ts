import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { IonicSelectableModule } from 'ionic-selectable';
import { NuovaAssegnazionePage } from '../../../pages/osservazioni/nuova-assegnazione/nuova-assegnazione';

@NgModule({
	declarations: [NuovaAssegnazionePage],
	imports: [IonicModule, IonicSelectableModule],
	exports: [NuovaAssegnazionePage]
})
export class NuovaAssegnazioneModule {}
