import { Osservazione } from "../osservazione/osservazione.namespace";

export namespace Attivita {

    export class Attivita {//l'oggetto è preso con la chiamata get chiusura attività potrebbe essere diverso da quello che ricevo con la chiamata gel_elenco_attivita
       public att_nome_sito: string;
       public attivita_key: number;
       public att_attivita_key: number;
       public att_azienda_key: number;
       public att_titolo: string;
       public att_descrizione: string;
       public att_data_inizio_prev: string;
       public att_data_fine_prev: string;
       public att_data_scadenza: string;
       public att_conclusa: string;
       public att_tipo_attivita_cod: number;
       public att_tipo_scadenza_cod: number;
       public att_emergenza: string;
       public att_firma_richiesta: string;
       public tab_tipo_attivita_desc: string;
       public tab_tipo_scadenza_desc: string;
       public att_frequenza_cod: number;
       public az_codice_interno: string;
       public az_ragione_sociale: string;
       public gruppo_key: number;
       public gr_ragione_sociale: string;
       public societa_gestione_key: number;
       public att_dispositivo_key: number;
       public dis_titolo: string;
       public tab_tipo_dispositivo_cod: number;
       public tab_tipo_dispositivo_desc: string;
       public att_data_fine_effettiva: string;
       public att_data_inizio_effettiva: string;
       public att_stato_attivita_cod: number;
       public att_attivita_modulo_chiusura_key: number;
       public commenti_num: number;
       public assegnata_num: number;
       public tab_stato_attivita_desc: string;
       public att_efficacia_azione_key: number;
       public att_protocollo: string;
    }

    export class ws_Attivita_Chiusura {
       public attivita: Attivita.Attivita;
       public token: string;
       public att_data_fine_effettiva: string;
       public att_data_inizio_effettiva: string;
       public att_descrizione: string;
       public c_proprieta_personalizzate: Array<Osservazione.ProprietaPersonalizzataChiusura>;
    }

    export class Immagine {
        public immagini_key: number;
        public img_foreign_key: number;
        public img_foreign_type: any;
        public img_data: string;
        public img_tipo: any;
        public img_titolo: any;
        public img_file: any;
        public img_cartella: any;
        public img_url: any;
        public img_descrizione: any;
        public img_pubblicato: any;
        public inserito_da: any;
        public inserito_il: string;
        public modificato_da: any;
        public modificato_il: string;
        //public att_protocollo: string;
    }

    export class ws_SendImage {
        public token: string;
        public oggetto_key: number;
        public tipologia: any;
        public immagine: any;
    }

    export class ws_Immagine {
        public immagine: Immagine;
        public token: string;
        public errorMessage: any;
    }
    export class Commento {
        public dipendenti: Dipendenti;
        public c_commenti: Array<any>;
        public commenti_key: number;
        public com_foreign_key: number;
        public com_foreign_type: string;
        public com_sito_key: number;
        public com_data: string;
        public com_descrizione: string;
        public com_pubblicato: string;
        public com_dipendente_key: number;
        public com_nominativo: string;
        public com_commento_key: number;
        public inserito_da: string;
        public inserito_il: string;
        public modificato_da: string;
        public modificato_il: string;
        public cancellato_da: string;
        public cancellato_il: string;
    }

    export class ws_Commento {
        public commento: Commento;
        public token: string;
    }

    export class Dipendenti {
        public dipendenti_key: number;
        public dp_sede_assegnata_key: number;
        public dp_divisione_key: number;
        public dp_ufficio_key: number;
        public dp_aree_aziendali_key: number;
        public dp_nome: string;
        public dp_cognome: string;
        public dp_telefono: string;
        public dp_cellulare: string;
        public dp_email: string;
        public tab_ruolo_aziendale_cod: number;
        public dp_note: string;
        public dp_foto: any;
        public dp_attivo: any;
        public dp_attivo_filter: string;
        public dp_matricola: any;
        public dp_codicefiscale: any;
        public inserito_da: any;
        public inserito_il: string;
        public modificato_da: any;
        public modificato_il: string;
        public dp_aree_aziendali_desc: any;
        public dp_ruolo_aziendale_desc: any;
        public dp_dipendente_di: any;
        public dp_profilo: any;
        public dp_profilo_siti: any;
        public dp_data_scadenza: string;
        public dp_data_ultimo_accesso: string;
        public dp_data_scadenza_for_order: string;
        public p_data_ultimo_accesso_for_order: string;
    }


}
