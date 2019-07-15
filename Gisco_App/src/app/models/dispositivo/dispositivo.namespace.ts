
export namespace Dispositivo {

    export class Dispositivo {
        public url_icona_tipologia: string;
        public autorizzazione_scadenza: string;
        public dispositivi_key: number;
        public tab_tipo_dispositivo_cod: number;
        public dis_azienda_key: number;
        public dis_titolo: string;
        public dis_data_attivazione: string;
        public dis_data_disattivazione: string;
        public dis_baricentro_n: number;
        public dis_baricentro_e: number;
        public dis_gestore_desc: string;
        public tab_tipo_dispositivo_desc: string;
        public az_ragione_sociale: string;
        public az_codice_interno: string;
        public tab_comune_desc: string;
        public gr_ragione_sociale: string;
        public dis_intervento_key: number;
        public dis_gestore_key: number;
        public dis_descrizione: string;
        public dis_operativo: string;
        public dis_autorizzazione: string;
        public dis_dispositivo_key: number;
        public inserito_da: string;
        public inserito_il: string;
        public modificato_da: string;
        public modificato_il: string;
        public az_codice_commessa: any;
        public dis_cliente_desc: string;
        // dis_azienda: attributi sono tutti null
        // public dis_autorizzazioni: [ ],
        public dis_codice_prevalente: string;
        public dis_autorizzazione_vigente: number;
        public dis_autorizzazione_scadenza: string;
        public dis_autorizzazione_filter: string;
        public attivita_situazione: Dispositivo.AttivitaSituazione;
        public attivita_situazione_order: number;
    }

    export class AttivitaSituazione {
        public dis_azienda_key: number;
        public dispositivi_key: number;
        public dis_data_attivazione: string;
        public dis_autorizzazione: string;
        public dis_operativo: string;
        public att_concluse: number;
        public att_scadute: number;
        public att_prossime: number;
        public att_future: number;
        public att_altre: number;
        public att_tutte: number;
        public att_prescrizioni: number;
    }

    export class Titolarita {
        public disp_titolarita_key: number;
        public dis_dispositivo_key: number;
        public dis_responsabile_key: number;
        public dis_proprietario_key: number;
        public dis_da_data: string;
        public dis_a_data: string;
        public inserito_da: string;
        public inserito_il: string;
        public modificato_da: string;
        public modificato_il: string;
        public dp_nominativo: string;
        public di_ragione_sociale: string;
    }

    export class Autorizzazione {
        
    }

}