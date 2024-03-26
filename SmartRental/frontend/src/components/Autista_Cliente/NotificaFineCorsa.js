import React, { useState, useEffect, useContext } from "react"

import Axios from "axios"

import Page from "../Page"
import StateContext from "../../StateContext"
import LoadingDotsIcon from "../LoadingDotsIcon"
import ExampleContext from "../../ExampleContext"
import { withRouter } from "react-router-dom"

function NotificaFineCorsa() {
  const [prenotazioni, setPrenotazioni] = useState(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const appState = useContext(StateContext)
  const addFlashMessage = useContext(ExampleContext)

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source()
    const id = appState._id
    const stato = "In Corso"
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

  async function fineCorsa(id) {
    try {
      const response = await Axios.post("http://localhost:8081/fineCorsa", { id })
      console.log(response)
      addFlashMessage("Fine Corsa Effettuata con Successo")
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

  if (isLoading) return <LoadingDotsIcon />

  return (
    <Page title="Notifica fine corsa">
      <div className="container pt-5 pb-5 text-font">
        <div className="row justify-content-center mt-5 mb-5 pb-5">
          <div className="col-xl-10 col-lg-12 col-md-9 pb-5 mb-5">
            <div className="card  my-4 img-contatti pb-5 mb-5">
              <div className="card-body justify-content-center pb-5">
                {/* TESTO SUPERIORE */}
                <div className="text-center img-contatti pr-2 pl-2 pt-4 pb-3">
                  <h2 className=" mb-3">
                    <strong> Notifica la fine della corsa!</strong>
                  </h2>
                  <p>Premi sul tasto "Fine corsa" per avvisarci che hai appena concluso la corsa con il mezzo noleggiato. Il tasto può essere premuto 15 min prima della della corsa. La tua corsa apparirà qui un'ora prima della fine.</p>
                </div>

                {prenotazioni ? (
                  prenotazioni.map(prenotazione =>
                    (new Date(prenotazione.dataConsegna) - new Date()) / (1000 * 60) <= 60 ? (
                      <div key={prenotazione._id}>
                        <div className="row mt-2">
                          {/* CORSE */}
                          <div className="col-lg-8 col-md-12 col-sm-12"></div>
                          <div className="p-3 img-shadow mb-4" style={{ backgroundColor: "#f8f9fa" }}>
                            <div className="card ">
                              <div className="row ">
                                <div className="col-sm-12 col-md-5 col-lg-5 align-center mt-4">
                                  <img className="img-contatti img-border" src={`/uploads/${prenotazione.imgMezzo}`} alt="Foto mezzo" />
                                  {Math.floor((new Date(prenotazione.dataConsegna) - new Date()) / (1000 * 60)) <= 15 ? (
                                    <button onClick={() => fineCorsa(prenotazione._id)} className="btn btn-danger mt-3">
                                      Fine Corsa
                                    </button>
                                  ) : (
                                    <button href="#" className="btn btn-danger mt-3">
                                      Non puoi terminare la Corsa
                                    </button>
                                  )}

                                  <p className="card-text small text-muted mt-2 pb-3">La corsa termina tra: {Math.floor((new Date(prenotazione.dataConsegna) - new Date()) / (1000 * 60)) + "min"}</p>
                                </div>

                                <div className="col-sm-12 col-md-7 col-lg-7 img-shadow">
                                  <div className="card-body">
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
                    ) : (
                      <div className="pb-5 pt-5 align-center"></div>
                    )
                  )
                ) : (
                  <div className="pb-5 pt-5">
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

export default withRouter(NotificaFineCorsa)
