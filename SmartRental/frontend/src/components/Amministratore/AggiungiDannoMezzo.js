import React, { useContext, useState } from "react"

import Axios from "axios"
import StateContext from "../../StateContext"
import Page from "../Page"
import ExampleContext from "../../ExampleContext"
import { withRouter } from "react-router-dom"

function AggiungiDannoMezzo() {
  const [dannoMezzo, setDannoMezzo] = useState(" ")
  const addFlashMessage = useContext(ExampleContext)
  const appState = useContext(StateContext)

  async function handledSubmit(e) {
    e.preventDefault()
    const dannoVeicolo = JSON.parse(localStorage.getItem("dannoVeicolo"))
    const id = dannoVeicolo.id
    const idMezzo = dannoVeicolo.idMezzo
    var idCliente = appState._id
    try {
      await Axios.post("http://localhost:8081/aggiungiDannoMezzo", { id, dannoMezzo })
        .then(async response => {
          console.log(response)
          try {
            await Axios.post("http://localhost:8081/dannoMezzo", { idMezzo }).then(async () => {
              let idPrenotazione = id
              await Axios.post("http://localhost:8081/getPrenotazione", { idPrenotazione }).then(async prenotazione => {
                let idMezzo = prenotazione.data.idMezzo
                let dataOraConsegna = selectedDate
                let id = prenotazione.data._id
                let dataOraRitiro = prenotazione.data.dataRitiro
                await Axios.post("http://localhost:8081/checkPrenotazioneImprevisti", { idMezzo, idCliente, dataOraConsegna, dataOraRitiro }).then(async prenotazioneTrovata => {
                  console.log(prenotazioneTrovata)
                  if (prenotazioneTrovata.data) {
                    let idMezzo = prenotazioneTrovata.data.idMezzo
                    let modello = prenotazioneTrovata.data.modello
                    let parcheggioRitiro = prenotazioneTrovata.data.ParcheggioRitiro
                    const dataOraConsegna = prenotazioneTrovata.data.dataConsegna
                    const dataOraRitiro = prenotazioneTrovata.data.dataRitiro
                    idCliente = prenotazioneTrovata.data.idCliente
                    const idPrenotazione = prenotazioneTrovata.data.idPrenotazione
                    const idP = prenotazioneTrovata.data._id
                    const nome = prenotazioneTrovata.data.nomeCliente
                    console.log(idMezzo, modello, parcheggioRitiro, dataOraConsegna, dataOraRitiro, idCliente, idPrenotazione)
                    await Axios.post("http://localhost:8081/sostituzioneMezzo", { idMezzo, modello, parcheggioRitiro }).then(async mezzi => {
                      if (mezzi.data.length > 0) {
                        const mezzo = mezzi.data[0]
                        console.log("MEZZO", mezzo)
                        let idMezzo = mezzo._id
                        let resp = await Axios.post("http://localhost:8081/checkModificaPrenotazione", { idMezzo, dataOraConsegna, dataOraRitiro, idCliente })
                        console.log(resp)
                        if (!resp.data) {
                          let identificativo = mezzo.identificativo
                          let targa = mezzo.targa
                          let tipologia = mezzo.tipoMezzo
                          let modello = mezzo.modello
                          let img = mezzo.imgName
                          await Axios.post("http://localhost:8081/modificaPrenotazioneImprevisti", { token: appState.utente.token, idPrenotazione, idMezzo, identificativo, targa, tipologia, modello, img }).then(response => {
                            console.log("prenotazione Cambiata")
                            console.log("RISPOSTA PRENOTAZIONE CAMBIATA", response)
                          })
                        }
                      } else {
                        let id = idP
                        await Axios.post("http://localhost:8081/rimuoviPrenotazione", { token: appState.utente.token, id }).then(async response => {
                          await Axios.post("http://localhost:8081/findUserById", { idCliente })
                            .then(utente => {
                              const datiEmail = {
                                email: utente.email,
                                nomeCliente: nome,
                                dataRitiro: new Date(dataOraRitiro).toLocaleString(),
                                dataConsegna: new Date(dataOraConsegna).toLocaleString(),
                                id: idPrenotazione
                              }
                              emailjs.send("service_9pghi1c", "prenotazione_rimossa", datiEmail, "user_f8eOINgia5sNit8AooEiG").then(
                                async function (risposta) {
                                  console.log("SUCCESS!", risposta.status, risposta.text)
                                  window.location = "/"
                                },
                                function (error) {
                                  console.log("FAILED...", error)
                                }
                              )
                              console.log("Mezzi non trovati")
                            })
                            .catch(e => {
                              console.log(e.response)
                            })
                        })
                      }
                    })
                  } else {
                    window.location = "/"
                  }
                })
              })
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
        })
        .catch(error => {
          console.log(error)
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
  return (
    <Page title="Aggiungi Danno Mezzo">
      <div className="text-font">
        <div className="container ">
          <div className="row justify-content-center pt-2 mb-3 ">
            <div className="col-xl-10 col-lg-12 col-md-9 ">
              <div className="card  my-4 img-contatti">
                <div className="card-body justify-content-center">
                  {/* TESTO IN ALTO */}
                  <div className="text-center img-contatti pr-2 pl-2 pt-4 pb-3">
                    <h2 className=" mb-3">
                      <strong> Aggiungi un danno al mezzo</strong>
                    </h2>
                    <p>Fornisci i dettagli del danno arrecato da un cliente sulla vettura</p>
                  </div>

                  <div className="row mt-2">
                    <div className="col-lg-10 col-md-12 col-sm-12">
                      <div className="p-3 img-shadow mb-4 img-contatti" style={{ backgroundColor: "#f8f9fa" }}>
                        <form onSubmit={handledSubmit} className="col-lg-12 col-md-12 col-sm-12 text-font justify-content-center align-center mt-2 ">
                          <h5 className="align-center mb-4 mt-3">Descrizione del danno causato al mezzo</h5>

                          <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
                              <div className="form-group">
                                <textarea onChange={e => setDannoMezzo(e.target.value)} className="form-control" id="exampleFormControlTextarea1" placeholder="Inserisci qui il testo" rows={5} defaultValue={""} />
                              </div>
                            </div>
                          </div>

                          <div className="col-12 align-center mt-2">
                            <button type="submit" className="btn btn-primary display-4 pr-5 pl-5" style={{ width: "auto" }}>
                              Aggiungi
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
      </div>
    </Page>
  )
}

export default withRouter(AggiungiDannoMezzo)
