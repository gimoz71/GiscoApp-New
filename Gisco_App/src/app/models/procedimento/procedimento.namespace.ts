import { Societa } from '../societa/societa.namespace';

export namespace Procedimento {

    export class Procedimento {
        public pr_totali: number;
        public com_azienda_key: number;
        public com_procedimento_key: number;
        public pro_titolo: string;
        public pro_tipo_procedimento_cod: number;
        public pro_chiuso: string;
        public tab_tipo_procedimento_desc: string;
        public pr_ottemperate: number;
        public pr_vincolate: number;
        public pr_senza_data: number;
        public pr_scadute: number;
        public pr_in_scadenza: number;
        public pr_prossime: number;
        public pro_data_avvio: string;
        public az_codice_interno: string;
        public az_ragione_sociale: string;
        public comunicazioni: number;
        public stato_prescrizioni: StatoPrescrizioni;
        public pro_azienda_key: number;
        public procedimento_key: number;
        public pro_da_data_esecuzione: string;
        public pro_a_data_esecuzione: string;
        public pro_descrizione: string;
        public pro_chiuso_autocertificazione: string;
        public pro_note: string;
        public tab_cause_apertura_sito_desc: string;
        public tab_cause_notifica_desc: string;
        public ente_controllo: string;
    }

  export class StatoPrescrizioni {
        public com_azienda_key: number;
        public com_procedimento_key: number;
        public pro_titolo: string;
        public pro_tipo_procedimento_cod: number;
        public pro_chiuso: string;
        public pro_data_avvio: string;
        public tab_tipo_procedimento_desc: string;
        public az_codice_interno: string;
        public az_ragione_sociale: string;
        public pr_ottemperate: number;
        public pr_vincolate: number;
        public pr_senza_data: number;
        public pr_scadute: number;
        public pr_in_scadenza: number;
        public pr_prossime: number;
        public comunicazioni: number;
    }

    export class Fase {
        public procedimento_fasi_key: number;
        public pf_procedimento_key: number;
        public pf_fase_procedimento_cod: number;
        public pf_fase_procedimento_aggr: string;
        public inserito_da: string;
        public inserito_il: string;
        public modificato_da: string;
        public modificato_il: string;
        public tab_fase_procedimento_desc: string;
        public tab_tipo_procedimento_rpt_hdn: string;
        public step_avanzamento: Array<Avanzamento>;
        public perc_avanzamento: number;
    }

    export class Avanzamento {
        public procedimento_step_key: number;
        public ps_procedimento_fasi_key: number;
        public ps_fase_procedimento_step_cod: number;
        public ps_inizio: string;
        public ps_fine: string;
        public ps_note: string;
        public inserito_da: string;
        public inserito_il: string;
        public modificato_da: string;
        public modificato_il: string;
        public tab_fase_procedimento_step: TabFaseProcedimentoStep;
        public step_attivita: any;
    }

    export class TabFaseProcedimentoStep {
        public tab_fase_procedimento_step_cod: number;
        public tab_fase_procedimento_step_desc: string;
        public tab_fase_procedimento_cod: number;
        public tab_fase_procedimento_step_order: number;
        public tab_fase_procedimento_step_peso: number;
        public tab_fase_procedimento_step_last: string;
        public tab_fase_procedimento_step_jolly: string;
        public inserito_da: string;
        public inserito_il: string;
        public modificato_da: string;
        public modificato_il: string;
    }

    export class Personalizzazione {
        public tp_valori:Array<PersonalizzazioneValore>;
        public tp_valore: string;
        public tab_tipo_procedimento_cod: number;
        public tp_scheda_testo: string;
        public tp_tipo_campo: string;
        public tp_order: number;
        public tp_procedimento_keyv
        public tp_valore_d: string;
        public tp_valore_n: number;
        public tp_valore_t: any;
    }

    export class PersonalizzazioneValore {
        public tp_valore_scelto: string;
        public tab_tipo_procedimento_cod: number;
        public tipo_procedimento_proprieta_key: number;
        public tp_proprieta: string;
        public tp_tipologia: string;
        public tp_order: number;
        public tp_procedimento_key: number;
        public tp_proprieta_valori_key: number;
        public tp_testo: string;
        public tp_valore: string;
    }

}