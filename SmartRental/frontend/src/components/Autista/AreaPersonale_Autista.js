import React from "react"

import { Link } from "react-router-dom"
import Icon from "@material-ui/core/Icon"
import Axios from "axios"
import Page from "../Page"

function AreaPersonale_Autista() {
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
    <Page title="Area Personale">
      <div className="pt-5 text-font" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="container-fluid mt-5 pb-5">
          <div className="row justify-content-center mb-5">
            {/* TESTO SOPRA  */}
            <div className="card col-12 col-md-12 col-lg-12">
              <h2 className=" mb-3  display-2 align-center">
                <strong>Area Personale </strong>
              </h2>
              <h3 className=" display-4 align-center mb-5">Ecco qui le sezioni per gestire al meglio la tua prenotazione</h3>

              {/* RETTANGOLO CENTRALE + FORM */}
              <div className="card-wrapper img-shadow p-5" style={{ backgroundColor: "#bcc8e9" }}>
                {/* CARTE */}
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
                            <Link to="/accettazioneCorsa" className="col-8 btn btn-cards">
                              Accettazione Corsa
                            </Link>
                            <Icon className=" material-icons-outlined md-36 mt-2 ">check_circle_outline</Icon>
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

export default AreaPersonale_Autista
