import React, { useState, useContext } from "react"

import Axios from "axios"

import Page from "../Page"
import ExampleContext from "../../ExampleContext"
import { withRouter } from "react-router-dom"

function NotificaInizioCorsa_AddP() {
  const [prenotazioni, setPrenotazioni] = useState()
  const [parcheggioRitiro, setParcheggioRitiro] = useState(null)
  const addFlashMessage = useContext(ExampleContext)

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const stato = "In Attesa"
      const response = await Axios.post("http://localhost:8081/getPrenotazioniByParcheggio", { parcheggioRitiro, stato })

      setPrenotazioni(response.data)
    } catch (error) {
      console.log("There was a problem.")
    }
  }

  async function iniziaCorsa(id) {
    try {
      const response = await Axios.post("http://localhost:8081/iniziaCorsa", { id })
      addFlashMessage("Inizio Corsa Effettuata con Successo")
      setTimeout(function () {
        window.location.href = "/"
      }, 1200)
    } catch (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request)
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message)
      }
    }
  }

  async function fineCorsa(id) {
    try {
      const response = await Axios.post("http://localhost:8081/fineCorsa", { id })

      window.location = "/"
    } catch (error) {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data)
        console.log(error.response.status)
        console.log(error.response.headers)
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request)
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message)
      }
    }
  }

  return (
    <Page title="Notifica Inizio Corsa">
      {/* Modal */}
      {prenotazioni ? (
        prenotazioni.map(prenotazione => (
          <div key={prenotazione._id} className="modal fade text-font" id={prenotazione.idPrenotazione} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog ">
              <div className="modal-content">
                <div className="modal-header ">
                  <h5 className="modal-title " id="exampleModalLabel">
                    <strong>Prenotazione n.{prenotazione.idPrenotazione}</strong>
                  </h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body align-left">
                  <p className="card-text small">Tipo: {prenotazione.tipologia}</p>
                  <p className="card-text small">Modello: {prenotazione.modello}</p>
                  <p className="card-text small">Cliente: {prenotazione.nomeCliente + " " + prenotazione.cognomeCliente}</p>
                  <p className="card-text small">Data/orario ritiro: {new Date(prenotazione.dataRitiro).toLocaleString("it-IT")}</p>
                  <p className="card-text small">Data/orario consegna: {new Date(prenotazione.dataConsegna).toLocaleString("it-IT")} </p>
                  <p className="card-text small">Stallo/Parcheggio ritiro: {prenotazione.ParcheggioRitiro}</p>
                  <p className="card-text small">Stallo/Parcheggio consegna: {prenotazione.parcheggioConsegna}</p>
                  <div className="align-right">
                    <p className="card-text small text-muted">La corsa inizia tra: {Math.floor((new Date(prenotazione.dataRitiro) - new Date()) / (1000 * 60)) + "min"}</p>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">
                    Chiudi
                  </button>
                  {Math.floor((new Date(prenotazione.dataRitiro) - new Date()) / (1000 * 60)) <= 5 ? (
                    <button onClick={() => iniziaCorsa(prenotazione._id)} type="button" className="btn btn-warning">
                      Inizia Corsa
                    </button>
                  ) : (
                    <button href="#" type="button" className="btn btn-warning">
                      Non puoi Iniziare la Corsa
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div></div>
      )}

      <div className="container text-font pt-5 pb-5">
        <div className="row justify-content-center mt-5 mb-5 ">
          <div className="col-12 ">
            <div className="card  my-4 img-contatti">
              <div className="card-body justify-content-center">
                {/* TESTO SUPERIORE */}
                <div className="text-center img-contatti  pt-4 pb-3">
                  <h2 className=" mb-3">
                    <strong> Notifica l'inizio della corsa!</strong>
                  </h2>
                  <p>Cerca la corsa indicando il parcheggio da cui inizia. Premi sul tasto "Inizia corsa" per avvisare che un cliente ha appena iniziato la corsa con il mezzo noleggiato. La corsa apparirà qui mezz'ora prima del suo inzio.</p>
                </div>

                <div className="row mt-2 align-center justify-content-center">
                  <div className="col-12">
                    <div className="p-3 img-shadow mb-4 img-contatti img-border" style={{ backgroundColor: "#bcc8e9" }}>
                      {/* FORM DI RICERCA */}
                      <form onSubmit={handleSubmit}>
                        <select onChange={e => setParcheggioRitiro(e.target.value)} style={{ width: "auto" }} defaultValue={"DEFAULT"} className="custom-select mt-4 align-center" id="validationDefault04" required>
                          <option disabled value="DEFAULT">
                            Parcheggio/Stallo
                          </option>
                          <option value="Leonardo da Vinci">Leonardo da Vinci - Parcheggio</option>
                          <option value="Calatafimi">Calatafimi - Parcheggio</option>
                          <option value="Stazione Centrale">Stazione Centrale - Parcheggio</option>
                          <option value="Giotto ">Giotto - Parcheggio</option>
                          <option value="Strasburgo ">Strasburgo - Parcheggio</option>
                          <option value="Stadio ">Stadio - Parcheggio</option>
                          <option value="Notarbartolo ">Notarbartolo - Stallo</option>
                          <option value="Roma ">Roma - Stallo</option>
                          <option value="Michelangelo "> Michelangelo - Stallo</option>
                          <option value="Cala ">Cala - Stallo</option>
                          <option value="Massimo "> Massimo - Stallo</option>
                          <option value="Mondello ">Mondello - Stallo</option>
                        </select>
                        <div className="align-center mt-3 mb-5">
                          <button type="submit" className="btn btn-primary " style={{ width: "auto" }}>
                            Cerca
                          </button>
                        </div>
                      </form>
                      <div>
                        {/* RISULTATI RICERCA */}
                        {/* Button trigger modal */}
                        {prenotazioni ? (
                          prenotazioni.map(prenotazione =>
                            (new Date(prenotazione.dataRitiro) - new Date()) / (1000 * 60) <= 30 ? (
                              <div key={prenotazione._id}>
                                <a type="button" className="btn btn-light img-shadow" data-toggle="modal" data-target={"#" + prenotazione.idPrenotazione}>
                                  Prenotazione n.{prenotazione.idPrenotazione} - {prenotazione.nomeCliente + " " + prenotazione.cognomeCliente}
                                </a>
                              </div>
                            ) : (
                              <div className="pb-5 pt-5 align-center"></div>
                            )
                          )
                        ) : (
                          <div className="pb-5 pt-5 align-center"></div>
                        )}
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

export default withRouter(NotificaInizioCorsa_AddP)
