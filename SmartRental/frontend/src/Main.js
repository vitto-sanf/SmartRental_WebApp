import React, { useState, useReducer, useEffect, useContext } from "react"
import ReactDOM from "react-dom"
import { useImmerReducer } from "use-immer"
import { BrowserRouter, Switch, Route, Redirect, useParams } from "react-router-dom"
import { MuiPickersUtilsProvider } from "@material-ui/pickers"
import DateFnsUtils from "@date-io/date-fns"
import { it } from "date-fns/locale"
import ProtectedRoute from "./ProtectedRoute"

// STILE
import "./Style.css"

// CONTEXT
import StateContext from "./StateContext"
import DispatchContext from "./DispatchContext"
import ExampleContext from "./ExampleContext"

// COMPONENTS
import Home from "./components/Utente/Home"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Registrazione from "./components/Cliente/Registrazione"
import Login from "./components/Utente/Login"
import Ricerca from "./components/Utente/Ricerca"
import DettagliOfferta from "./components/Utente/DettagliOfferta"
import Pagamento from "./components/Cliente/Pagamento"
import Contatti from "./components/Utente/Contatti"
import ChiSiamo from "./components/Utente/ChiSiamo"
import AggiungiDipendente from "./components/Amministratore/AggiungiDipendente"
import RecuperaPassword from "./components/Utente/RecuperaPassword"
import ModificaDati from "./components/Utente/ModificaDati"
import ModificaPassword from "./components/Utente/ModificaPassword"
import VisualizzaDipendenti from "./components/Amministratore/VisualizzaDipendenti"
import VisualizzaMezzi from "./components/Amministratore/VisualizzaMezzi"
import AggiungiMezzo from "./components/Amministratore/AggiungiMezzo"
import ModificaDipendente from "./components/Amministratore/ModificaDipendente"
import ModificaMezzo from "./components/Amministratore/ModificaMezzo"
import RicercaPrenotazione from "./components/AddettoParcheggio_Amministratore/RicercaPrenotazione"
import ModificaPrenotazione from "./components/AddettoParcheggio_Amministratore_Cliente/ModificaPrenotazione"
import AggiungiDannoMezzo from "./components/Amministratore/AggiungiDannoMezzo"
import NotificaInizioCorsa from "./components/Autista_Cliente/NotificaInizioCorsa"
import NotificaFineCorsa from "./components/Autista_Cliente/NotificaFineCorsa"
import NotificaInizioCorsa_AddP from "./components/AddettoParcheggio/NotificaInizioCorsa_AddP"
import NotificaFineCorsa_AddP from "./components/AddettoParcheggio/NotificaFineCorsa_AddP"
import AggiungiMetodoPagamento from "./components/Cliente/AggiungiMetodoPagamento"
import ModificaMetodoPagamento from "./components/Cliente/ModificaMetodoPagamento"
import RimuoviMetodoPagamento from "./components/Cliente/RimuoviMetodoPagamento"
import VisualizzaPrenotazione from "./components/Cliente/VisualizzaPrenotazione"
import GestioneImprevisti from "./components/Cliente/GestioneImprevisti"
import AccettazioneCorsa from "./components/Autista/AccettazioneCorsa"
import FlashMessages from "./components/FlashMessages"
import Errore404 from "./components/Errore404"
import AreaPersonale from "./components/AreaPersonale"

