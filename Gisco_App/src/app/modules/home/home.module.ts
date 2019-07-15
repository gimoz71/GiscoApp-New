import { NgModule } from '@angular/core';
import { HomePage } from '../../pages/home/home';
import { IonicModule } from 'ionic-angular';
import { ComponentsModule} from '../../modules/componenti/components.module';

@NgModule({
	declarations: [HomePage],
	imports: [IonicModule, ComponentsModule],
	exports: [HomePage]
})
export class HomeModule {}
