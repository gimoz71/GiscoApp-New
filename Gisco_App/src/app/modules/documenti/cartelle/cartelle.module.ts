import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CartellePage } from '../../../pages/documenti/cartelle/cartelle';

@NgModule({
  declarations: [CartellePage],
  imports: [IonicModule],
	exports: [CartellePage]
})
export class CartelleModule {}
