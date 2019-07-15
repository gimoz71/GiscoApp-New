export namespace Osservazione {

    export class Osservazione {
        public attivita_key: number;
        public att_azienda_key: number;
        public att_titolo: string;
        public att_descrizione: string;
        public data_segnalazione: string;
        public att_conclusa: string;
        public att_tipo_scadenza_cod: number;
        public att_emergenza: string;
        public tab_tipo_attivita_desc: string;
        public tab_tipo_scadenza_desc: string;
        public az_codice_interno: string;
        public az_ragione_sociale: string;
        public gruppo_key: number;
        public societa_gestione_key: number;
        public att_dispositivo_key: number;
        public dis_titolo: string;
        public tab_tipo_dispositivo_cod: number;
        public tab_tipo_dispositivo_desc: string;
        public att_data_fine_effettiva: string;
        public att_data_inizio_effettiva: string;
        public att_stato_attivita_cod: number;
        public num_non_conformita_chiuse: number;
        public num_non_conformita_nonris: number;
        public num_non_conformita_ris: number;
        public att_protocollo: string;
    }

    export class Assegnazione {
        public attivita_permessi_key: number;
        public attivita_key: number;
        public att_ditta_key: number;
        public att_dip_attivo: string;
        public att_dip_scelta: string;
        public dipendenti_key: number;
        public dp_nome: string;
        public dp_cognome: string;
        public dp_email: string;
        public di_ragione_sociale: string;
        public gruppo_key: number;
        public gr_ragione_sociale: string;
        public societa_gestione_key: number;
        public sg_ragione_sociale: string;
        public tab_ruolo_aziendale_desc: string;
    }

    export class ws_Osservazione {
        public osservazione: Osservazione.Osservazione;
        public c_assegnazioni: Array<Assegnazione>;
        public c_proprieta_personalizzate: Array<ProprietaPersonalizzata>;
        public token: string;
    }

    export class ws_Osservazione_Chiusura {
        public osservazione: Osservazione.Osservazione;
        public token: string;
        public att_data_fine_effettiva: string;
        public att_data_inizio_effettiva: string;
        public att_descrizione: string;
        public c_proprieta_personalizzate: Array<ProprietaPersonalizzataChiusura>;
    }

    export class ws_Assegnazione {
        public attivita_key: number;
        public assegnazione: Assegnazione;
        public token: string;
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

    export class AttivitaProprieta {
        public tab_tipo_attivita_cod: number;
        public tab_categoria_attivita_cod: number;
        public tipo_attivita_proprieta_key: number;
        public tipo_attivita_proprieta_valori_key: number;
        public ta_attivita_key: number;
        public ta_proprieta_valori_key: number;
        public attivita_pers_proprieta_key: number;
        public ta_proprieta: any;
        public ta_tipologia: any;
        public ta_order: number;
        public ta_testo: any;
        public ta_valore: any;
    }
 
    export class Valore {
        public attivita_proprieta: AttivitaProprieta;
        public ta_selected: string;
        public tipo_attivita_proprieta_key: number;
        public tipo_attivita_proprieta_valori_key: number;
        public ta_testo: string;
        public ta_valore: string;
    }

    export class ProprietaPersonalizzata {
        public c_valori: Array<Valore>;
        public attivita_valori: AttivitaValori;
        public tab_tipo_attivita_cod: number;
        public tab_categoria_attivita_cod: number;
        public tipo_attivita_proprieta_key: number;
        public ta_proprieta: string;
        public ta_tipologia: string;
        public ta_order: number;
    }

    export class AttivitaValori {
        public tab_tipo_attivita_cod: number;
        public tab_categoria_attivita_cod: number;
        public tipo_attivita_proprieta_key: number;
        public ta_attivita_key: number;
        public attivita_pers_valori_key: number;
        public ta_proprieta: any;
        public ta_tipologia: any;
        public ta_order: number;
        public ta_valore_d: string;
        public ta_valore_n: number;
        public ta_valore_t: any;
        public ta_unita_misura_cod: number;
        public tab_unita_misura_desc: any;
    }

    export class ProprietaPersonalizzataChiusura {
        public c_valori: Array<ValoreChiusura>;
        public attivita_modulo_valori: AttivitaModuloValoriChiusura;
        public tam_attivita_modulo_chiusura_key: number;
        public tipo_attivita_modulo_proprieta_key: number;
        public tam_proprieta: string;
        public tam_tipologia: string;
        public tam_order: number;
    }

    export class AttivitaModuloValoriChiusura {
        public tam_attivita_modulo_chiusura_key: number;
        public tipo_attivita_modulo_proprieta_key: number;
        public tac_attivita_key: number;
        public attivita_chiusura_valori_key: number;
        public tam_proprieta: any;
        public tam_tipologia: any;
        public tam_order: number;
        public tac_valore_d: string;
        public tac_valore_n: number;
        public tac_valore_t: any;
        public ta_unita_misura_cod: number;
        public tab_unita_misura_desc: any;
    }

    
    export class ValoreChiusura {
        public attivita_modulo_proprieta: AttivitaModuloProprietaChiusura;
        public tam_selected: string;
        public tipo_attivita_modulo_proprieta_key: number;
        public tipo_attivita_modulo_proprieta_valori_key: number;
        public tam_testo: string;
        public tam_valore: string;
    }

    export class AttivitaModuloProprietaChiusura {
        public tam_attivita_modulo_chiusura_key: number;
        public tipo_attivita_modulo_proprieta_key: number;
        public tipo_attivita_modulo_proprieta_valori_key: number;
        public tac_attivita_key: number;
        public tac_proprieta_valori_key: number;
        public attivita_chiusura_proprieta_key: number;
        public tam_proprieta: any;
        public tam_tipologia: any;
        public tam_order: number;
        public tam_testo: any;
        public tam_valore: any;
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