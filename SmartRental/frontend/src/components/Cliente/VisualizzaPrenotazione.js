import React, { useState, useEffect, useContext } from "react"

import Axios from "axios"

import StateContext from "../../StateContext"
import LoadingDotsIcon from "../LoadingDotsIcon"
import ExampleContext from "../../ExampleContext"
import Page from "../Page"

function VisualizzaPrenotazione() {
  const appState = useContext(StateContext)
  const [prenotazioni, setPrenotazioni] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const [id, setId] = useState()
  const [idPrenotazione, setIdPrenotazione] = useState()
  const [tipoMezzo, setTipoMezzo] = useState()
  const [idMezzo, setIdMezzo] = useState()
  const [modello, setModello] = useState()
  const [dataRitiro, setDataRitiro] = useState()
  const [dataConsegna, setDataConsegna] = useState()
  const [parcheggioRitiro, setParcheggioRitiro] = useState()
  const [parcheggioConsegna, setParcheggioConsegna] = useState()
  const [ritardo, setRitardo] = useState()
  const [danniMezzo, setDanniMezzo] = useState()
  const [stato, setStato] = useState()
  const [autista, setAutista] = useState()
  const addFlashMessage = useContext(ExampleContext)

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source()
    const id = appState._id
    async function fetchPrenotazioni() {
      try {
        const response = await Axios.post(`http://localhost:8081/getPrenotazioniByID`, { id })
        console.log(response)
        setPrenotazioni(response.data)
        setIsLoading(false)
      } catch (error) {
        console.log("There was a problem.")
      }
    }
    fetchPrenotazioni()
    return () => {
      ourRequest.cancel()
    }
  }, [])

  function selectPrenotazione(id, idPrenotazione, tipologia, modello, dataRitiro, dataConsegna, parcheggioRitiro, parcheggioConsegna, ritardo, danniMezzo, idMezzo, stato, idAutista) {
    setId(id)
    setIdPrenotazione(idPrenotazione)
    setTipoMezzo(tipologia)
    setModello(modello)
    setDataRitiro(dataRitiro)
    setDataConsegna(dataConsegna)
    setParcheggioRitiro(parcheggioRitiro)
    setParcheggioConsegna(parcheggioConsegna)
    setRitardo(ritardo)
    setDanniMezzo(danniMezzo)
    setIdMezzo(idMezzo)
    setStato(stato)
    setAutista(idAutista)
  }

  async function rimuoviPrenotazione(e) {
    e.preventDefault()
    const idCliente = appState._id

    try {
      let dataOraRitiro = dataRitiro
      let dataOraConsegna = dataConsegna
      await Axios.post("http://localhost:8081/checkModificaPrenotazione", { dataOraRitiro, dataOraConsegna, idMezzo, idCliente })
        .then(async function (response) {
          console.log(response)

          if (!response.data) {
            await Axios.post("http://localhost:8081/rimuoviPrenotazione", { token: appState.utente.token, id })
              .then(() => {
                addFlashMessage("Prenotazione Rimossa con successo")
                setTimeout(function () {
                  window.location.href = "/areaPersonale"
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
    } catch (e) {
      console.log(e.response)
    }
  }
  async function modificaPrenotazione(e) {
    e.preventDefault()

    const prenotazioneModified = {
      dataRitiro: dataRitiro,
      dataConsegna: dataConsegna,
      parcheggioConsegna: parcheggioConsegna,
      parcheggioRitiro: parcheggioRitiro,
      id: id
    }

    localStorage.setItem("prenotazioneModified", JSON.stringify(prenotazioneModified))
    window.location = "/modificaPrenotazione"
  }

  if (isLoading) return <LoadingDotsIcon />

  return (
    <Page title="Visualizza Prenotazione">
      {/* Modal */}
      <div className="modal fade text-font" id="exampleModalCenter" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Prenotazione n.{idPrenotazione}
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="col-sm-12 col-lg-12 col-md-12 ">
                <ul className="list-group list-group-item-action">
                  <li className="list-group-item">ID Prenotazione: {idPrenotazione} </li>
                  <li className="list-group-item">Tipo mezzo : {tipoMezzo}</li>
                  <li className="list-group-item">Modello mezzo: {modello} </li>
                  <li className="list-group-item">Data e orario di ritiro: {new Date(dataRitiro).toLocaleString("it-IT")}</li>
                  <li className="list-group-item">Data e orario di consegna: {new Date(dataConsegna).toLocaleString("it-IT")} </li>
                  <li className="list-group-item">Stallo/Parcheggio di ritiro: {parcheggioRitiro} </li>
                  <li className="list-group-item">Stallo/Parcheggio di consegna: {parcheggioConsegna} </li>
                  <li className="list-group-item">Ritardo: {ritardo} </li>
                  <li className="list-group-item">Danni sul mezzo: {danniMezzo} </li>
                  <li className="list-group-item">Autista: {autista == "" ? "NO" : "SI"} </li>
                </ul>
              </div>
            </div>
            {stato == "In Attesa" ? (
              <div className="align-center mt-2 mb-2">
                <a type="button" onClick={modificaPrenotazione} className=" btn btn-light img-border ">
                  Modifica
                </a>
                <a type="button" onClick={rimuoviPrenotazione} className="btn btn-secondary">
                  Rimuovi
                </a>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>

      <div className="container-fluid pt-5 pb-5 text-font">
        <div className="row justify-content-center mt-5 mb-5 ">
          <div className="col-12 pb-4">
            {/* TESTO SOPRA */}
            <div className="text-center img-contatti pt-3 ">
              <h2 className=" mb-3">
                <strong> Visualizza le tue prenotazioni</strong>
              </h2>
              <p>In questa sezione puoi vedere lo storico delle tue prenotazioni "in attesa", "conclusa" o "in corso"</p>
            </div>
          </div>
          <div className="col-8 pb-5 mb-5 pt-3">
            <div className="card img-shadow img-contatti my-5 ">
              {/* RETTANGOLO CENTRALE */}
              <div className="card-body img-contatti " style={{ backgroundColor: "#f8f9fa" }}>
                <div className="row">
                  {/* CARDS PRENOTAZIONI */}
                  <div className="card-deck m-5">
                    {prenotazioni ? (
                      prenotazioni.map(prenotazione => (
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 pt-3" key={prenotazione._id}>
                          <a onClick={() => selectPrenotazione(prenotazione._id, prenotazione.idPrenotazione, prenotazione.tipologia, prenotazione.modello, prenotazione.dataRitiro, prenotazione.dataConsegna, prenotazione.ParcheggioRitiro, prenotazione.parcheggioConsegna, null, prenotazione.danniVeicolo, prenotazione.idMezzo, prenotazione.stato, prenotazione.idAutista)} type="button" data-toggle="modal" data-target="#exampleModalCenter" className="card  btn-light img-shadow ">
                            <div className="card-header align-center text-white " style={{ backgroundColor: "#e34646" }}>
                              <strong>{prenotazione.stato}</strong>
                            </div>
                            <img className="card-img-top" src={`/uploads/${prenotazione.imgMezzo}`} alt="Immagine mezzo" />
                            <div className="card-body">
                              <h5 className="card-title">Prenotazione n.{prenotazione.idPrenotazione}</h5>
                              <p className="card-text">{prenotazione.modello}</p>
                            </div>
                            <div className="card-footer">
                              <small className="text-muted">Data di prenotazione: {prenotazione.dataPrenotazione} </small>
                            </div>
                          </a>
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

export default VisualizzaPrenotazione
