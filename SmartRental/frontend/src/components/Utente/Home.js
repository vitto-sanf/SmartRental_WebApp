import React, { useState } from "react"

import { DateTimePicker } from "@material-ui/pickers"

import Axios from "axios"
import Page from "../Page"

function Home() {
  const [parcheggioRitiro, setParcheggioRitiro] = useState()
  const [parcheggioConsegna, setParcheggioConsegna] = useState()
  const [dataOraRitiro, setDataOraRitiro] = useState(null)
  const [dataOraConsegna, setDataOraConsegna] = useState(null)
  const [tipologia, setTipologia] = useState()
  const [categoria, setCategoria] = useState()
  const [selected, setSelected] = useState()
  const [errori, setErrori] = useState()

  localStorage.removeItem("mezzi_trovati")
  const changeSelectOptionHandler = e => {
    setSelected(e.target.value)
    setTipologia(e.target.value)
  }

  const categoriaAuto = ["City Car", "Sportiva", "SUV"]
  const categoriaMoto = ["Sportiva", "Scooter"]

  let type = null
  let options = null

  if (selected === "auto") {
    type = categoriaAuto
  } else if (selected === "moto") {
    type = categoriaMoto
  }

  if (type) {
    options = type.map(el => <option key={el}>{el}</option>)
  }

  async function handleSubmit(e) {
    const idCliente = localStorage.getItem("_id")

    let stato = "In Attesa"
    e.preventDefault()
    let dataRitiro = new Date(dataOraRitiro)
    let dataConsegna = new Date(dataOraConsegna)
    /*   let oraRitiro = new Date(dataOraRitiro).getTime()
    let oraConsegna = new Date(dataOraConsegna).getTime() */
    let data = new Date()
    if (dataRitiro < dataConsegna && data < dataRitiro) {
      try {
        let dataRitiro = new Date(dataOraRitiro)
        let dataConsegna = new Date(dataOraConsegna)
        const autista = await Axios.post("http://localhost:8081/getAutistaByPrenotazione", { dataRitiro, dataConsegna })
        console.log("autista", autista)

        await Axios.post("http://localhost:8081/getIdMezzoByPrenotazione", {
          dataRitiro,
          dataConsegna,
          parcheggioRitiro,
          tipologia,
          categoria
        }).then(response => {
          console.log(response.data)
          const prenotazione = {
            ritiro: dataRitiro,
            consegna: dataConsegna,
            parcheggioRitiro: parcheggioRitiro,
            parcheggioConsegna: parcheggioConsegna,
            idCliente: idCliente,
            stato: stato,
            tipologia: tipologia,
            categoria: categoria
          }
          localStorage.setItem("autista", JSON.stringify(autista.data))
          localStorage.setItem("mezzi_trovati", JSON.stringify(response.data))
          localStorage.setItem("prenotazione", JSON.stringify(prenotazione))
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
      window.location = "/ricerca"
    } else {
      setErrori("Date inserite non valide")
    }
  }

  return (
    <Page title="Home">
      <div className="text-font pt-5" style={{ backgroundColor: "#f8f9fa" }}>
        {/* TITOLO */}
        <div className="container-fluid row mt-5 ">
          <div className="col-12 pt-3 ">
            <h1 className="  pb-3  align-center">
              <strong>Prenota il mezzo che preferisci e gira tutta la città!</strong>
            </h1>
          </div>
        </div>
        {/* SOTTOTITOLO + FORM CENTRALE  */}
        <div className="container">
          <h5 className=" display-7 text-muted align-center mb-5">Potrai scegliere tra tantissime auto, moto, biciclette elettriche e monopattini per raggiungere qualsiasi luogo della città, Riscopri i dettagli della tua città viaggiando con noi!</h5>
          <div className="container mb-5 " style={{ width: "auto" }}>
            <div className="row align-center justify-content-center">
              {errori ? (
                <div className=" p-2 m-2 mt-2 mb-2 col-3 alert alert-danger img-contatti" role="alert">
                  {errori}
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="card col-sm-12 col-md-12 col-lg-12 col-xl-10 ">
              <div className=" img-shadow img-border mb-4 p-5" style={{ backgroundColor: "#bcc8e9", borderRadius: "20px" }}>
                <div className="align-center  ">
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-12 mb-5 mt-3">
                        <h6 className=" mb-3  ">
                          <strong>Parcheggio/Stallo ritiro</strong>
                        </h6>

                        <div>
                          <select onChange={e => setParcheggioRitiro(e.target.value)} style={{ width: "auto" }} defaultValue={"DEFAULT"} className="custom-select align-center" id="validationDefault04" required>
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
                      <div className="col-lg-6 col-md-6 col-sm-12 mb-5 mt-3">
                        <h6 className=" mb-3 ">
                          <strong>Parcheggio/Stallo destinazione</strong>
                        </h6>

                        <div>
                          <select onChange={e => setParcheggioConsegna(e.target.value)} style={{ width: "auto" }} defaultValue={"DEFAULT"} className="custom-select align-center" id="validationDefault04" required>
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
                    </div>
                    <div className="form-row">
                      <div className="col-lg-3 col-md-6 col-sm-12 mb-4 mt-2">
                        <h6 className="mb-3">
                          <strong htmlFor="validationDefault03">Data/Ora Ritiro</strong>
                        </h6>
                        <div className="p-1 " style={{ backgroundColor: "#ffffff", borderRadius: "5px" }}>
                          <DateTimePicker disablePast cancelLabel="Annulla" clearLabel="Pulisci" inputProps={{ style: { textAlign: "center" } }} format="dd/MM/yyyy HH:mm" placeholder="Inserisci qui" value={dataOraRitiro} onChange={date => setDataOraRitiro(date)} />
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-12 mb-4 mt-2">
                        <h6 className="mb-3">
                          <strong htmlFor="validationDefault03">Data/Ora Consegna</strong>
                        </h6>
                        <div className="p-1" style={{ backgroundColor: "#ffffff", borderRadius: "5px" }}>
                          <DateTimePicker disablePast cancelLabel="Annulla" clearLabel="Pulisci" inputProps={{ style: { textAlign: "center" } }} format="dd/MM/yyyy HH:mm" placeholder="Inserisci qui" value={dataOraConsegna} onChange={date => setDataOraConsegna(date)} />
                        </div>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-12 mb-4 mt-2">
                        <h6 className=" mb-3">
                          <strong>Tipologia mezzo</strong>
                        </h6>

                        <select defaultValue={"DEFAULT"} onChange={changeSelectOptionHandler} style={{ width: "auto" }} className="custom-select align-center " id="tipo" name="tipo" required>
                          <option value="DEFAULT" disabled>
                            Seleziona
                          </option>
                          <option value="auto">Auto</option>
                          <option value="moto">Moto</option>
                          <option value="bicicletta">Bicicletta</option>
                          <option value="monopattino">Monopattino</option>
                        </select>
                      </div>
                      <div className="col-lg-3 col-md-6 col-sm-12 mb-4 mt-2">
                        <h6 className=" mb-3">
                          <strong>Categoria mezzo</strong>
                        </h6>

                        <select defaultValue={"DEFAULT"} onChange={e => setCategoria(e.target.value)} className="custom-select align-center" style={{ width: "auto" }} placeholder="Seleziona" id="categoria" name="categoria">
                          <option value="DEFAULT" disabled>
                            Seleziona
                          </option>
                          {options}
                        </select>
                      </div>
                    </div>

                    <button className="btn btn-primary mt-3" type="submit">
                      Ricerca
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* CARDS CON FOTO */}
        <div className="card container-fluid d-none d-lg-block pb-4">
          <div className="row ">
            <div className="сol-12 col-md-6 col-lg-3 my-4">
              <div className="card">
                <img src="/img/pexels-element-digital-1051071-718x1076.jpg" className=" img-contatti img-shadow " alt="Foto auto" />
              </div>
            </div>
            <div className=" сol-12 col-md-6 col-lg-3 my-4">
              <div className="card">
                <img src="/img/pexels-anna-tarazevich-7216927-718x1077.jpg" className="img-contatti img-shadow" alt="Foto bicicletta" />
              </div>
            </div>
            <div className="сol-12 col-md-6 col-lg-3 my-4">
              <div className="card">
                <img src="/img/pexels-daria-sannikova-2938202-718x1083.jpg" className=" img-contatti img-shadow" alt="Foto moto" />
              </div>
            </div>
            <div className=" сol-12 col-md-6 col-lg-3 my-4">
              <div className=" card">
                <img src="/img/pexels-norma-mortenson-4392877.jpg" className=" img-contatti img-shadow" alt="" title="Foto monopattino" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}

export default Home
