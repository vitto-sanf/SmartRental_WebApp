import React, { useState, useEffect, useContext } from "react"

import Axios from "axios"

import Page from "../Page"
import StateContext from "../../StateContext"
import LoadingDotsIcon from "../LoadingDotsIcon"
import ExampleContext from "../../ExampleContext"
import { withRouter } from "react-router-dom"

function AccettazioneCorsa() {
  const [prenotazioni, setPrenotazioni] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [errori, setErrori] = useState()
  const addFlashMessage = useContext(ExampleContext)
  const appState = useContext(StateContext)
  const id = appState._id
  useEffect(() => {
    const ourRequest = Axios.CancelToken.source()

    async function fetchPrenotazioni() {
      const stato = "In Attesa"
      try {
        await Axios.post("http://localhost:8081/getPrenotazioniAutista", { id }).then(async response => {
          console.log(response)
          setPrenotazioni(response.data)
          setIsLoading(false)
        })
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
    fetchPrenotazioni()
    return () => {
      ourRequest.cancel()
    }
  }, [])

  async function accettaCorsa(idPrenotazione) {
    try {
      await Axios.post("http://localhost:8081/accettaCorsa", { idPrenotazione }).then(response => {
        console.log(response)
        addFlashMessage("Prenotazione Accettata con Successo")
        setTimeout(function () {
          window.location.href = "/"
        }, 1200)
      })
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

  async function rifiutaCorsa(idPrenotazione, dataRitiro, dataConsegna) {
    try {
      await Axios.post("http://localhost:8081/cambiaAutista", { id, dataRitiro, dataConsegna }).then(async autistiTrovati => {
        console.log(autistiTrovati)
        if (autistiTrovati.data.length > 0) {
          let idAutista = autistiTrovati.data[0]
          console.log("ID", idAutista)
          await Axios.post("http://localhost:8081/cambiaPrenotazioneAutista", { idPrenotazione, idAutista }).then(() => {
            console.log("Prenotazione Cambiata")
            setTimeout(function () {
              window.location.href = "/"
            }, 1200)
          })
        } else {
          setErrori("Non puoi rifiutare la corsa perchè non c'è nessun altro Autista disponibile ad accettare la corsa.")
          window.scrollTo(0, 0)
        }
      })
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
    <Page title="Accettazione Corsa">
      <div className="container-fluid pt-5 pb-5 text-font">
        <div className="row justify-content-center mt-5 mb-5 ">
          <div className="col-12 mb-5 pb-5">
            {/* TESTO SOPRA */}
            <div className="text-center img-contatti pt-3 pb-1">
              <h2 className=" mb-3">
                <strong> Accettazione Corsa</strong>
              </h2>
              <p>In questa sezione puoi accettare o rifiutare la corsa richiesta da un Cliente</p>
            </div>
          </div>
          {errori ? (
            <div className="container mt-4 " style={{ width: "auto" }}>
              <div className="row align-center justify-content-center">
                <div className="col-12 alert alert-danger img-contatti" role="alert">
                  {errori}
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}

          <div className="col-8 pb-5 mb-5 pt-5">
            <div className="card img-shadow img-contatti my-5 ">
              {/* RETTANGOLO CENTRALE */}
              <div className="card-body img-contatti " style={{ backgroundColor: "#f8f9fa" }}>
                <div className="row align-center justify-content-center">
                  {/* CARDS PRENOTAZIONI */}
                  <div className="card-deck col-xl-6 col-lg-6 col-md-12 col-sm-12 ">
                    {prenotazioni ? (
                      prenotazioni.map(prenotazione => (
                        <div className=" img-border" key={prenotazione._id}>
                          <div className="card-header align-center text-white" style={{ backgroundColor: "#f5b53f" }}>
                            <strong>{prenotazione.stato}</strong>
                          </div>
                          <img className="card-img-top" src={`/uploads/${prenotazione.imgMezzo}`} alt="Card image cap" />
                          <div className="card-body align-center">
                            <h5 className="card-title pb-2">
                              <strong>Prenotazione n.{prenotazione.idPrenotazione}</strong>
                            </h5>
                            <p className="card-text">Modello auto: {prenotazione.modello}</p>
                            <p className="card-text">Cliente: {prenotazione.nomeCliente + " " + prenotazione.cognomeCliente}</p>
                            <p className="card-text">Stallo/Parcheggio ritiro: {prenotazione.ParcheggioRitiro}</p>

                            <small className="text-muted"> Data/orario inizio corsa: {new Date(prenotazione.dataRitiro).toLocaleString("it-IT")}</small>
                          </div>
                          {!prenotazione.accettata ? (
                            <div className="card-footer align-center">
                              <button onClick={() => accettaCorsa(prenotazione._id)} className="btn btn-warning align-center text-black">
                                Accetta
                              </button>
                              <button onClick={() => rifiutaCorsa(prenotazione._id, prenotazione.dataRitiro, prenotazione.dataConsegna)} className="btn btn-danger align-center text-black">
                                Rifiuta
                              </button>
                            </div>
                          ) : (
                            <div>
                              <button className="btn btn-warning align-center text-black active pb-2">Prenotazione già accettata</button>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div></div>
                    )}
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

export default withRouter(AccettazioneCorsa)
