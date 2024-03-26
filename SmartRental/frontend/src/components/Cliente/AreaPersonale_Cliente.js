import React, { useState, useContext } from "react"
import { Link, Redirect } from "react-router-dom"
import Icon from "@material-ui/core/Icon"
import Axios from "axios"
import Page from "../Page"
import StateContext from "../../StateContext"

function AreaPersonale_Cliente() {
  const id = localStorage.getItem("_id")
  const [input, setInput] = useState()
  const appState = useContext(StateContext)
  async function modificaDati(e) {
    e.preventDefault()

    const user = await Axios.post("http://localhost:8081/findUserById", { id })
    if (user.data) {
      localStorage.setItem("utente_selezionato", JSON.stringify(user.data))
      window.location = "/modificaDati"
    } else {
      console.log("Errore con il server")
    }
  }

  async function getMetodoPagamento(e) {
    e.preventDefault()
    console.log(input)
    const metodiPagamento = await Axios.post("http://localhost:8081/getMetodoPagamento", { token: appState.utente.token, id })
    if (metodiPagamento.data) {
      localStorage.setItem("metodiPagamento", JSON.stringify(metodiPagamento.data))
      if (input == "modifica") {
        window.location = "/modificaMetodoPagamento"
      } else if (input == "cancella") {
        window.location = "/rimuoviMetodoPagamento"
      }
    } else {
      console.log("Errore con il server")
    }
  }
  return (
    <Page title="Area Personale">
      <div className="pt-5 text-font " style={{ backgroundColor: "#f8f9fa" }}>
        <div className="container-fluid pb-5 mt-5">
          <div className="row justify-content-center mb-5">
            {/* TESTO SOPRA  */}
            <div className="card col-12 col-md-12 col-lg-12">
              <h2 className="card-title  mb-3  display-2 align-center">
                <strong>Area Personale </strong>
              </h2>

              <h3 className=" display-4 align-center mb-5">Ecco qui le sezioni per gestire al meglio la tua prenotazione</h3>
              {/* RETTANGOLO CENTRALE + FORM */}
              <div className=" img-shadow p-5" style={{ backgroundColor: "#bcc8e9" }}>
                {/* CARDS */}
                <div className="card-box align-center ">
                  <div className="row justify-content-center">
                    <div className="col-xl-6 col-lg-6 col-md-10 col-sm-10 mb-3">
                      <div className="card img-shadow">
                        <div className="card-body card-areaP">
                          <h5 className="card-title">
                            <strong> Gestione Account</strong>
                          </h5>
                          <div className="row justify-content-center">
                            <button onClick={modificaDati} className="col-8 btn btn-cards">
                              Modifica Dati
                            </button>
                            <Icon className="material-icons-outlined md-36 mt-2">manage_accounts</Icon>
                          </div>
                          <div className="row justify-content-center">
                            <Link to="/modificaPassword" className="col-8 btn btn-cards">
                              Modifica Password
                            </Link>
                            <Icon className="material-icons-outlined md-36 mt-2">lock</Icon>
                          </div>
                          <div className="row justify-content-center">
                            <button onClick={getMetodoPagamento} onFocus={e => setInput(e.target.name)} name="modifica" className="col-8 btn btn-cards">
                              Modifica Metodo di Pagamento
                            </button>
                            <Icon className="material-icons-outlined md-36 mt-2">credit_card</Icon>
                          </div>
                          <div className="row justify-content-center">
                            <Link to="/aggiungiMetodoPagamento" className="col-8 btn btn-cards">
                              Aggiungi Metodo di pagamento
                            </Link>
                            <Icon className="material-icons-outlined md-36 mt-2">payments</Icon>
                          </div>
                          <div className="row justify-content-center">
                            <button onClick={getMetodoPagamento} onFocus={e => setInput(e.target.name)} name="cancella" className="col-8 btn btn-cards">
                              Rimuovi Metodo di pagamento
                            </button>
                            <Icon className="material-icons-outlined md-36 mt-2">credit_card_off</Icon>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-6 col-lg-6 col-md-10 col-sm-10 mb-3">
                      <div className="card card-areaP">
                        <div className="card-body">
                          <h5 className="card-title">
                            <strong> Gestione Corsa</strong>
                          </h5>
                          <div className="row justify-content-center">
                            <Link to="/visualizzaPrenotazione" className="col-8 btn btn-cards">
                              Visualizza Prenotazione
                            </Link>
                            <Icon className=" material-icons-outlined md-36 mt-2 ">event_note</Icon>
                          </div>
                          <div className="row justify-content-center">
                            <Link to="/notificaInizioCorsa" className="col-8 btn btn-cards">
                              Notifica Inizio Corsa
                            </Link>
                            <Icon className=" material-icons-outlined md-36 mt-2 ">play_circle</Icon>
                          </div>
                          <div className="row justify-content-center">
                            <Link to="/notificaFineCorsa" className="col-8 btn btn-cards">
                              Notifica Fine Corsa
                            </Link>
                            <Icon className=" material-icons-outlined md-36 mt-2 ">pause_circle</Icon>
                          </div>
                          <div className="row justify-content-center">
                            <Link to="/gestioneImprevisti" className="col-8 btn btn-cards">
                              Gestione Imprevisti
                            </Link>
                            <Icon className=" material-icons-outlined md-36 mt-2 ">report_problem</Icon>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}

export default AreaPersonale_Cliente
