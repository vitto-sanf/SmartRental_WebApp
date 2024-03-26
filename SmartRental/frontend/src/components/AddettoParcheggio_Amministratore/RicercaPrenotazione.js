import React, { useContext, useState } from "react"

import { KeyboardDatePicker } from "@material-ui/pickers"
import Axios from "axios"
import { withRouter } from "react-router-dom"
import StateContext from "../../StateContext"
import Page from "../Page"
import ExampleContext from "../../ExampleContext"

function RicercaPrenotazione() {
  const [selectedDate, setSelectedDate] = useState(null)
  const [idPrenotazione, setIdPrenotazione] = useState()
  const [cognomeUtente, setCognomeUtente] = useState()
  const [prenotazioni, setPrenotazioni] = useState([])
  const [errori, setErrori] = useState()
  const addFlashMessage = useContext(ExampleContext)
  const appState = useContext(StateContext)
  async function handledSubmit(e) {
    e.preventDefault()
    console.log(selectedDate)
    try {
      let data = selectedDate
      let prenotazione = idPrenotazione
      let cognome = cognomeUtente

      if (data == null) {
        data = undefined
      }
      if (prenotazione == "") {
        prenotazione = undefined
      }
      if (cognome == "") {
        cognome = undefined
      }

      await Axios.post("http://localhost:8081/ricercaPrenotazione", { token: appState.utente.token, data, prenotazione, cognome })
        .then(response => {
          console.log(response)
          setPrenotazioni(response.data)
        })
        .catch(e => {
          setErrori(e.response.data)
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

  async function rimuoviPrenotazione(id) {
    try {
      await Axios.post("http://localhost:8081/rimuoviPrenotazione", { token: appState.utente.token, id })
        .then(response => {
          console.log(response)
          addFlashMessage("Prenotazione Rimossa con Successo")
          setTimeout(function () {
            window.location.href = "/"
          }, 1200)
        })
        .catch(e => {
          console.log(e)
        })
    } catch (e) {
      console.log(e.response)
    }
  }
  function modificaPrenotazione(dataRitiro, dataConsegna, parcheggioRitiro, parcheggioConsegna, id) {
    const prenotazioneModified = {
      dataRitiro: dataRitiro,
      dataConsegna: dataConsegna,
      parcheggioConsegna: parcheggioConsegna,
      parcheggioRitiro: parcheggioRitiro,
      id: id
    }
    console.log(prenotazioneModified)
    localStorage.setItem("prenotazioneModified", JSON.stringify(prenotazioneModified))
    window.location = "/modificaPrenotazione"
  }

  function dannoMezzo(id, idMezzo) {
    const dannoVeicolo = {
      id: id,
      idMezzo: idMezzo
    }
    localStorage.setItem("dannoVeicolo", JSON.stringify(dannoVeicolo))
    window.location = "/aggiungiDannoMezzo"
  }

  return (
    <Page title="Ricerca Prenotazione">
      <div className="container-fluid text-font pt-5">
        <div className="row justify-content-center pt-1 mt-5 mb-5 pb-5">
          <div className="col-xl-10 col-lg-12 col-md-9 mb-5">
            <div className="card img-shadow my-5 img-contatti">
              <div className="card-body justify-content-center img-shadow img-contatti" style={{ backgroundColor: "#f8f9fa" }}>
                <div className="row mt-2">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    {/* TESTO SUPERIORE */}
                    <div className="text-center img-contatti pt-3 pb-1">
                      <h2 className="  mb-3">
                        <strong> Ricerca prenotazione </strong>
                      </h2>
                    </div>
                    <div className="container mb-5 " style={{ width: "auto" }}>
                      <div className="row align-center justify-content-center">
                        {errori ? (
                          <div className=" p-2  col-3 alert alert-danger img-contatti" role="alert">
                            {errori}
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </div>
                    {/* FORM DI RICERCA */}
                    <form onSubmit={handledSubmit} className="col-lg-12 col-md-12 col-sm-12 text-font justify-content-center align-center mt-3 ">
                      <div className="form-row">
                        <div className="col-lg-4 col-md-12 col-sm-12 mb-3">
                          <input onChange={e => setIdPrenotazione(e.target.value)} type="text" className="form-control" placeholder="ID Prenotazione" id="idPrenotazione" name="idPrenotazione" />
                        </div>

                        <div className="col-lg-4 col-md-12 col-sm-12 mt-2 mb-3">
                          <KeyboardDatePicker cancelLabel="Annulla" clearLabel="Pulisci" clearable value={selectedDate} placeholder="Data Prenotazione" InputAdornmentProps={{ position: "start" }} onChange={date => setSelectedDate(date)} format="dd/MM/yyyy" />
                        </div>

                        <div className="col-lg-4 col-md-12 col-sm-12 mb-3">
                          <input onChange={e => setCognomeUtente(e.target.value)} type="text" className="form-control" placeholder="Cognome Utente" id="cognome" name="cognome" />
                        </div>
                      </div>
                      <div className="col-12 mt-3 align-center mb-5">
                        <button type="submit" to="" className="pr-5 pl-5 btn btn-primary display-4" style={{ width: "auto" }}>
                          Cerca
                        </button>
                      </div>
                    </form>
                    <div className="row justify-content-center text-font">
                      <div className="col-sm-12 col-lg-12 col-md-12">
                        <div className="row ">
                          <div className="col-sm-12 col-lg-4 col-md-12 mb-4">
                            {/* RISULTATI RICERCA */}
                            <div className="list-group " id="list-tab" role="tablist">
                              {prenotazioni ? (
                                prenotazioni.map(prenotazione => (
                                  <a key={prenotazione._id} className=" list-group-item list-group-item-action " id={prenotazione._id} data-toggle="list" href={"#" + prenotazione.idPrenotazione} role="tab" aria-controls={prenotazione.idPrenotazione} aria-selected="true">
                                    Prenotazione n.{prenotazione.idPrenotazione} - {prenotazione.nomeCliente + " " + prenotazione.cognomeCliente}
                                  </a>
                                ))
                              ) : (
                                <div></div>
                              )}
                            </div>
                          </div>

                          <div className="col-sm-12 col-lg-8 col-md-12 ">
                            <div className="tab-content" id="nav-tabContent">
                              {prenotazioni ? (
                                prenotazioni.map(prenotazione => (
                                  <div key={prenotazione._id} className="tab-pane fade show" id={(prenotazione.dataRitiro, prenotazione.dataConsegna, prenotazione.ParcheggioRitiro, prenotazione.parcheggioConsegna, prenotazione.idPrenotazione)} role="tabpanel" aria-labelledby={prenotazione.idPrenotazione}>
                                    <div className="row pt-4 ml-3 mr-3 mb-3 align-center justify-content-center  img-shadow" style={{ backgroundColor: "#f8f9fa" }}>
                                      <div className="col-12">
                                        <table className="table table-striped">
                                          <tbody>
                                            <tr>
                                              <th style={{ width: "70%" }} scope="row">
                                                ID Prenotazione
                                              </th>
                                              <td>{prenotazione.idPrenotazione}</td>
                                            </tr>
                                            <tr
                                              style={{
                                                backgroundColor: "#e44444"
                                              }}
                                            >
                                              <th scope="row">Stato Prenotazione</th>
                                              <td>{prenotazione.stato}</td>
                                            </tr>
                                            <tr>
                                              <th scope="row">Nome Cliente</th>
                                              <td>{prenotazione.nomeCliente}</td>
                                            </tr>
                                            <tr>
                                              <th scope="row">Cognome Cliente</th>
                                              <td>{prenotazione.cognomeCliente}</td>
                                            </tr>
                                            <tr>
                                              <th scope="row">Data/orario di ritiro</th>
                                              <td>{new Date(prenotazione.dataRitiro).toLocaleString("it-IT")}</td>
                                            </tr>
                                            <tr>
                                              <th scope="row">Data/orario di consegna</th>
                                              <td>{new Date(prenotazione.dataConsegna).toLocaleString("it-IT")}</td>
                                            </tr>
                                            <tr>
                                              <th scope="row">Stallo/Parcheggio ritiro</th>
                                              <td>{prenotazione.ParcheggioRitiro}</td>
                                            </tr>
                                            <tr>
                                              <th scope="row">Stallo/Parcheggio consegna</th>
                                              <td>{prenotazione.parcheggioConsegna}</td>
                                            </tr>
                                            <tr>
                                              <th scope="row">Tipologia mezzo</th>
                                              <td>{prenotazione.tipologia}</td>
                                            </tr>

                                            <tr>
                                              <th scope="row">Modello mezzo</th>
                                              <td>{prenotazione.modello}</td>
                                            </tr>
                                            {prenotazioni.tipologia == "auto" || prenotazioni.tipologia == "moto" ? (
                                              <tr>
                                                <th scope="row">Targa mezzo</th>
                                                <td>{prenotazione.targa}</td>
                                              </tr>
                                            ) : prenotazioni.tipologia == "bicicletta" || prenotazioni.tipologia == "monopattino" ? (
                                              <tr>
                                                <th scope="row">ID mezzo </th>
                                                <td>{prenotazione.identificativoMezzo}</td>
                                              </tr>
                                            ) : (
                                              <div></div>
                                            )}
                                            <tr>
                                              <th scope="row">Danni mezzo</th>
                                              <td>{prenotazione.danniVeicolo}</td>
                                            </tr>
                                            <tr>
                                              <th scope="row">Autista</th>
                                              <td>{ prenotazione.idAutista == "" ? "NO" : "SI"}</td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>

                                      <div className="align-center mt-2 mb-2">
                                        <button onClick={() => modificaPrenotazione(prenotazione.dataRitiro, prenotazione.dataConsegna, prenotazione.ParcheggioRitiro, prenotazione.parcheggioConsegna, prenotazione._id)} className=" btn btn-light img-border ">
                                          Modifica
                                        </button>
                                        <button onClick={() => dannoMezzo(prenotazione._id, prenotazione.idMezzo)} className=" btn btn-light img-border ">
                                          Danno mezzo
                                        </button>
                                        <button onClick={() => rimuoviPrenotazione(prenotazione._id)} className="btn btn-secondary">
                                          Rimuovi
                                        </button>
                                      </div>
                                    </div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}

export default withRouter(RicercaPrenotazione)
