import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { MouseEvent } from '@agm/core';

import { Common } from '../../models/common/common.namespace';

@Component({
    selector: 'map-component',
    templateUrl: './map.component.htm',
    styles: ['./map.component.scss']
})
export class MapComponent implements OnInit{

    @Input() mapModel: Common.MapModel;
    @Output() onMarkerClicked: EventEmitter<any> = new EventEmitter();
    
    // google maps zoom level
    zoom: number = 8;

    // initial center position for the map
    lat: number;
    lng: number;

    public markers: Array<Common.MapMarker>;

    constructor(){}

    public ngOnInit(): void {
        this.markers = this.mapModel.markers;
        this.lat = this.mapModel.centerLat;
        this.lng = this.mapModel.centerLon;
        this.zoom = this.mapModel.initialZoom;
    }

    public clickedMarker(label: string, index: number): void  {
        console.log(`clicked the marker: ${label || index}`)
        this.onMarkerClicked.emit(index);
    }

    public mapClicked($event: MouseEvent): void {
        
    }

    markerDragEnd(m: Common.MapMarker, $event: MouseEvent) {
        console.log('dragEnd', m, $event);
    }

}
