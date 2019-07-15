import { NgModule } from '@angular/core'
import { IonicModule } from 'ionic-angular';
import { TipologiePage } from '../../../pages/documenti/elenco-tipologie/elenco-tipologie';

@NgModule({
	declarations: [TipologiePage],
	imports: [IonicModule],
	exports: [TipologiePage]
})
export class ElencoTipologieModule {}
