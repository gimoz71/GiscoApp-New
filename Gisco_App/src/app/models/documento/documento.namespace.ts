export namespace Documento {

    export class Cartella {
        public sistemi: number;
        public doc_foreign_type: string;
        public tab_cartelle_documenti_desc: string;
        public tab_tipo_documento_cod: number;
        public tab_tipo_documento_desc: string;
        public doc_azienda_key: number;
    }

    export class Documento {
        public doc_versione: string;
        public doc_url: string;
        public documenti_key: number;
        public tab_tipo_documento_cod: number;
        public doc_azienda_key: number;
        public doc_foreign_key: number;
        public doc_foreign_type: string;
        public doc_titolo: string;
        public doc_data: string;
        public doc_protocollo: string;
        public doc_descrizione: string;
        public doc_procedimento_key: number;
        public doc_sistema_gestione_key: number;
        public doc_data_scadenza: string;
        public doc_codice: string;
        public pro_titolo: string;
        public tab_tipo_documento_desc: string;
        public az_ragione_sociale: string;
        public az_codice_interno: string;
        public gr_ragione_sociale: string;
        public sige_titolo: string;
        public ultima_rev: UltimaRevisione;
    }

    export class UltimaRevisione {
        public doc_userfolder: string;
    }


}