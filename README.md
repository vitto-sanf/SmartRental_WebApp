# SmartRental

Progetto sviluppato per i corsi "Programmazione web e mobile" e "Ingegneria del software" (a.a. 2020/2021) all'Università degli Studi di Palermo. 

## Tema di Progetto

Si richiede la progettazione di un software per il supporto ad un servizio di noleggio auto/moto/bici/monopattino on-demand. Le specifiche di seguito espresse sono da considerarsi come minime per la tesina in oggetto e possono essere estese dallo studente qualora questo non violi la natura e l’intento del software richiesto. Lo studente, durante la stesura del progetto, deve dimostrare capacità di interazione con il committente e con i membri del suo gruppo al fine di estendere o integrare, se necessario, le specifiche riportate di seguito.

### Descrizione generale del sistema

Descrizione generale del sistema  
Si richiede di progettare e sviluppare un software di gestione di un servizio di noleggio mezzi on-demand. I mezzi a disposizione sono autovetture, moto, biciclette e monopattini. Il noleggio auto può anche prevedere un autista. Per la prenotazione del mezzo il cliente deve comunicare i propri dati personali, il giorno e l’ora del noleggio ed il luogo dove il mezzo verrà rilasciato e per l’auto con autista è anche necessario indicare la destinazione. Per il ritiro dei mezzi si usufruirà di parcheggi o stalli appositi. Il cliente (o un eventuale addetto alla consegna mezzi) comunicherà al sistema l’avvenuta consegna o l’avvenuto rilascio. Il mezzo può essere ritirato/lasciato, su richiesta, in punti diversi da stalli o parcheggi. Nel proporre i mezzi ai clienti il software dovrà tenere conto della possibilità di offrire un mezzo fuori stallo nell’ottica di agevolare il più possibile il cliente. (Facoltativo: il software può suggerire al cliente la posizione più vicina alla sua destinazione finale dove lasciare il mezzo).  
Il cliente deve comunicare per tempo qualsiasi cambiamento nella destinazione finale e può scegliere il tipo di veicolo.
Per il pagamento deve essere prevista un calcolo della tariffa in funzione del percorso, del tempo di utilizzo e del tipo di veicolo ed il pagamento deve essere effettuato (mancia compresa per l’autista, volontaria) all’atto della prenotazione.
Il sistema deve notificare al cliente ed all’amministratore dell’azienda di noleggio qualunque ritardo nelle consegne. Il cliente, che potrà effettuare una prenotazione solo dopo aver dichiarato di possedere un dispositivo portatile\*, riceverà un alert nel caso in cui egli sia in ritardo con la consegna del mezzo ed in questo caso dovrà giustificarne il motivo (traffico, guasto, ….) fornendo anche uno stimato alla consegna. Nel caso di ritardo il cliente, per non incorrere in sovrapprezzo, potrà riconsegnare il mezzo in un posto diverso da quello pattuito in precedenza. Eventuali sovrapprezzi o penali per mancata riconsegna verranno addebitati direttamente sulla carta del cliente.

Si ricorda che da specifiche NON è richiesta un’applicazione web o una particolare architettura, gli studenti dovranno condurre la fase di analisi senza far riferimento ad una particolare architettura né ipotizzare soluzioni specifiche. Soltanto nella seconda fase della progettazione e soprattutto per gli studenti che sosterranno anche la prova di Programmazione Web e Mobile sarà possibile optare per una scelta implementativa tipo piattaforma web.

Nota: il pagamento non va implementato ma solo progettato

## Cosa è stato realizzato

- Servizi offerti a tutti gli utenti
  - Autenticazione e Registrazione: Funzionalità che permette agli utenti di creare il proprio account e autenticarsi. Ciò è necessario per accedere alle funzionalità principali del sistema (Ricercare un veicolo disponibile, effettuare una prenotazione)
  - Modifica dei dati personali: Attività di aggiornamento e/o inserimento delle informazioni relative all’utente che ha effettuato l’accesso.
  - Recupero della Password: Il Sistema deve consentire all’Utente di effettuare il recupero della Password in caso quest’ultimo l’abbia dimenticata. Il Sistema provvederà ad inviare un’e-mail all’Utente con una nuova password con cui accedere.
  - Modifica della Password: Il Sistema deve consentire all’Utente di modificare la password relativa al proprio account.
  - Logout: Il Sistema deve consentire all’Utente di effettuare il logout dal proprio account.
- Servizi offerti ai Clienti
  - Inserimento e rimozione dei metodi di pagamento: Il sistema permette al cliente che ha effettuato l’accesso di memorizzare uno o più metodi di pagamenti per poterli poi utilizzare rapidamente quando necessario. Il cliente può rimuovere il metodo di pagamento precedentemente inserito.
  - Inserimento e aggiornamento della patente di guida: Il sistema permette al cliente che ha effettuato l'accesso di memorizzare una patente per verificare che sia abilitato alla guida del mezzo che desidera prenotare. Il cliente può aggiornare la patente precedentemente inserita.
  - Noleggio Mezzo: Il Sistema deve consentire al Cliente di ricercare il mezzo da noleggiare in base alle proprie esigenze, sceglierlo, visualizzarne i dettagli e la tariffa, in caso di scelta di un’auto richiedere l’autista ed effettuare il pagamento totale della prenotazione effettuata
  - Gestione della prenotazione: Il Sistema deve consentire al Cliente di visualizzare le prenotazioni effettuate, modificare i dati, indicare l’inizio e la fine della corsa, ed eventualmente cancellarle
  - Ritardo consegna: Il cliente, qualora dovesse superare la data e l'ora stabilita nella prenotazione per la consegna, può notificare un nuovo orario o un nuovo luogo di consegna nella propria area personale.
