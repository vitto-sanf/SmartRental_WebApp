import React, { useContext, useState } from "react"

import Axios from "axios"
import StateContext from "../../StateContext"
import Page from "../Page"
import ExampleContext from "../../ExampleContext"
import { withRouter } from "react-router-dom"

function AggiungiMezzo() {
  const [tipoMezzo, setTipoMezzo] = useState()
  const [categoria, setCategoria] = useState()
  const [cilindrata, setCilindrata] = useState()
  const [modello, setModello] = useState()
  const [targa, setTarga] = useState()
  const [identificativo, setIdentificativo] = useState()
  const [numeroPosti, setNumeroPosti] = useState()
  const [trasmissione, setTrasmissione] = useState()
  const [carburante, setCarburante] = useState()
  const [descrizione, setDescrizione] = useState()
  const [tariffaOraria, setTariffaOraria] = useState()
  const [tariffaGiornaliera, setTariffaGiornaliera] = useState()
  const [parcheggio, setParcheggio] = useState()
  const [files, setFiles] = useState([])
  const [patenti, setPatenti] = useState()
  const [fileName, setFileName] = useState("Scegli le foto da inserire")
  const [selected, setSelected] = useState()
  const [errore, setErrore] = useState()
  const [errori, setErrori] = useState([])
  const appState = useContext(StateContext)
  const addFlashMessage = useContext(ExampleContext)
  const changeSelectOptionHandler = e => {
    setSelected(e.target.value)
    setTipoMezzo(e.target.value)
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
    e.preventDefault()
    console.log(files)

    if (files.length == 1) {
      var fileName1 = files[0].name
      console.log(fileName1)
    } else if (files.length == 2) {
      var fileName1 = files[0].name
      var fileName2 = files[1].name
      console.log(fileName1, fileName2)
    } else if (files.length >= 3) {
      var fileName1 = files[0].name
      var fileName2 = files[1].name
      var fileName3 = files[2].name
      console.log(fileName1, fileName2, fileName3)
    } else {
      var fileName1 = undefined
      var fileName2 = undefined
      var fileName3 = undefined
    }

    if (files.length == 3) {
      const formData = new FormData()

      for (const key of Object.keys(files)) {
        formData.append("files", files[key])
      }
      console.log(fileName1)
      try {
        Axios.post("http://localhost:8081/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }).then(res => {
          console.log(res.statusText)
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

      try {
        await Axios.post("http://localhost:8081/aggiungiMezzo", {
          token: appState.utente.token,
          tipoMezzo,
          categoria,
          cilindrata,
          modello,
          targa,
          identificativo,
          numeroPosti,
          trasmissione,
          carburante,
          descrizione,
          tariffaOraria,
          tariffaGiornaliera,
          parcheggio,
          fileName1,
          fileName2,
          fileName3,
          patenti
        })
          .then(() => {
            addFlashMessage("Mezzo Aggiunto con Successo")
            setTimeout(function () {
              window.location.href = "/areaPersonale"
            }, 1200)
          })
          .catch(e => {
            console.log(e.response.data)
            setErrori(e.response.data)
            window.scrollTo(0, 0)
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
      setErrore("Devi Inserire 3 Foto")
      window.scrollTo(0, 0)
      setTimeout(function () {
        window.location.reload()
      }, 1200)
    }
  }
  return (
    <Page title="Aggiungi Mezzo">
      <div className="container text-font pt-5">
        <div className="row justify-content-center pt-5 mb-3 ">
          <div className="col-xl-10 col-lg-12 col-md-12 ">
            <div className="card  my-4 img-contatti">
              <div className="card-body justify-content-center">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="p-3 img-shadow mb-4 img-contatti " style={{ backgroundColor: "#f8f9fa" }}>
                      <div className="text-center img-contatti pr-2 pl-2 pt-4 pb-3">
                        <h2 className=" mb-3">
                          <strong> Aggiungi un nuovo mezzo</strong>
                        </h2>
                      </div>
                      <div className="container mb-5 " style={{ width: "auto" }}>
                        <div className="row align-center justify-content-center">
                          {errore ? (
                            <div className=" p-2 m-2 mt-2 mb-2 col-3 alert alert-danger img-contatti" role="alert">
                              {errore}
                            </div>
                          ) : (
                            <div></div>
                          )}
                        </div>
                      </div>
                      <div className="container mb-5 " style={{ width: "auto" }}>
                        <div className="row align-center justify-content-center">
                          {errori.length > 0 ? (
                            errori.map(errore => (
                              <div className=" p-2 m-2 mt-2 mb-2 col-3 alert alert-danger img-contatti" role="alert">
                                {errore}
                              </div>
                            ))
                          ) : (
                            <div></div>
                          )}
                        </div>
                      </div>
                      {/* FORM CENTRALE */}
                      <form onSubmit={handleSubmit} className="col-lg-12 col-md-12 col-sm-12 text-font justify-content-center align-center mt-2 ">
                        {/* INFORMAZIONI GEN. MEZZO */}
                        <h5 className="align-center mb-4 mt-3">
                          <mark>Informazioni generali sul mezzo</mark>
                        </h5>
                        <div className="form-row align-center justify-content-center">
                          <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
                            <select defaultValue={"DEFAULT"} onChange={changeSelectOptionHandler} className="custom-select " style={{ width: "auto" }} id="tipo" name="tipo">
                              <option value="DEFAULT" disabled>
                                Tipo di mezzo
                              </option>
                              <option value="auto">Auto</option>
                              <option value="moto">Moto</option>
                              <option value="bicicletta">Bicicletta</option>
                              <option value="monopattino">Monopattino</option>
                            </select>
                          </div>
                          {tipoMezzo == "auto" || tipoMezzo == "moto" ? (
                            <div className="col-lg-12 col-md-12 col-sm-12 mb-3 ">
                              <select defaultValue={"DEFAULT"} onChange={e => setCategoria(e.target.value)} className="custom-select" style={{ width: "auto" }} placeholder="Seleziona" id="categoria" name="categoria">
                                <option value="DEFAULT" disabled>
                                  Categoria Mezzo
                                </option>

                                {options}
                              </select>
                            </div>
                          ) : (
                            <div></div>
                          )}

                          {tipoMezzo == "auto" || tipoMezzo == "moto" ? (
                            <div>
                              <div className="col-lg-12 col-md-12 col-sm-12 mb-4 ">
                                <select defaultValue={"DEFAULT"} onChange={e => setPatenti(e.target.value)} className="custom-select " style={{ width: "auto" }} id="patenti" name="patenti">
                                  <option value="DEFAULT" disabled>
                                    Patente necessaria
                                  </option>
                                  <option value="Am">AM</option>
                                  <option value="A1">A1</option>
                                  <option value="A2">A2</option>
                                  <option value="A3">A3</option>
                                  <option value="B">B</option>
                                </select>
                              </div>

                              <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
                                <label>Cilindrata </label>
                                <input onChange={e => setCilindrata(e.target.value)} type="text" className="form-control" id="cilindrata" name="cilindrata" />
                              </div>

                              <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
                                <label htmlFor="targa">Targa</label>
                                <input onChange={e => setTarga(e.target.value)} type="text" className="form-control" id="targa" name="targa" />
                              </div>
                            </div>
                          ) : (
                            <div></div>
                          )}
                          {tipoMezzo == "bicicletta" || tipoMezzo == "monopattino" ? (
                            <div>
                              <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
                                <label htmlFor="id">Identificativo</label>
                                <input onChange={e => setIdentificativo(e.target.value)} type="text" className="form-control" id="identificativo" name="identificatico" />
                              </div>
                            </div>
                          ) : (
                            <div></div>
                          )}

                          <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
                            <label htmlFor="modello">Modello</label>
                            <input onChange={e => setModello(e.target.value)} type="text" className="form-control" style={{ width: "auto" }} id="modello" name="modello" />
                          </div>

                          {tipoMezzo == "auto" || tipoMezzo == "moto" ? (
                            <div className="row container">
                              <div className="col-lg-4 col-md-12 col-sm-12 mt-3 mb-3 ">
                                <select defaultValue={"DEFAULT"} onChange={e => setNumeroPosti(e.target.value)} className="custom-select " id="nPosti" name="nPosti">
                                  <option value="DEFAULT" disabled>
                                    Numero posti
                                  </option>
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                </select>
                              </div>
                              <div className="col-lg-4 col-md-12 col-sm-12 mt-3 mb-3">
                                <select defaultValue={"DEFAULT"} onChange={e => setTrasmissione(e.target.value)} className="custom-select " id="trasmissione" name="trasmissione">
                                  <option value="DEFAULT" disabled>
                                    Trasmissione
                                  </option>
                                  <option value="Automatica">Automatica</option>
                                  <option value="Manuale">Manuale</option>
                                </select>
                              </div>
                              <div className="col-lg-4 col-md-12 col-sm-12 mt-3 mb-3">
                                <select defaultValue={"DEFAULT"} onChange={e => setCarburante(e.target.value)} className="custom-select " id="carburante" name="carburante">
                                  <option value="DEFAULT" disabled>
                                    Carburante
                                  </option>
                                  <option value="Benzina">Benzina</option>
                                  <option value="Diesel">Diesel</option>
                                </select>
                              </div>
                            </div>
                          ) : (
                            <div></div>
                          )}
                        </div>

                        {/*  <!-- FOTO MEZZO --> */}
                        <h5 className=" mb-4 mt-3">
                          <mark>Foto del mezzo</mark>
                        </h5>

                        <div className="form-row justify-content-center align-center">
                          <div className=" col-xl-6 col-lg-6 col-md-10 col-sm-10 input-group mb-3">
                            <div className="custom-file">
                              <input onChange={e => setFiles(e.target.files)} type="file" id="files" className="custom-file-input" style={{ width: "auto" }} accept=".jpg, .jpeg, .png" multiple />

                              <label className="custom-file-label text-align-center" htmlFor="inputGroupFile02" aria-describedby="inputGroupFileAddon02">
                                Inserisci 3 foto
                              </label>
                            </div>
                          </div>
                        </div>

                        {/*  <!-- DESCRIZIONE MEZZO --> */}
                        <h5 className="align-center mb-4 mt-3">
                          <mark>Descrizione del mezzo</mark>
                        </h5>

                        <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
                            <div className="form-group">
                              <textarea onChange={e => setDescrizione(e.target.value)} className="form-control" id="exampleFormControlTextarea1" rows={3} defaultValue={""} />
                            </div>
                          </div>
                        </div>

                        {/*  <!-- INFORMAZIONI TARIFFE --> */}
                        <h5 className="align-center mb-4 mt-2">
                          <mark>Tariffe orarie e giornaliere</mark>
                        </h5>

                        <div className="row">
                          <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                            <label htmlFor="tariffaOraria">Tariffa Oraria</label>
                            <input onChange={e => setTariffaOraria(e.target.value)} type="text" className="form-control" id="tariffaOraria" name="tariffaOraria" />
                          </div>
                          <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                            <label htmlFor="tariffaGiornaliera">Tariffa Giornaliera</label>
                            <input onChange={e => setTariffaGiornaliera(e.target.value)} type="text" className="form-control" id="tariffaGiornaliera" name="tariffaGiornaliera" />
                          </div>
                        </div>

                        {/*  <!-- INFORMAZIONI PARCHEGGIO --> */}
                        <h5 className="align-center mb-4 mt-2">
                          <mark>Parcheggio </mark>
                        </h5>

                        <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
                            <select onChange={e => setParcheggio(e.target.value)} style={{ width: "auto" }} defaultValue={"DEFAULT"} className="custom-select" id="validationDefault04" required>
                              <option disabled value="DEFAULT">
                                Parcheggio/Stallo ritiro
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

                        <div className="col-12 align-center mt-3">
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
    </Page>
  )
}

export default withRouter(AggiungiMezzo)
