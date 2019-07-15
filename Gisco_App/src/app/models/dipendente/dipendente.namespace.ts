export namespace Dipendente {
  /*  export class ContactDataFull {
        public ErrorMessage : {
            msg_code: number;
            msg_method: string;
            msg_techdata: string;
            msg_testo: string;
            msg_tipo: string;
        };
        public dipendente : Dipendente;
        public ws_result : string;
        public ws_token: string;
    }*/
    export class Dipendente{
        public attivo : string;
        public cellulare: string;
        public cogn_resp_divisione: string;
        public cogn_resp_reparto: string;
        public cogn_resp_ufficio: string;
        public cognome: string;
        public dipendenti_key: number;
        public divisione: string;
        public email: string;
        public email_resp_divisione: string;
        public email_resp_reparto: string;
        public email_resp_ufficio: string;
        public foto: string;
        public matricola: string;
        public nome: string;
        public nome_resp_divisione: string;
        public nome_resp_reparto: string;
        public nome_resp_ufficio: string;
        public reparto: string;
        public ruolo_aziendale: string;
        public telefono: string;
        public ufficio: string;
        public l_sedi : Array<Sede>;
        public url_avatar : string;
        public nomeCognome : string;
    }
    export class Sede{
        public cap: string;
        public comune : string;
        public dipendenti_key : number;
        public email : string;
        public indirizzo : string;
        public localita : string;
        public nome : string;
        public provincia : string;
        public sedi_key : number;
        public telefono : string;
        public tipo_sede: string;
    }

    

    /*export class ContactDataMin{
        public attivo : string;
        public cellulare : string;
        public cognome : string;
        public dipendenti_key : number;
        public divisione : string;
        public email : string;
        public foto : string;
        public matricola : string;
        public nome : string;
        public reparto : string;
        public ruolo_aziendale : string;
        public telefono : string;
        public ufficio : string;
        public url_avatar : string;
        public nomeCognome : string;
    }*/

   /* export class ContactList {
        public ErrorMessage: {
            msg_tipo : string;
            msg_code : number;
            msg_testo : string;
            msg_method : string;
            msg_techdata : string;
        };
        
        public l_dipendenti : ContactDataMin[];
        public token : string;
        public result : string;
        }*/
}