- Servizi offerti agli Amministratori
  - Gestione degli Account: Il Sistema deve consentire all’Amministratore di aggiungere al Sistema l’account di un Dipendente (Addetto_Parcheggio o Autista) in caso di assunzione, di modificarlo o di eliminarlo in caso di licenziamento.
  - Gestione Mezzi: Il Sistema deve consentire all’Amministratore di inserire mezzi all’interno dei parcheggi, modificarne i dati ed eventualmente rimuoverli
  - Gestione Prenotazioni: Il Sistema deve consentire all’Amministratore di cercare, modificare, ed eliminare le prenotazioni effettuate dai Clienti. Inoltre, il Sistema deve consentire all’Amministratore di aggiungere eventuali danni riportati dal mezzo.
- Servizi offerti agli Autisti
  - Gestione Corsa: Il Sistema deve consentire all’Autista di accettare una corsa e indicarne l’inizio e la fine
- Servizi offerti agli Addetti_Parcheggio
  - Gestione Prenotazioni: Il Sistema deve consentire all’Addetto_Parcheggio di cercare, modificare i dati, indicare l’inizio e la fine della corsa, aggiungere i danni riportati dal mezzo ed eventualmente eliminare le prenotazioni effettuate dai Clienti

## Strumenti utilizzati

Per la realizzazione di questa applicazione web è stato scelto di utilizzare come gestore di pacchetti JavaScript NPM.
Si è deciso di utilizzare il framework ExpressJS e la libreria di JavaScript ReactJS poiché entrambi semplificano lo sviluppo di applicazioni web e mobile.  
Per la realizzazione delle interfacce grafiche, si è scelto di utilizzare il framework BootStrap.
Per gestire le richieste HTTP POST e GET tra client e server, si è utilizzata la libreria “axios”, "mongodb", Express, React, NodeJS.

## Come avviare SmartRental

Aprire un terminale nella directory in cui si vuole installare SmartRental ed eseguire i seguenti comandi

```
git clone https://github.com/vitto-sanf/SmartRental_WebApp.git
```

Configurazione Backend:

```
cd backend
npm install
```

Eseguire il backend con il seguente comando:

```
npm run start
```

Configurazione Frontend:

```
cd .. //se vi trovate nella cartella backend
cd frontend
npm install
npm run dev
```

Alla fine del caricamento andare su http://localhost:3000/

## Documentazione

All'Interno di Documentazione SmartRental troverai :

- **Object Design Document (ODD)** : Documento che descrive le scelte implementative degli oggetti interni e le dipendenze esterne ad altre librerie.
- **System Design Document (SDD)** : Documento che descrive l'architettura interna e le loro interrconnessioni. 
- **Requirement Analysis Document (RAD)** : Documento che descrive i requisiti funzionali e non funzionali dell'applicazione, andando ad analizzare in profondità i modelli del sistema.

## Organizzazione del codice

All'interno di SmartRental troverai la cartella backend organizzata in questa maniera:

```
.
├── backend
│   ├── Procfile
│   ├── app.js
│   ├── controllers
│   │   ├── controllerMetodoPagamento.js
│   │   ├── controllerMezzo.js
│   │   ├── controllerPrenotazioni.js
│   │   └── controllerUtente.js
│   ├── db.js
│   ├── models
│   │   ├── MetodoPagamento.js
│   │   ├── Mezzo.js
│   │   ├── Prenotazione.js
│   │   └── Utente.js
│   ├── package.json
│   └── router.js
```

All'interno di SmartRental troverai la cartella frontend organizzata in questa maniera:

