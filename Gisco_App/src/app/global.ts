export const GlobalVariable = Object.freeze({
    BASE_API_URL: 'http://testapp.piattaformagisco.com/services/',
    URL_SEPARATOR: '/',
    URL_TOKEN_PLACEHOLDER: 'TOKEN',
    URL_CHECK_TOKEN: 'checktoken',

    SITI_GET_ELENCO_KEYWORD: 'get_elenco_siti',
    SITI_GET_TIPOLOGIE_KEYWORD: 'get_tipologie_siti',
    SITI_GET_KEYWORD: 'get_sito',

    DISPOSITIVI_GET_ELENCO_KEYWORD: 'get_elenco_dispositivi',
    DISPOSITIVI_GET_KEYWORD: 'get_dispositivo',
    DISPOSITIVI_GET_TIPOLOGIE_KEYWORD: 'get_tipologie_dispositivi',

    DOCUMENTI_GET_CARTELLE_KEYWORD: 'get_cartelle_documenti',
    DOCUMENTI_GET_TIPOLOGIA_KEYWORD: 'get_tipologia_documenti',
    DOCUMENTI_GET_ELENCO_KEYWORD: 'get_elenco_documenti',
    DOCUMENTI_GET_KEYWORD: 'get_documento',

    GET_PROVINCE_KEYWORD: 'get_dropdown',

    MESSAGGI_GET_ELENCO_KEYWORD: 'get_elenco_messaggi',
    MESSAGGI_GET_KEYWORD: 'get_messaggio',
    MESSAGGI_SET_UNREAD_KEYWORD: 'set_unread_message',//Mette a non letto il messaggio
    MESSAGGI_SET_STAR_KEYWORD: 'set_star_message',//Mette o toglie dai preferito
    MESSAGGI_SET_DELETED_KEYWORD: 'set_deleted_message',//Mette nel cestino
    MESSAGGI_DELET_KEYWORD: 'del_message',//Cancella dal cestino
    MESSAGGI_SALVA_KEYWORD: 'put_message',//Salva un nuovo messagio
    MESSAGGI_GET_CONTATTI_KEYWORD: 'get_elenco_dipendenti',//get lista contatti

    PROFILO_GET_SCHEDA_KEYWORD: 'get_scheda_dipendente',
    PROFILO_CHANGE_PSW_KEYWORD: 'change_password',
    PROFILO_CHANGE_AVATAR_KEYWORD: 'change_avatar',

    PROCEDIMENTI_GET_ELENCO_KEYWORD: 'get_elenco_procedimenti',
    PROCEDIMENTI_GET_TIPOLOGIE_KEYWORD: 'get_tipologie_procedimenti',
    PROCEDIMENTI_GET_KEYWORD: 'get_procedimento',

    COMUNICAZIONI_GET_ELENCO_KEYWORD: 'get_elenco_comunicazioni',
    COMUNICAZIONI_GET_KEYWORD: 'get_comunicazione',
    PRESCRIZIONE_GET_KEYWORD: 'get_prescrizione',

    OSSERVAZIONI_GET_ELENCO_KEYWORD: 'get_elenco_osservazioni',
    OSSERVAZIONI_GET_KEYWORD: 'get_osservazione',
    OSSERVAZIONI_SALVA_KEYWORD: 'put_osservazione',
    OSSERVAZIONI_DELET_KEYWORD: 'del_osservazione',
    OSSERVAZIONI_GET_TIPOLOGIA_KEYWORD: 'get_tipologie_osservazioni',
    OSSERVAZIONI_GET_IMMAGINI_KEYWORD: 'get_osservazione_immagini',
    OSSERVAZIONI_SALVA_IMMAGINE_KEYWORD: 'put_osservazione_image',
    OSSERVAZIONI_DELET_IMMAGINE_KEYWORD: 'del_osservazione_image',
    OSSERVAZIONI_SALVA_ASSEGNAZIONE_KEYWORD: 'put_osservazione_assegnazione',
    OSSERVAZIONI_DELET_ASSEGNAZIONE_KEYWORD: 'del_osservazione_assegnazione',
    OSSERVAZIONI_GET_CHIUSURA_KEYWORD: 'get_osservazione_chiusura',
    OSSERVAZIONI_GET_PERSONALIZZATI_KEYWORD: 'get_osservazione_personalizati',
    OSSERVAZIONI_SALVA_CHIUSURA_KEYWORD: 'put_osservazione_chiusura',
    OSSERVAZIONI_GET_COMMENTI_KEYWORD: 'get_commenti_osservazione',
    OSSERVAZIONI_SALVA_COMMENTO_KEYWORD: 'put_commento_osservazione',
    OSSERVAZIONI_DELET_COMMENTO_KEYWORD: 'del_commento_osservazione',

    ATTIVITA_GET_ELENCO_KEYWORD: "get_elenco_attivita",///{token}/{from}/{to}/{categoria}/{tipo}/{sito}"
    ATTIVITA_GET_CATEGORIE_KEYWORD:"get_categorie_attivita", //filtro attività nel elenco attività
    ATTIVITA_GET_TIPOLOGIE_KEYWORD:"get_tipologie_attivita", //filtro tipologie nel elenco attività
    ATTIVITA_GET_IMMAGINI_KEYWORD:"get_attivita_immagini",
    ATTIVITA_SALVA_IMMAGINE_KEYWORD: "put_attivita_image",
    ATTIVITA_DELET_IMMAGINE_KEYWORD:"del_attivita_image",
    ATTIVITA_GET_KEYWORD:"get_attivita", ///{token}/{key} key = chiave //forse non mi serve perche tutti i dati dovrebbero essere nella get attivita chiusura
    ATTIVITA_GET_CHIUSURA_KEYWORD:"get_attivita_chiusura", // key = chiave
    ATTIVITA_SALVA_CHIUSURA_KEYWORD:"put_attivita_chiusura",
    
    

    ATTIVITA_GET_COMMENTI_KEYWORD: 'get_commenti_attivita',
    ATTIVITA_SALVA_COMMENTO_KEYWORD: 'put_commento_attivita',
    ATTIVITA_DELET_COMMENTO_KEYWORD: 'del_commento_attivita',



});