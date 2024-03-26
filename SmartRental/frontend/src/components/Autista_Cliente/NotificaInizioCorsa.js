import React, { useState, useEffect, useContext } from "react"

import Axios from "axios"

import Page from "../Page"
import StateContext from "../../StateContext"

import ExampleContext from "../../ExampleContext"
import LoadingDotsIcon from "../LoadingDotsIcon"
import { withRouter } from "react-router-dom"

function NotificaInizioCorsa() {
  const [prenotazioni, setPrenotazioni] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const appState = useContext(StateContext)
  const addFlashMessage = useContext(ExampleContext)

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source()
    const id = appState._id
    const stato = "In Attesa"
    const ruolo = appState.ruolo
    async function fetchPrenotazioniCliente() {
      try {
        const response = await Axios.post("http://localhost:8081/getPrenotazioniByStato", { id, stato })
        console.log(response)
        setPrenotazioni(response.data)
        setIsLoading(false)
      } catch (error) {
        console.log("There was a problem.")
      }
    }
    async function fetchPrenotazioniAutista() {
      try {
        const response = await Axios.post("http://localhost:8081/getPrenotazioniAutistaByStato", { id, stato })
        console.log(response)
        setPrenotazioni(response.data)
        setIsLoading(false)
      } catch (error) {
        console.log("There was a problem.")
      }
    }
    if (ruolo == "cliente") {
      fetchPrenotazioniCliente()
    } else if (ruolo == "autista") {
      fetchPrenotazioniAutista()
    }
    return () => {
      ourRequest.cancel()
    }
  }, [])

  async function iniziaCorsa(id) {
    try {
      const response = await Axios.post("http://localhost:8081/iniziaCorsa", { id })
      console.log(response)
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

  function tempo() {
    let minutiTot = Math.floor((new Date(prenotazione.dataRitiro) - new Date()) / (1000 * 60))
    if (minutiTot >= 60) {
      return minutiTot / 60 + "min"
    } else {
      return minutiTot + "min"
    }
  }

  if (isLoading) return <LoadingDotsIcon />

  return (
    <Page title="Notifica inizio corsa">
      <div className="container pt-5 pb-5 text-font">
        <div className="row justify-content-center mt-5 mb-5 pb-5">
          <div className="col-xl-10 col-lg-12 col-md-9 mb-5 pb-5">
            <div className="card img-contatti mb-5 pb-5">
              <div className="card-body justify-content-center mb-5">
                {/* TESTO SUPERIORE */}
                <div className="text-center img-contatti pt-5 pb-3">
                  <h2 className=" mb-3">
                    <strong> Notifica l'inizio della corsa!</strong>
                  </h2>
                  <p> Premi sul tasto "Inizia corsa" per avvisarci che hai appena iniziato la corsa con il mezzo noleggiato. Il tasto può essere premuto 5 min prima dell'inizio della corsa. La tua corsa apparirà qui mezz'ora prima del suo inzio.</p>
                </div>

                {prenotazioni ? (
                  prenotazioni.map(prenotazione =>
                    (new Date(prenotazione.dataRitiro) - new Date()) / (1000 * 60) <= 30 ? (
                      <div key={prenotazione._id}>
                        {/* CORSE */}
                        <div className="row mt-2 justify-content-center align-center">
                          <div className=" col-xl-10 col-lg-10 col-md-12 col-sm-12 ">
                            <div className="p-3 img-shadow mb-4 " style={{ backgroundColor: "#f8f9fa" }}>
                              <div className="card  ">
                                <div className="row align-center justify-content-center ">
                                  <div className="col-sm-12 col-md-12 col-lg-4 align-center mt-4 ">
                                    <img className="img-contatti img-border" src={`/uploads/${prenotazione.imgMezzo}`} alt="Foto mezzo" />
                                    {Math.floor((new Date(prenotazione.dataRitiro) - new Date()) / (1000 * 60)) <= 5 ? (
                                      <button onClick={() => iniziaCorsa(prenotazione._id)} className="btn btn-warning mt-3">
                                        Inizia Corsa
                                      </button>
                                    ) : (
                                      <button href="#" className="btn btn-warning mt-3">
                                        Non puoi Iniziare la Corsa
                                      </button>
                                    )}
                                    <p className="card-text small text-muted mt-2 pb-3">La corsa inizia tra: {Math.floor((new Date(prenotazione.dataRitiro) - new Date()) / (1000 * 60)) + "min"}</p>
                                  </div>

                                  <div className="col-sm-10 col-md-10 col-lg-7 img-shadow m-2 ">
                                    <div className="card-body ">
                                      <h5 className="card-title align-center mb-3">Prenotazione n.{prenotazione.idPrenotazione}</h5>
                                      <p className="card-text small">Tipo: {prenotazione.tipologia}</p>
                                      <p className="card-text small">Modello: {prenotazione.modello}</p>
                                      <p className="card-text small">Data/orario ritiro: {new Date(prenotazione.dataRitiro).toLocaleString("it-IT")}</p>
                                      <p className="card-text small">Data/orario consegna: {new Date(prenotazione.dataConsegna).toLocaleString("it-IT")} </p>
                                      <p className="card-text small">Stallo/Parcheggio ritiro: {prenotazione.ParcheggioRitiro}</p>
                                      <p className="card-text small">Stallo/Parcheggio consegna: {prenotazione.parcheggioConsegna}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="pb-5 pt-5  align-center"></div>
                    )
                  )
                ) : (
                  <div className="pb-5 pt-5 ">
                    <h2>Nessuna Corsa Disponibile!</h2>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}

export default withRouter(NotificaInizioCorsa)