```
└── frontend
    ├── package.json
    ├── public
    │   ├── favicon.ico
    │   ├── img
    │   │   ├── favicon.ico
    │   │   ├── iu.png
    │   │   ├── pexels-adrien-olichon.jpg
    │   │   ├── pexels-anna-tarazevich-7216927-718x1077.jpg
    │   │   ├── pexels-cottonbro-4604722.jpg
    │   │   ├── pexels-daria-sannikova-2938202-718x1083.jpg
    │   │   ├── pexels-element-digital-1051071-718x1076.jpg
    │   │   ├── pexels-fauxels-3182763.jpg
    │   │   ├── pexels-norma-mortenson-4392877.jpg
    │   │   ├── pexels-oleg-magni-2764678.jpg
    │   │   ├── pexels-ready-made-4297818.jpg
    │   │   ├── smartLogo.svg
    │   │   ├── user1.jpg
    │   │   ├── user2.jpg
    │   │   ├── user3.jpg
    │   │   └── user4.jpg
    │   ├── index.html
    │   └── uploads
    │       ├── AudiA3-1.jpg
    │       ├── AudiA3-2.jpg
    │       ├── AudiA3-3webp.jpg
    │       ├── AudiA3_foto1.jpg
    │       ├── AudiA3_foto2.jpg
    │       ├── AudiA3_foto3.jpg
    │       ├── BMWSerie3_foto1.jpg
    │       ├── BMWSerie3_foto2.jpg
    │       ├── BMWSerie3_foto3.jpg
    │       ├── District2Stagger_foto1.jpg
    │       ├── District2Stagger_foto2.jpg
    │       ├── District2Stagger_foto3.jpg
    │       ├── FiatPanda_foto1.jpg
    │       ├── FiatPanda_foto2.jpg
    │       ├── FiatPanda_foto3.jpg
    │       ├── FordEdge_foto1.jpg
    │       ├── FordEdge_foto2.jpg
    │       ├── FordEdge_foto3.jpg
    │       ├── FordKa_foto1.jpg
    │       ├── FordKa_foto2.jpg
    │       ├── FordKa_foto3.jpg
    │       ├── HondaSH125_foto1.jpg
    │       ├── HondaSH125_foto2.jpg
    │       ├── HondaSH125_foto3.jpg
    │       ├── JeepCompass_foto1.jpg
    │       ├── JeepCompass_foto2.jpg
    │       ├── JeepCompass_foto3.jpg
    │       ├── KawasakiZ900_foto1.jpg
    │       ├── KawasakiZ900_foto2.jpg
    │       ├── KawasakiZ900_foto3.jpg
    │       ├── LEXGO_foto1.jpg
    │       ├── LEXGO_foto2.jpg
    │       ├── LEXGO_foto3.jpg
    │       ├── MVAgustaRush_foto1.jpg
    │       ├── MVAgustaRush_foto2.jpg
    │       ├── MVAgustaRush_foto3.jpg
    │       ├── PiaggioVespa_foto1.jpg
    │       ├── PiaggioVespa_foto2.jpg
    │       ├── PiaggioVespa_foto3.jpg
    │       ├── Verve2Lowstep_foto1.jpg
    │       ├── Verve2Lowstep_foto2.jpg
    │       ├── Verve2Lowstep_foto3.jpg
    │       ├── XiaomiMiElectricScooter_foto1.jpg
    │       ├── XiaomiMiElectricScooter_foto2.jpg
    │       └── XiaomiMiElectricScooter_foto3.jpg
    ├── src
    │   ├── DispatchContext.js
    │   ├── ExampleContext.js
    │   ├── Main.js
    │   ├── ProtectedRoute.js
    │   ├── StateContext.js
    │   ├── Style.css
    │   └── components
    │       ├── AddettoParcheggio
    │       │   ├── AreaPersonale_AddP.js
    │       │   ├── NotificaFineCorsa_AddP.js
    │       │   └── NotificaInizioCorsa_AddP.js
    │       ├── AddettoParcheggio_Amministratore
    │       │   └── RicercaPrenotazione.js
    │       ├── AddettoParcheggio_Amministratore_Cliente
    │       │   └── ModificaPrenotazione.js
    │       ├── Amministratore
    │       │   ├── AggiungiDannoMezzo.js
    │       │   ├── AggiungiDipendente.js
    │       │   ├── AggiungiMezzo.js
    │       │   ├── AreaPersonale_Admin.js
    │       │   ├── ModificaDipendente.js
    │       │   ├── ModificaMezzo.js
    │       │   ├── VisualizzaDipendenti.js
    │       │   └── VisualizzaMezzi.js
    │       ├── AreaPersonale.js
    │       ├── Autista
    │       │   ├── AccettazioneCorsa.js
    │       │   └── AreaPersonale_Autista.js
    │       ├── Autista_Cliente
    │       │   ├── NotificaFineCorsa.js
    │       │   └── NotificaInizioCorsa.js
    │       ├── Cliente
    │       │   ├── AggiungiMetodoPagamento.js
    │       │   ├── AreaPersonale_Cliente.js
    │       │   ├── GestioneImprevisti.js
    │       │   ├── ModificaMetodoPagamento.js
    │       │   ├── Pagamento.js
    │       │   ├── Registrazione.js
    │       │   ├── RimuoviMetodoPagamento.js
    │       │   └── VisualizzaPrenotazione.js
    │       ├── Errore404.js
    │       ├── FlashMessages.js
    │       ├── Footer.js
    │       ├── LoadingDotsIcon.js
    │       ├── Navbar.js
    │       ├── NavbarLoggedIn.js
    │       ├── NavbarLoggedOut.js
    │       ├── Page.js
    │       └── Utente
    │           ├── ChiSiamo.js
    │           ├── Contatti.js
    │           ├── DettagliOfferta.js
    │           ├── Home.js
    │           ├── Login.js
    │           ├── ModificaDati.js
    │           ├── ModificaPassword.js
    │           ├── RecuperaPassword.js
    │           └── Ricerca.js
    └── webpack.config.js
```
