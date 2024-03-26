import React, { useContext, useState } from "react"

import Axios from "axios"
import StateContext from "../../StateContext"
import Page from "../Page"
import ExampleContext from "../../ExampleContext"
import { withRouter } from "react-router-dom"

function VisualizzaMezzi() {
  const [tipologia, setTipologia] = useState()
  const [categoria, setCategoria] = useState()
  const [targa, setTarga] = useState()
  const [idMezzo, setIdMezzo] = useState()
  const addFlashMessage = useContext(ExampleContext)
  const [mezzi, setMezzi] = useState()
  const [mezzoModified, setMezzoModified] = useState()
  const [Id, setId] = useState()
  const [selected, setSelected] = useState()
  const [errori, setErrori] = useState()
  const appState = useContext(StateContext)

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

  function modificaMezzo() {
    localStorage.setItem("mezzo_selezionato", JSON.stringify(mezzoModified))
    window.location = "/modificaMezzo"
  }

  async function rimuoviMezzo(e) {
    e.preventDefault()

    try {
      console.log(Id)
      await Axios.post("http://localhost:8081/checkRimozioneMezzo", { Id }).then(async resp=>{
        if(!resp.data){
          
          await Axios.post("http://localhost:8081/rimuoviMezzo", { token: appState.utente.token, Id })
            .then(() => {
              addFlashMessage("Mezzo Rimosso con Successo")
              setTimeout(function () {
                window.location.href = "/areaPersonale"
              }, 1200)
            })
            .catch(e => {
              console.log(e)
            })
        }else{
          setErrori("Non puoi rimuovere il mezzo poichè è prenotato")
          window.scrollTo(0, 0)
        }
      })
        
    } catch (e) {
      console.log(e.response)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    let tipo = tipologia
    let categoriaMezzo = categoria
    let targaMezzo = targa
    let identificativo = idMezzo
    if (tipo == "") {
      tipo = undefined
    }
    if (categoriaMezzo == "") {
      categoriaMezzo = undefined
    }
    if (targaMezzo == "") {
      targaMezzo = undefined
    }
    if (identificativo == "") {
      identificativo = undefined
    }
    try {
      await Axios.post("http://localhost:8081/visualizzaMezzo", {
        token: appState.utente.token,
        tipo,
        categoriaMezzo,
        targaMezzo,
        identificativo
      })
        .then(function (response) {
          console.log(response)
          setMezzi(response.data)
        })
        .catch(e => {
          console.log(e)

          setErrori(e.response.data)
          window.scrollTo(0, 0)
        })
    } catch (e) {
      console.log(e.response)
    }
  }
  return (
    <Page title="Visualizza Mezzi">
      {/* Modal */}
      <div className="modal fade text-font" id="exampleModal2" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog ">
          <div className="modal-content" style={{ height: "50%" }}>
            <div className="modal-header ">
              <h5 className="modal-title" id="exampleModalLabel">
                <strong>Conferma rimozione</strong>
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">Vuoi davvero rimuovere il mezzo selezionato?</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary btn-sm" data-dismiss="modal">
                Chiudi
              </button>
              <button onClick={rimuoviMezzo} type="button" className="btn btn-warning btn-sm">
                Conferma
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid text-font">
        <div className="row justify-content-center pt-5 mb-5 mt-5 pb-5">
          <div className="col-xl-10 col-lg-12 col-md-9 mt-5 mb-5 pb-5">
            <div className="card my-5 img-contatti">
              <div className="card-body justify-content-center img-shadow img-contatti" style={{ backgroundColor: "#f8f9fa" }}>
                <div className="row ">
                  <div className="col-lg-4 col-md-12 col-sm-12">
                    <div className="text-center img-contatti pt-3 pb-1">
                      <h2 className="  mb-3">
                        <strong> Visualizza Mezzi</strong>
                      </h2>
                    </div>
                    <div className="container mb-1 " /* style={{ width: "auto" }} */>
                      <div className="row align-center justify-content-center">
                        {errori ? (
                          <div className=" p-2 m-2 mt-2 mb-2 col-10 alert alert-danger img-contatti" role="alert">
                            {errori}
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </div>
                    {/* FORM A SX */}
                    <form onSubmit={handleSubmit} className="col-lg-12 col-md-12 col-sm-12 justify-content-center  align-center mt-3 ">
                      <div className="form-row">
                        <div className="col-lg-12 col-md-12 col-sm-12 mb-3 ">
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

                        {tipologia == "auto" || tipologia == "moto" ? (
                          <div className="col-lg-12 col-md-12 col-sm-12 justify-content-center">
                            <div className="col-lg-12 col-md-12 col-sm-12 mb-3 ">
                              <select defaultValue={"DEFAULT"} onChange={e => setCategoria(e.target.value)} className="custom-select" style={{ width: "auto" }} placeholder="Seleziona" id="categoria" name="categoria">
                                <option value="DEFAULT" disabled>
                                  Categoria
                                </option>

                                {options}
                              </select>
                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 mb-3" style={{ width: "auto" }}>
                              <input onChange={e => setTarga(e.target.value)} type="text" className="form-control" style={{ width: "auto" }} placeholder="Targa" id="targa" name="targa" />
                            </div>
                          </div>
                        ) : tipologia == "bicicletta" || tipologia == "monopattino" ? (
                          <div className="col-lg-12 col-md-12 col-sm-12 justify-content-center">
                            <div className="col-lg-12 col-md-12 col-sm-12 mb-3" style={{ width: "auto" }}>
                              <input onChange={e => setIdMezzo(e.target.value)} type="text" className="form-control" style={{ width: "auto" }} placeholder="ID Mezzo" id="idMezzo" name="idMezzo" />
                            </div>
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                      <div className="col-12 mt-3 align-center ">
                        <button type="submit" className="pr-5 pl-5 btn btn-primary display-4" style={{ width: "auto" }}>
                          Cerca
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="col-lg-8 col-md-12 col-sm-12">
                    <div className="col-sm-12 col-lg-12 col-md-12 ">
                      <div className="card  img-shadow my-4 img-contatti">
                        {/* RISULTATI DELLA RICERCA */}
                        <div className="card-body justify-content-center">
                          {mezzi ? (
                            mezzi.map(mezzo => (
                              <div key={mezzo._id}>
                                <div className="accordion py-3 " id="accordion">
                                  <div className="card img-radius">
                                    <div className="card-header" id="acc">
                                      <h1>
                                        <button onClick={() => setMezzoModified(mezzo)} className="btn btn-lg btn-link btn-block text-black" type="button" data-toggle="collapse" data-target={"#" + mezzo._id} aria-expanded="true" aria-controls={mezzo._id}>
                                          {mezzo.modello}
                                        </button>
                                      </h1>
                                    </div>
                                    <div id={mezzo._id} className="collapse" aria-labelledby="acc">
                                      <div className="row card-body justify-content-center ">
                                        {mezzo.tipoMezzo == "auto" || mezzo.tipoMezzo == "moto" ? (
                                          <div className="col-lg-7 col-md-12 col-sm-12">
                                            <div>
                                              <ul className="list-group list-group-flush">
                                                <li className="list-group-item">Tipo: {mezzo.tipoMezzo} </li>
                                                <li className="list-group-item">Categoria: {mezzo.categoria} </li>
                                                <li className="list-group-item">Modello: {mezzo.modello} </li>
                                                <li className="list-group-item">N. Posti: {mezzo.numeroPosti} </li>
                                                <li className="list-group-item">Trasmissione: {mezzo.trasmissione} </li>
                                                <li className="list-group-item">Carburante: {mezzo.carburante} </li>
                                                <li className="list-group-item">Targa: {mezzo.targa} </li>
                                                <li className="list-group-item">Parcheggio: {mezzo.parcheggio} </li>
                                                <li className="list-group-item">Cilindrata: {mezzo.cilindrata} </li>
                                                <li className="list-group-item">Tariffa Oraria: {mezzo.tariffaOraria} </li>
                                                <li className="list-group-item">Tariffa Giornaliera: {mezzo.tariffaGiornaliera} </li>
                                              </ul>
                                            </div>
                                          </div>
                                        ) : mezzo.tipoMezzo == "bicicletta" || mezzo.tipoMezzo == "monopattino" ? (
                                          <div className="col-lg-12 col-md-12 col-sm-12">
                                            <div>
                                              <ul className="list-group list-group-flush">
                                                <li className="list-group-item">Tipo: {mezzo.tipoMezzo} </li>
                                                <li className="list-group-item">Modello: {mezzo.modello} </li>
                                                <li className="list-group-item">Parcheggio: {mezzo.parcheggio} </li>
                                                <li className="list-group-item">Identificativo: {mezzo.identificativo} </li>
                                                <li className="list-group-item">Tariffa Oraria: {mezzo.tariffaOraria} </li>
                                                <li className="list-group-item">Tariffa Giornaliera: {mezzo.tariffaGiornaliera} </li>
                                              </ul>
                                            </div>
                                          </div>
                                        ) : (
                                          <div></div>
                                        )}

                                        <div className="col-lg-5 col-md-8 col-sm-8">
                                          <img className="img-contatti img-border mt-5" src={`/uploads/${mezzo.imgName}`} alt="" />
                                          <div className="align-center mb-2 mt-4">
                                            <button onClick={modificaMezzo} type="submit" className=" btn btn-outline-dark  ">
                                              Modifica
                                            </button>
                                            <button onClick={() => setId(mezzo._id)} type="submit" className="btn btn-secondary" data-toggle="modal" data-target="#exampleModal2">
                                              Rimuovi
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
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
    </Page>
  )
}

export default withRouter(VisualizzaMezzi)
