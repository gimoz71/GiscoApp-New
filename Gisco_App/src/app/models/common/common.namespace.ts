export namespace Common {

    export class Url {
        public ComunicazioneID: number;
        public ComunicazioneGiorno: number;
        public ComunicazioneMese: number;
        public ComunicazioneMeseString: string;
        public ComunicazioneAnno: number;
        public ComunicazioneTitolo: string; 
        public ComunicazioneProvenienza: string;
    }

    export class MapModel {
        public centerLat: number;
        public centerLon: number;
        public initialZoom: number;
        public markers: MapMarker[];
    }

    export class MapMarker {
        public lat: number;
        public lgn: number;
        public lab: string;
        public draggable: boolean;
    }
}