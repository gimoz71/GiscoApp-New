import { Geolocation, GeolocationOptions} from '@ionic-native/geolocation/ngx';
import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class GeolocatedService {

    private options: GeolocationOptions;
    //private currentPos: Geoposition;

    public coordinatesSubject: Subject<boolean> = new Subject<boolean>();
    public coordObservable: Observable<boolean> = this.coordinatesSubject.asObservable();

    constructor(
        private geolocation: Geolocation
    ) {

        // this.options = {
        //     enableHighAccuracy: true
        // };
        // this.geolocation.getCurrentPosition(this.options).then((pos: Geoposition) => {
        //     this.currentPos = pos;
        //     console.log(pos);
        //     this.coordinatesSubject.next(true);
        // }, (err: PositionError) => {
        //     console.log("error : " + err.message);
        // });
    }

    public getCurrentPos() {
        this.options = {
            enableHighAccuracy: true
        };
        return this.geolocation.getCurrentPosition(this.options);
    }
}