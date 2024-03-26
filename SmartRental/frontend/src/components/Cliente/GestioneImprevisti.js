import React, { useState, useContext } from "react"

import { TimePicker } from "@material-ui/pickers"
import Axios from "axios"
import Page from "../Page"
import StateContext from "../../StateContext"
import { withRouter } from "react-router-dom"

function GestioneImprevisti() {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [idPrenotazione, setIdPrenotazione] = useState()
  const [ritardoPrenotazione, setRitardoPrenotazione] = useState()
  const [consegna, setConsegna] = useState()
  const [parcheggioAlternativo, setParcheggioAlternativo] = useState()
  const appState = useContext(StateContext)

  async function handleSubmit(e) {
    e.preventDefault()
    var idCliente = appState._id
    console.log(selectedDate, idPrenotazione, parcheggioAlternativo, consegna)
    try {
      await Axios.post("http://localhost:8081/getPrenotazione", { token: appState.utente.token, idPrenotazione }).then(async prenotazione => {
        console.log("GETPRENOTAZIONE", prenotazione)
        if (prenotazione.stato == "In Corso") {
          try {
            if (consegna != undefined && parcheggioAlternativo == undefined) {
              var parcheggioConsegna = consegna
            } else if (consegna == undefined && parcheggioAlternativo != undefined) {
              var parcheggioConsegna = parcheggioAlternativo
            } else {
              console.log("Inserire un nuovo posto per il rilascio dell'auto'")
              return
            }
            let idMezzo = prenotazione.data.idMezzo
            let dataOraConsegna = selectedDate
            let id = prenotazione.data._id
            let dataOraRitiro = prenotazione.data.dataRitiro
            let ritardo = ritardoPrenotazione

            let response = await Axios.post("http://localhost:8081/modificaPrenotazione", { token: appState.utente.token, id, dataOraRitiro, dataOraConsegna, parcheggioConsegna, ritardo })

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
      })

      /* if (response) {
        console.log(response)
        setPrenotazioni(response.data)
      } else {
        console.log("Errore nei dati inseriti")
      } */
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
    <Page title="Gestione Imprevisti">
      <div className="container pt-5 pb-5 text-font">
        <div className="row justify-content-center mt-5 mb-5 ">
          <div className="col-xl-10 col-lg-12 col-md-9 ">
            <div className="card  img-contatti">
              <div className="card-body justify-content-center">
                {/* TESTO SOPRA */}
                <div className="text-center img-contatti pr-2 pl-2 pt-4 pb-3">
                  <h2 className=" mb-3">
                    <strong> Gestisci imprevisti</strong>
                  </h2>
                  <p>Se hai un imprevisto o prevedi di ritardare nella consegna del mezzo, faccelo sapere compilando il form qui sotto</p>
                </div>
                <div className="row mt-2 justify-content-center align-center">
                  <div className="col-lg-10 col-md-12 col-sm-12">
                    <div className="p-3 img-shadow mb-4 img-contatti" style={{ backgroundColor: "#f8f9fa" }}>
                      {/* FORM CON I VARI CAMPI */}
                      <form onSubmit={handleSubmit} className="col-lg-12 col-md-12 col-sm-12 text-font justify-content-center align-center mt-2 ">
                        <div className="col-12 mb-4 mt-3 " style={{ width: "auto" }}>
                          <input onChange={e => setIdPrenotazione(e.target.value)} type="text" className="form-control align-center" placeholder="ID Prenotazione" id="idPrenotazione" name="idPrenotazione" />
                        </div>
                        <div className="row">
                          <div className="col-12 mb-3">
                            <label>Motivazione del ritardo</label>
                            <div className="form-group">
                              <textarea onChange={e => setRitardoPrenotazione(e.target.value)} className="form-control " id="exampleFormControlTextarea1" placeholder="Inserisci qui il testo" rows={5} defaultValue="" />
                            </div>
                          </div>
                        </div>
                        <div className="form-row justify-content-center align-center">
                          <div className="col-12 mb-4">
                            <label>Nuovo orario di consegna</label>
                            <div>
                              <TimePicker clearable ampm={false} value={selectedDate} inputProps={{ style: { textAlign: "center" } }} onChange={setSelectedDate} />
                            </div>
                          </div>

                          <div className="col-12 mb-4" style={{ width: "50%" }}>
                            <label>Nuovo stallo/parcheggio di destinazione</label>
                            <div>
                              <select onChange={e => setConsegna(e.target.value)} style={{ width: "auto" }} defaultValue={"DEFAULT"} className="custom-select align-center" id="validationDefault04" required>
                                <option disabled value="DEFAULT">
                                  Seleziona
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
                          <div className="col-12 mb-3" style={{ width: "50%" }}>
                            <label>Stallo/parcheggio alternativo</label>
                            <input onChange={e => setParcheggioAlternativo(e.target.value)} placeholder="" type="text" className="form-control" id="stalloAlt" name="stalloAlt" />
                          </div>
                        </div>
                        <div className="col-12 align-center mt-2">
                          <button type="submit" className="btn btn-primary display-4 pr-5 pl-5" style={{ width: "auto" }}>
                            Invia
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

export default withRouter(GestioneImprevisti)
