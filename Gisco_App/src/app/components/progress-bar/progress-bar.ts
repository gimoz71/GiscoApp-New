import { Component, Input } from '@angular/core';

/**
 * Generated class for the ProgressBarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'progress-bar',
    templateUrl: 'progress-bar.html',
    styles: ['progress-bar.scss']
})
export class ProgressBarComponent {

    @Input('progress') progress;

    constructor() {

    }

}
