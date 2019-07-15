import { Error } from "./error.namespace";
import { Sito } from "../sito/sito.namespace";
import { Dispositivo } from "../dispositivo/dispositivo.namespace";
import { Filtro } from "../filtro/filtro.namespace";
import { Documento } from "../documento/documento.namespace";
import { Messaggio } from "../messaggio/messaggio.namespace";
import { Dipendente } from "../dipendente/dipendente.namespace";
import { Procedimento } from "../procedimento/procedimento.namespace";
import { Comunicazione } from "../comunicazione/comunicazione.namespace";
import { Osservazione } from "../osservazione/osservazione.namespace";
import { Attivita } from "../attivita/attivita.namespace";

export namespace Http {
    export class HttpResponse {
        public Success: boolean;        // Esito della chiamata
        public ErrorMessage: Error.ErrorMessage;       // oggetto errore 
        public Message: string;
        public result_key: number; // la chiave di un'osservazione salvata

        public l_lista_siti: Array<Sito.Sito>;
        public sito: Sito.Sito;
        public catastale_situazione: Array<Sito.Catastale>;
        public prescrizioni_situazione: Array<Sito.Procedimento>;

        public l_lista_dispositivi: any;
        public dispositivo: Dispositivo.Dispositivo;
        public titolarita: Array<Dispositivo.Titolarita>;
        public autorizzazioni: Array<Dispositivo.Autorizzazione>;

        public l_lista_tipologie: Array<any>;// è usato anche per le categorie di un'attività
        public l_dropdown: Array<Filtro.Provincia>;

        public l_lista_cartelle: Array<Documento.Cartella>;
        public l_lista_documenti: Array<Documento.Documento>;
        public documento: Documento.Documento;

        public l_lista_messaggi: Array<Messaggio.Messaggio>;
        public l_dipendenti: Array<Dipendente.Dipendente>;
        public messaggio: Messaggio.Messaggio;
        public dipendente: Dipendente.Dipendente;

        public l_lista_procedimenti: Array<Procedimento.Procedimento>;
        public procedimento: Procedimento.Procedimento;
        public fasi: Array<Procedimento.Fase>;
        public personalizzazioni: Array<Procedimento.Personalizzazione>;
        public l_lista_comunicazioni: Array<Array<Comunicazione.Comunicazione>>;
        public comunicazione: Comunicazione.Comunicazione;
        public prescrizione: Comunicazione.Prescrizione;

        public l_lista_osservazioni: Array<Osservazione.Osservazione>;
        public osservazione: Osservazione.Osservazione;
        public c_assegnazioni: Array<Osservazione.Assegnazione>;
        public l_lista_immagini: Array<Osservazione.Immagine>;
        public c_proprieta_personalizzate: Array<any>//Array<Osservazione.ProprietaPersonalizzata>;Array<Osservazione.ProprietaPersonalizzataChiusura>
        public l_lista_commenti: Array<Osservazione.Commento>;

        public l_lista_attivita: Array<Attivita.Attivita>;
        public attivita: Attivita.Attivita;
        public att_data_fine_effettiva: string;
        public att_data_inizio_effettiva: string;
        public att_descrizione: string;
    }
}