export namespace Comunicazione {

    export class Comunicazione {
        public comunicazioni_key: number;
        public com_procedimento_key: number;
        public com_azienda_key: number;
        public com_data: string;
        public com_titolo: string;
        public com_descrizione: string;
        public com_destinatario: string;
        public com_mittente: string;
        public com_in_out: string;
        public com_visibilita: string;
        public com_protocollo_cod: string;
        public com_protocollo_data: string;
        public com_codice_interno: string;
        public com_firmarichiesta: string;
        public inserito_da: string;
        public tab_tipo_comunicazione_desc: string;
        public tab_verso_comunicazione_desc: string;
        public tab_tipo_documento_desc: string;
        public tab_fase_procedimento_desc: string;
        public pro_titolo: string;
        public az_codice_interno: string;
        public az_ragione_sociale: string;
        public pr_ottemperate: number;
        public pr_vincolate: number;
        public pr_senza_data: number;
        public pr_scadute: number;
        public pr_in_scadenza: number;
        public pr_prossime: number;
        public tab_verso_comunicazione_cod: string;
        public tab_tipo_comunicazione_cod: string;
        public com_intervento_key: number;
        public com_fase_procedimento_cod: number;
        public com_tipo_documento_cod: number;
        public com_comunicazioni_key: number;
        public com_stato_prescrizione: string;
        public prescrizioni: Array<Prescrizione>
        public risponde_a: Array<any>;
        public col_wf: number;
        public col_abs_wf: number;
        public row_abs_wf: number;
        public com_importazioni_key: number;
        public com_files: Array<FileCom>;
        public inserito_il: string;
        public modificato_da: string;
        public modificato_il: string;
        public cancellato_da: any;
        public cancellato_il: string;
        public int_titolo: string;
        public com_com_titolo: any;
        public pr_totali:number;
    }

    export class Prescrizione {
        public prescrizione_key: number;
        public pre_azienda_key: number;
        public pre_comunicazioni_key: number;
        public pre_sgi_attivita_key: number;
        public pre_ente_controllo_key: number;
        public pre_tipo_prescrizione_cod: number;
        public pre_data_emissione: string;
        public pre_descrizione: string;
        public pre_data_realizzazione: string;
        public pre_data_scadenza: string;
        public pre_data_scad_stimata: string;
        public pre_note: string;
        public pre_vincolata: string;
        public pre_vincolo_note: string;
        public pre_vincolo_data: string;
        public pre_con_attivita: string;
        public pre_capo_terzi: string;
        public pre_di_rilevanza: string;
        public pre_tipo_proroga_cod: number;
        public pre_files: Array<FilePre>;
        public col_wf: number;
        public col_abs_wf: number;
        public row_abs_wf: number;
        public pre_importazioni_key: number;
        public inserito_da: string;
        public inserito_il: string;
        public modificato_da: string;
        public modificato_il: string;
        public cancellato_da: string;
        public cancellato_il: string;
        public tab_tipo_prescrizione_desc: string;
        public ec_nominativo: string;
        public tab_fase_procedimento_desc: any;
        public pro_titolo: any;
        public gr_ragione_sociale: any;
        public az_ragione_sociale: string;
        public az_codice_interno: any;
        public az_responsabile_desc: any;
        public az_divisione_desc: any;
        public pre_gruppo_key: number;
        public pre_societa_gestione_key: number;
        public com_titolo: any;
        public com_data: string;
        //   public pre_attivita":[  ],
        // public pre_tipo_proroga":{  },
        //  public count_proroghe":{  },
        public pre_prossima_data_scadenza: string;
        public pre_cogenti_reale_data_scadenza: string;
        public pre_programmate_massima_data_scadenza: string;
        public pre_stato: string;
        public pre_stato_desc: string;
    }

    export class FileCom {
        public comunicazioni_file_key: number;
        public cof_comunicazioni_key: number;
        public cof_file: string;
        public inserito_da: string;
        public inserito_il: string;
        public modificato_da: string;
        public modificato_il: string;
        public cancellato_da: any;
        public cancellato_il: string;
        public azienda_file_key: number;
    }

    export class FilePre {
        public prescrizione_file_key: number;
        public prf_prescrizione_key: number;
        public prf_file: string;
        public inserito_da: string;
        public inserito_il: string;
        public modificato_da: string;
        public modificato_il: string;
        public cancellato_da: any;
        public cancellato_il: string;
    }
}
