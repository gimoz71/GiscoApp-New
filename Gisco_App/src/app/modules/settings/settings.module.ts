

import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { IonicSelectableModule } from 'ionic-selectable';
import { SettingsPage } from '../../pages/settings/settings';

@NgModule({
	declarations: [SettingsPage],
	imports: [IonicModule, IonicSelectableModule],
	exports: [SettingsPage]
})
export class SettingsModule {}
