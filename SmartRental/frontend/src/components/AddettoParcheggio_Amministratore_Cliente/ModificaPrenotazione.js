import React, { useState, useContext } from "react"

import { DateTimePicker } from "@material-ui/pickers"

import Axios from "axios"

import Page from "../Page"
import StateContext from "../../StateContext"
import ExampleContext from "../../ExampleContext"
import { withRouter } from "react-router-dom"

function ModificaPrenotazione() {
  const prenotazioneModified = JSON.parse(localStorage.getItem("prenotazioneModified"))
  const [dataOraRitiro, setDataOraRitiro] = useState(new Date(prenotazioneModified.dataRitiro))
  const [dataOraConsegna, setDataOraConsegna] = useState(new Date(prenotazioneModified.dataConsegna))
  const [parcheggioConsegna, setParcheggioConsegna] = useState(prenotazioneModified.parcheggioConsegna)
  const appState = useContext(StateContext)
  const addFlashMessage = useContext(ExampleContext)
  async function handleSubmit(e) {
    e.preventDefault()

    const idMezzo = prenotazioneModified.idMezzo
    const idCliente = appState._id
    const id = prenotazioneModified.id
    if (Math.floor((new Date(prenotazioneModified.dataRitiro) - new Date()) / (1000 * 60 * 60)) > 2) {
      try {
        await Axios.post("http://localhost:8081/checkModificaPrenotazione", { dataOraRitiro, dataOraConsegna, idMezzo, idCliente })
          .then(async function (response) {
            console.log(response)

            if (!response.data) {
              console.log(dataOraRitiro, dataOraConsegna, id, parcheggioConsegna)
              await Axios.post("http://localhost:8081/modificaPrenotazione", { token: appState.utente.token, dataOraRitiro, dataOraConsegna, id, parcheggioConsegna })
                .then(resp => {
                  console.log(resp)
                  localStorage.removeItem("PrenotazioneModified")
                  addFlashMessage("Prenotazione Modificata con successo")
                  setTimeout(function () {
                    window.location.href = "/"
                  }, 1200)
                })
                .catch(e => {
                  console.log(e)
                })
            }
          })
          .catch(e => {
            console.log(e)
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
    } else {
      addFlashMessage("Mancano meno di due ore dall'inizio della Prenotazione")
    }
  }

  return (
    <Page title="Modifica Prenotazione">
      <div className="container pt-5 text-font">
        <div className="row justify-content-center mt-5 mb-3 ">
          <div className="col-xl-10 col-lg-12 col-md-9 ">
            <div className="card o-hidden border-0 shadow-lg my-4 img-contatti">
              <div className="card-body justify-content-center">
                {/* TESTO IN ALTO */}
                <div className="text-center img-contatti pr-2 pl-2 pt-4 pb-3">
                  <h2 className=" mb-3">
                    <strong> Modifica la prenotazione!</strong>
                  </h2>
                </div>

                <div className="row mt-2">
                  <div className="col-lg-10 col-md-12 col-sm-12">
                    <div className="p-3 img-shadow mb-4 img-contatti" style={{ backgroundColor: "#f8f9fa" }}>
                      <form onSubmit={handleSubmit} className="col-lg-12 col-md-12 col-sm-12 text-font justify-content-center align-center mt-2 ">
                        <div className="form-row">
                          <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                            <label htmlFor="cilindrata" className="ml-2">
                              Data e orario di ritiro
                            </label>
                            <div>
                              <DateTimePicker disablePast cancelLabel="Annulla" clearLabel="Pulisci" format="dd/MM/yyyy HH:mm" placeholder="ParcheggioStalloRitiro" inputVariant="outlined" value={dataOraRitiro} onChange={date => setDataOraRitiro(date)} />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                            <label htmlFor="cilindrata" className="ml-2">
                              Data e orario di consegna
                            </label>
                            <div>
                              <DateTimePicker disablePast cancelLabel="Annulla" clearLabel="Pulisci" format="dd/MM/yyyy HH:mm" placeholder="ParcheggioStalloRitiro" inputVariant="outlined" value={dataOraConsegna} onChange={date => setDataOraConsegna(date)} />
                            </div>
                          </div>

                          <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                            <label htmlFor="cilindrata" className="ml-2">
                              Stallo/Parcheggio di ritiro
                            </label>
                            <div>
                              <select defaultValue={prenotazioneModified.parcheggioRitiro} className="custom-select " id="validationDefault04" disabled>
                                <option disabled value="DEFAULT">
                                  Parcheggio/Stallo ritiro
                                </option>
                                <option value="Leonardo da Vinci">Leonardo da Vinci - Parcheggio</option>
                                <option value="Calatafimi">Calatafimi - Parcheggio</option>
                                <option value="Stazione_Centrale">Stazione Centrale - Parcheggio</option>
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
                            </div>
                          </div>

                          <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                            <label htmlFor="targa" className="ml-2">
                              Stallo/Parcheggio di destinazione
                            </label>
                            <div>
                              <select defaultValue={prenotazioneModified.parcheggioConsegna} onChange={e => setParcheggioConsegna(e.target.value)} className="custom-select" id="validationDefault04" required>
                                <option disabled value="DEFAULT">
                                  Parcheggio/Stallo destinazione
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
                            </div>
                          </div>
                        </div>

                        <div className="col-12 align-center mt-3">
                          <button type="submit" className="btn btn-primary display-4 pr-5 pl-5" style={{ width: "auto" }}>
                            Modifica
                          </button>
                        </div>
                      </form>
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

export default withRouter(ModificaPrenotazione)
