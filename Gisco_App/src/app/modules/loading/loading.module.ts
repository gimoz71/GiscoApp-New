import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CommonModule } from '@angular/common';

import { LoadingPage } from '../../pages/loading/loading';


@NgModule({
	declarations: [
		LoadingPage
	],
	imports: [
		IonicModule,
		CommonModule
	],
	exports: [
		LoadingPage
	],
	providers: [
		
	]
})
export class LoadingModule {} 