function Main() {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("token")),
    ruolo: localStorage.getItem("ruolo"),
    _id: localStorage.getItem("_id"),
    flashMessages: [],
    utente: {
      token: localStorage.getItem("token"),
      email: localStorage.getItem("email"),
      ruolo: localStorage.getItem("ruolo"),
      _id: localStorage.getItem("_id")
    }
  }

  function ourReducer(draft, action) {
    switch (action.type) {
      case "login":
        draft.loggedIn = true
        draft.utente = action.data
        return
      case "logout":
        draft.loggedIn = false
        return
      case "flashMessage":
        draft.flashMessages.push(action.value)
        return
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState)
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem("token")))
  const [flashMessages, setFlashMessages] = useState([])

  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem("token", state.utente.token)
      localStorage.setItem("email", state.utente.email)
      localStorage.setItem("ruolo", state.utente.ruolo)
      localStorage.setItem("_id", state.utente._id)
    } else {
      localStorage.removeItem("token")
      localStorage.removeItem("email")
      localStorage.removeItem("ruolo")
      localStorage.removeItem("_id")
      localStorage.removeItem("dipendente_selezionato")
      localStorage.removeItem("mezzo_selezionato")
      localStorage.removeItem("utente_selezionato")
    }
  }, [state.loggedIn])

  function addFlashMessage(msg) {
    setFlashMessages(prev => prev.concat(msg))
  }

  return (
    <MuiPickersUtilsProvider locale={it} utils={DateFnsUtils}>
      <ExampleContext.Provider value={addFlashMessage}>
        <StateContext.Provider value={state}>
          <DispatchContext.Provider value={dispatch}>
            <BrowserRouter>
              <Navbar />
              <FlashMessages messages={flashMessages} />
              <Switch>
                {/* ROTTE UTENTE */}
                <Route exact path="/">
                  {state.loggedIn ? <Redirect to="/areaPersonale" /> : <Home />}
                </Route>
                <ProtectedRoute exact path="/areaPersonale" component={AreaPersonale} isAuth={loggedIn}></ProtectedRoute>
                <Route exact path="/home" component={Home}></Route>
                <Route exact path="/chiSiamo" component={ChiSiamo}></Route>
                <Route exact path="/contatti" component={Contatti}></Route>
                <Route exact path="/login" component={Login}></Route>
                <Route exact path="/ricerca" component={Ricerca}></Route>
                <Route exact path="/dettagliOfferta/:modello" component={DettagliOfferta}></Route>
                <ProtectedRoute exact path="/recuperaPassword" component={RecuperaPassword} isAuth={!state.loggedIn}></ProtectedRoute>
                <ProtectedRoute exact path="/modificaDati" component={ModificaDati} isAuth={state.loggedIn}></ProtectedRoute>
                <ProtectedRoute exact path="/modificaPassword" component={ModificaPassword} isAuth={state.loggedIn}></ProtectedRoute>

                {/* ROTTE CLIENTE */}
                <ProtectedRoute exact path="/registrazione" component={Registrazione} isAuth={!state.loggedIn}></ProtectedRoute>
                <ProtectedRoute exact path="/pagamento" component={Pagamento} isAuth={state.loggedIn && state.ruolo == "cliente"}></ProtectedRoute>
                <ProtectedRoute exact path="/aggiungiMetodoPagamento" component={AggiungiMetodoPagamento} isAuth={state.loggedIn && state.ruolo == "cliente"}></ProtectedRoute>
                <ProtectedRoute exact path="/modificaMetodoPagamento" component={ModificaMetodoPagamento} isAuth={state.loggedIn && state.ruolo == "cliente"}></ProtectedRoute>
                <ProtectedRoute exact path="/rimuoviMetodoPagamento" component={RimuoviMetodoPagamento} isAuth={state.loggedIn && state.ruolo == "cliente"}></ProtectedRoute>
                <ProtectedRoute exact path="/visualizzaPrenotazione" component={VisualizzaPrenotazione} isAuth={state.loggedIn && state.ruolo == "cliente"}></ProtectedRoute>
                <ProtectedRoute exact path="/gestioneImprevisti" component={GestioneImprevisti} isAuth={state.loggedIn && state.ruolo == "cliente"}></ProtectedRoute>

                {/* ROTTE AMMINISTRATORE */}
                <ProtectedRoute exact path="/visualizzaDipendenti" component={VisualizzaDipendenti} isAuth={state.loggedIn && state.ruolo == "amministratore"}></ProtectedRoute>
                <ProtectedRoute exact path="/aggiungiDipendente" component={AggiungiDipendente} isAuth={state.loggedIn && state.ruolo == "amministratore"}></ProtectedRoute>
                <ProtectedRoute exact path="/modificaDipendente" component={ModificaDipendente} isAuth={state.loggedIn && state.ruolo == "amministratore"}></ProtectedRoute>
                <ProtectedRoute exact path="/visualizzaMezzi" component={VisualizzaMezzi} isAuth={state.loggedIn && state.ruolo == "amministratore"}></ProtectedRoute>
                <ProtectedRoute exact path="/aggiungiMezzo" component={AggiungiMezzo} isAuth={state.loggedIn && state.ruolo == "amministratore"}></ProtectedRoute>
                <ProtectedRoute exact path="/modificaMezzo" component={ModificaMezzo} isAuth={state.loggedIn && state.ruolo == "amministratore"}></ProtectedRoute>
                <ProtectedRoute exact path="/aggiungiDannoMezzo" component={AggiungiDannoMezzo} isAuth={state.loggedIn && state.ruolo == "amministratore"}></ProtectedRoute>

                {/* ROTTE AUTISTA */}
                <ProtectedRoute exact path="/accettazioneCorsa" component={AccettazioneCorsa} isAuth={state.loggedIn && state.ruolo == "autista"}></ProtectedRoute>

                {/* ROTTE AUTISTA E CLIENTE */}
                <ProtectedRoute exact path="/notificaInizioCorsa" component={NotificaInizioCorsa} isAuth={state.loggedIn && (state.ruolo == "autista" || state.ruolo == "cliente")}></ProtectedRoute>
                <ProtectedRoute exact path="/notificaFineCorsa" component={NotificaFineCorsa} isAuth={state.loggedIn && (state.ruolo == "autista" || state.ruolo == "cliente")}></ProtectedRoute>

                {/* ROTTE ADDETTO PARCHEGGIO */}
                <ProtectedRoute exact path="/notificaInizioCorsa_AddP" component={NotificaInizioCorsa_AddP} isAuth={state.loggedIn && state.ruolo == "addetto_parcheggio"}></ProtectedRoute>
                <ProtectedRoute exact path="/notificaFineCorsa_AddP" component={NotificaFineCorsa_AddP} isAuth={state.loggedIn && state.ruolo == "addetto_parcheggio"}></ProtectedRoute>

                {/* ROTTE ADDETTO PARCHEGGIO E AMMINISTRATORE*/}
                <ProtectedRoute exact path="/ricercaPrenotazione" component={RicercaPrenotazione} isAuth={state.loggedIn && (state.ruolo == "addetto_parcheggio" || state.ruolo == "amministratore")}></ProtectedRoute>

                {/* ROTTE ADDETTO PARCHEGGIO, AMMINISTRATORE E CLIENTE*/}
                <ProtectedRoute exact path="/modificaPrenotazione" component={ModificaPrenotazione} isAuth={state.loggedIn && (state.ruolo == "addetto_parcheggio" || state.ruolo == "amministratore" || state.ruolo == "cliente")}></ProtectedRoute>

                {/* ROTTA DI DAFAULT */}
                <Route exact path="*">
                  <Errore404 />
                </Route>
              </Switch>
              <Footer />
            </BrowserRouter>
          </DispatchContext.Provider>
        </StateContext.Provider>
      </ExampleContext.Provider>
    </MuiPickersUtilsProvider>
  )
}

ReactDOM.render(<Main />, document.querySelector("#app"))

//per avere un aggiornamento automatico delle modifiche nel server di frontend
if (module.hot) {
  module.hot.accept()
}
