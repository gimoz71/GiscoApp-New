export namespace Messaggio {

    export class MessaggioErrore {
        public msg_tipo: string;
        public msg_code: number;
        public msg_testo: string;
        public msg_method: string;
        public msg_techdata: string;
    }
    /*
        //elemento lista messaggi
      export class MessaggiElem {
            messaggi_key : number;
            mittente_key : number;
            destinatario_key: number;
            data : string;
            soggetto : string;
            messaggio : string;
            preferito: string;
            stato_lettura: string;
            stato_messaggio : string;
            cognome_mit : string;
            nome_mit : string;
            cognome_des : string;
            nome_des : string; 
            }
    
        export class MessaggiList{
            public ErrorMessage : MessaggiErrore;
            public l_lista_messaggi : MessaggiElem[];
            public totale_messaggi : number;
            public token : string;
            public result : string;
        }*/


    /*  export class MessaggioResult
      {
          public ErrorMessage : MessaggiErrore;
          public result : string;
          public result_key : number;
          }*/

    export class BustaMessaggio {
        messaggio: Messaggio;
        c_conoscenza: Array<Conoscenza>;
        operazione: string;
        messaggio_op_key: number;
        token: string;
        ErrorMessage: MessaggioErrore;
    }

    export class Messaggio {
        messaggi_key: number;
        mittente_key: number;
        destinatario_key: number;
        data: string;
        soggetto: string;
        messaggio: string;
        preferito: string;
        stato_lettura: string;
        stato_messaggio: string;
        cognome_mit: string;
        nome_mit: string;
        cognome_des: string;
        nome_des: string;
    }

    export class Conoscenza {
        dipendente_key: number;
        nominativo: string;
    }
}