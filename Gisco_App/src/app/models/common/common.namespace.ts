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

    export class NotificaList {
        public notifica_count: number;
        public notifica_type: string;
    }

    export class PrescrizioniChartData {
        public pr_ottemperate: number;
        public pr_vincolate: number;
        public pr_senza_data: number;
        public pr_scadute: number;
        public pr_in_scadenza: number;
        public pr_prossime: number;
        public pr_label_ottemperate: string;
        public pr_label_vincolate: string;
        public pr_label_senza_data: string;
        public pr_label_scadute: string;
        public pr_label_in_scadenza: string;
        public pr_label_prossime: string;
        public pr_colore_ottemperate: string;
        public pr_colore_vincolate: string;
        public pr_colore_senza_data: string;
        public pr_colore_scadute: string;
        public pr_colore_in_scadenza: string;
        public pr_colore_prossime: string;
    }

    export class AttivitaChartData {

        public ws_colore: string;
        public at_totali: number;
        public att_azienda_key: number;
        public att_tipo_attivita_cod: number;
        public tab_tipo_attivita_desc: string;
        public at_scadute: number;
        public at_in_scadenza: number;
        public at_future: number;
    }
    
}