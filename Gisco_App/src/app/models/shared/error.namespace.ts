export namespace Error {

    export class ErrorResponse {
        public Success: boolean;        // Esito della chiamata
        public Data: any;               // Eventuali dati restituiti dal server: possono essere oggetti, array, ecc...
        public Message: string;         // Eventuale messaggio. In caso di Success=false, l'error message viene inserito qui
    }

    export class ErrorData{
        public ErrorType: string;
        public Data: any;
        public message : string;
    }

    export class ErrorMessage {
        public msg_tipo : string;
        public msg_code : number; // 0=success 
        public msg_testo : string;
        public msg_method: string;
        public msg_techdata: string;
    }
}