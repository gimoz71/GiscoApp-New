import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { IonicModule } from 'ionic-angular';

// #REGION - Componenti
import { MapComponent } from '../../components/map/map.component';
import { ProgressBarComponent } from '../../components/progress-bar/progress-bar';

@NgModule({
    declarations: [MapComponent, ProgressBarComponent],
	imports: [IonicModule, AgmCoreModule],
	exports: [IonicModule,
        MapComponent, ProgressBarComponent]
})
export class ComponentsModule {}
