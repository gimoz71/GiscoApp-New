import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';

import { LoginPage } from '../../pages/login/login';

@NgModule({
	declarations: [
		LoginPage
	],
	imports: [
		IonicModule,
		CommonModule
	],
	exports: [
		LoginPage
	],
	providers: [
	]
})
export class LoginModule {}
