import React from "react"

import { Link } from "react-router-dom"
import Icon from "@material-ui/core/Icon"
import Axios from "axios"
import Page from "../Page"

function AreaPersonale_Admin() {
  const id = localStorage.getItem("_id")
  async function modificaDati(e) {
    e.preventDefault()
    console.log(id)
    const user = await Axios.post("http://localhost:8081/findUserById", { id })
    if (user) {
      localStorage.setItem("utente_selezionato", JSON.stringify(user.data))
      window.location = "/modificaDati"
    } else {
      console.log("Errore con il server")
    }
  }
  return (
    <Page title="Area Personale - Amministratore">
      <div className="pt-5 text-font" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="container-fluid mt-5 pb-5">
          <div className="row justify-content-center mb-5">
            {/* TESTO SOPRA  */}
            <div className="card col-12 col-md-12 col-lg-12">
              <h2 className="card-title  mb-3  display-2 align-center">
                <strong>Area Personale </strong>
              </h2>
              <h3 className="display-4 align-center mb-5">Ecco qui le sezioni per gestire al meglio la tua azienda</h3>

              {/* RETTANGOLO CENTRALE + FORM */}
              <div className="img-shadow p-5" style={{ backgroundColor: "#bcc8e9" }}>
                {/* CARDS */}
                <div className="card-box align-center ">
                  <div className="row justify-content-center">
                    <div className="col-xl-4 col-lg-10 col-md-10 col-sm-10 mb-3">
                      <div className="card img-shadow">
                        <div className="card-body card-areaP">
                          <h5 className="card-title">
                            <strong> Gestione Account</strong>
                          </h5>
                          <div className="row justify-content-center">
                            <button onClick={modificaDati} to="/modificaDati" className="col-8 btn btn-cards">
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
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-10 col-md-10 col-sm-10 mb-3">
                      <div className="card">
                        <div className="card-body card-areaP">
                          <h5 className="card-title">
                            <strong> Gestione Azienda</strong>
                          </h5>
                          <div className="row justify-content-center">
                            <Link to="/visualizzaDipendenti" className="col-8 btn btn-cards">
                              Visualizza Dipendenti
                            </Link>
                            <Icon className="material-icons-outlined md-36 mt-2 ">groups</Icon>
                          </div>
                          <div className="row justify-content-center">
                            <Link to="/aggiungiDipendente" className="col-8 btn btn-cards">
                              Aggiungi Dipendente
                            </Link>
                            <Icon className="material-icons-outlined md-36 mt-2 ">person_add </Icon>
                          </div>

                          <div className="row justify-content-center">
                            <Link to="/visualizzaMezzi" className="col-8 btn btn-cards">
                              Visualizza Mezzi
                            </Link>
                            <Icon className=" material-icons-outlined md-36 mt-2 ">directions_car</Icon>
                          </div>
                          <div className="row justify-content-center">
                            <Link to="/aggiungiMezzo" className="col-8 btn btn-cards">
                              Aggiungi Mezzo
                            </Link>
                            <Icon className=" material-icons-outlined md-36 mt-2 ">add_circle_outline</Icon>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-10 col-md-10 col-sm-10 mb-3">
                      <div className="card card-areaP">
                        <div className="card-body">
                          <h5 className="card-title">
                            <strong> Gestione Corsa</strong>
                          </h5>
                          <div className="row justify-content-center">
                            <Link to="/ricercaPrenotazione" className="col-8 btn btn-cards">
                              Ricerca Prenotazione
                            </Link>
                            <Icon className=" material-icons-outlined md-36 mt-2 ">event_note</Icon>
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

export default AreaPersonale_Admin
