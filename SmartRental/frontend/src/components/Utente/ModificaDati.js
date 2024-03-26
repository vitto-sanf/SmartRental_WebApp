import React, { useState, useContext } from "react"

import Axios from "axios"
import { KeyboardDatePicker } from "@material-ui/pickers"
import StateContext from "../../StateContext"
import Page from "../Page"
import ExampleContext from "../../ExampleContext"
import { withRouter } from "react-router-dom"

function ModificaDati() {
  const utente = JSON.parse(localStorage.getItem("utente_selezionato"))
  const [indirizzo, setIndirizzo] = useState(utente.indirizzo)
  const [idPatente, setIdPatente] = useState(utente.idPatente)
  const appState = useContext(StateContext)
  const [categoria, setCategoria] = useState(utente.categoriaPatente)
  const [cellulare, setCellulare] = useState(utente.cellulare)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedDate1, setSelectedDate1] = useState(new Date(utente.scadenzaPatente))
  const addFlashMessage = useContext(ExampleContext)
  const ruolo = utente.ruolo

  async function handledSubmit(e) {
    e.preventDefault()
    const id = utente._id
    const scadenzaPatente = selectedDate1
    try {
      const response = await Axios.post("http://localhost:8081/modificaUtente", { token: appState.utente.token, id, indirizzo, idPatente, scadenzaPatente, categoria, cellulare })

      if (response) {
        console.log(response)
        addFlashMessage(response.data)
        setTimeout(function () {
          window.location.href = "/areaPersonale"
        }, 1200)
      } else {
        console.log("Errore nei dati inseriti")
      }
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

    localStorage.removeItem("utente_selezionato")
  }
  return (
    <Page title="Modifica Dati">
      <div className="container text-font pt-5">
        <div className="row justify-content-center mt-5 mb-5 ">
          <div className="col-xl-10 col-lg-12 col-md-12 ">
            <div className="card img-contatti">
              <div className="card-body justify-content-center">
                <div className="text-center img-contatti pr-2 pl-2  pb-3">
                  <h2 className="mb-3">
                    <strong> Modifica i tuoi dati </strong>
                  </h2>
                  <p className="pb-2">In questa sezione hai la possibilità di aggiornare i tuoi dati personali.</p>
                </div>

                <div className="row mt-2">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="p-3 img-shadow img-contatti" style={{ backgroundColor: "#f8f9fa" }}>
                      <form onSubmit={handledSubmit} className="col-lg-12 col-md-12 col-sm-12 justify-content-center align-center mt-2 ">
                        <h5 className="align-center mb-4 mt-5">
                          <mark>Informazioni Personali</mark>
                        </h5>
                        <div className="form-row">
                          <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                            <label htmlFor="nome">Nome</label>
                            <input value={utente.nome} type="text" className="form-control" placeholder="Nome" id="nome" name="nome" disabled />
                          </div>

                          <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                            <label htmlFor="cognome">Cognome</label>
                            <input value={utente.cognome} type="text" className="form-control" placeholder="Cognome" id="cognome" name="cognome" disabled />
                          </div>

                          <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                            <label htmlFor="dataDiNascita">Data di nascita</label>
                            <div>
                              <KeyboardDatePicker disabled cancelLabel="Annulla" clearLabel="Pulisci" clearable value={utente.dataNascita} placeholder="Data di nascita" onChange={date => setSelectedDate(date)} format="dd/MM/yyyy" />
                            </div>
                          </div>

                          <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                            <label htmlFor="indirizzo">Indirizzo di residenza</label>
                            <input onChange={e => setIndirizzo(e.target.value)} type="text" className="form-control" placeholder={utente.indirizzo} id="indirizzo" name="indirizzo" />
                          </div>

                          <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                            <label htmlFor="luogoNascita">Luogo di nascita</label>
                            <input value={utente.luogoNascita} type="text" className="form-control" placeholder="Luogo  di nascita" id="luogoNascita" name="luogoNascita" disabled />
                          </div>

                          <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                            <label htmlFor="cf">Codice fiscale</label>
                            <input value={utente.cf} type="text" className="form-control" placeholder="Codice Fiscale" id="cf" name="cf" disabled />
                          </div>

                          <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
                            <label htmlFor="ruolo">Ruolo</label>
                            <input value={utente.ruolo} type="text" className="form-control" style={{ width: "auto" }} placeholder="Ruolo" id="ruolo" name="ruolo" disabled />
                          </div>
                        </div>

                        {/*   CAMPI FACOLTATIVI  */}
                        {ruolo == "cliente" || ruolo == "autista" ? (
                          <div>
                            <h5 className="align-center mb-4 mt-5">
                              <mark>Informazioni sulla patente</mark>
                            </h5>
                          </div>
                        ) : (
                          <div></div>
                        )}

                        <div className="form-row align-center justify-content-center">
                          {ruolo == "cliente" || ruolo == "autista" ? (
                            <div>
                              <div className="col-lg-12 col-md-12 col-sm-12 mb-4 ">
                                <label htmlFor="idPatente">ID Patente</label>
                                <input onChange={e => setIdPatente(e.target.value)} type="text" className="form-control" placeholder={utente.idPatente} id="idPatente" name="idPatente" />
                              </div>

                              <div className="col-lg-12 col-md-12 col-sm-12 mb-4 ">
                                <label htmlFor="scadenzaPatente"> Scadenza patente</label>

                                <div>
                                  <KeyboardDatePicker cancelLabel="Annulla" clearLabel="Pulisci" clearable value={selectedDate1} placeholder="Data di nascita" onChange={date => setSelectedDate1(date)} format="dd/MM/yyyy" />
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div></div>
                          )}
                          {ruolo == "cliente" ? (
                            <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
                              <label htmlFor="categoriaPatente"> Categoria Patente</label>
                              <div>
                                <select defaultValue={"DEFAULT"} onChange={e => setCategoria(e.target.value)} className="custom-select" style={{ width: "auto" }} id="categoriaPatente" name="categoriaPatente">
                                  <option value="DEFAULT" disabled>
                                    {utente.categoriaPatente}
                                  </option>
                                  <option value="AM">AM</option>
                                  <option value="A1">A1</option>
                                  <option value="A2">A2</option>
                                  <option value="A3">A3</option>
                                  <option value="B">B</option>
                                </select>
                              </div>
                            </div>
                          ) : ruolo == "autista" ? (
                            <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
                              <label htmlFor="categoriaPatente"> Categoria Patente</label>
                              <div>
                                <select onChange={e => setCategoria(e.target.value)} className="custom-select" style={{ width: "auto" }} id="categoriaPatente" name="categoriaPatente">
                                  <option value="DEFAULT" disabled>
                                    Seleziona
                                  </option>
                                  <option value="B">B</option>
                                </select>
                              </div>
                            </div>
                          ) : (
                            <div></div>
                          )}
                        </div>

                        {/*  <!-- INFORMAZIONI ACCOUNT --> */}
                        <h5 className="align-center mb-4 mt-5">
                          <mark>Informazioni sull'Account</mark>
                        </h5>

                        <div className="form-row">
                          <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                            <label htmlFor="email">Email</label>
                            <input value={utente.email} type="text" className="form-control" placeholder="Email aziendale" id="email" name="email" disabled />
                          </div>

                          <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                            <label htmlFor="cellulare">Numero di telefono</label>
                            <input onChange={e => setCellulare(e.target.value)} type="tel" className="form-control" placeholder={utente.cellulare} id="cellulare" pattern="((((\+|00)[1-9]{2})|0)?([1-9]{2,3}))([0-9]{6,10})" name="cellulare" title="Inserire il numero di telefono nel formato (+|00)<pref. int.><pref. loc.><numero> oppure 0<pref. loc.><numero>" />
                          </div>
                        </div>

                        <div className="col-12 align-center mt-3">
                          <button type="submit" className="btn btn-primary pr-5 pl-5" style={{ width: "auto" }}>
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

export default withRouter(ModificaDati)
