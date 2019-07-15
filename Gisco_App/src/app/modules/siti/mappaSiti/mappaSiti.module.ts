import { AgmCoreModule } from '@agm/core';
import { NgModule } from '@angular/core'
import { MappaSitiPage } from '../../../pages/siti/mappa-siti/mappa-siti';
import { ComponentsModule } from '../../componenti/components.module';
import { IonicModule } from 'ionic-angular';

@NgModule({
	declarations: [MappaSitiPage],
	imports: [IonicModule, ComponentsModule, AgmCoreModule],
	exports: [MappaSitiPage]
})
export class MappaSitiModule {}
