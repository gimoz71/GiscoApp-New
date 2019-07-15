import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core'
import { ComponentsModule } from '../../componenti/components.module';
import { IonicModule } from 'ionic-angular';
import { MappaDispositiviPage } from '../../../pages/dispositivi/mappa-dispositivi/mappa-dispositivi';

@NgModule({
	declarations: [MappaDispositiviPage],
	imports: [IonicModule, ComponentsModule, AgmCoreModule],
	exports: [MappaDispositiviPage]
})
export class MappaDispositiviModule {}
