import { NgModule } from '@angular/core';
import { GiscoDatePipe } from './date.pipe';
import { IonicModule } from 'ionic-angular';

@NgModule({
    imports: [IonicModule],
    declarations: [GiscoDatePipe],
    exports: [GiscoDatePipe],
})

export class PipesModule {

    static forRoot() {
        return {
            ngModule: PipesModule,
            providers: [],
        };
    }
}
