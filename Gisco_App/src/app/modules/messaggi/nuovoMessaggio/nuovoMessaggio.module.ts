

import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { NuovoMessaggioPage } from '../../../pages/messaggi/nuovo-messaggio/nuovo-messaggio';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
	declarations: [NuovoMessaggioPage],
	imports: [IonicModule, IonicSelectableModule],
	exports: [NuovoMessaggioPage]
})
export class NuovoMessaggioModule {}
