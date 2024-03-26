import React, { useState, useContext } from "react"

import Axios from "axios"

import { KeyboardDatePicker } from "@material-ui/pickers"
import Page from "../Page"
import ExampleContext from "../../ExampleContext"
import { withRouter } from "react-router-dom"

function AggiungiDipendente() {
  const [ruolo, setRuolo] = useState()
  const [nome, setNome] = useState()
  const [cognome, setCognome] = useState()

  const [indirizzo, setIndirizzo] = useState()
  const [luogoNascita, setLuogoNascita] = useState()
  const [cf, setCf] = useState()
  const [idPatente, setIdPatente] = useState()

  const [categoriaPatente, setCategoriaPatente] = useState()
  const [email, setEmail] = useState()
  const [cellulare, setCellulare] = useState()
  const [password, setPassword] = useState()
  const [sesso, setSesso] = useState()
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedDate1, setSelectedDate1] = useState(null)
  const addFlashMessage = useContext(ExampleContext)
  const [errori, setErrori] = useState([])

  async function handleSubmit(e) {
    e.preventDefault()
    const dataNascita = selectedDate
    const scadenzaPatente = selectedDate1
    try {
      await Axios.post("http://localhost:8081/registrazione", { ruolo, nome, cognome, dataNascita, indirizzo, luogoNascita, cf, idPatente, scadenzaPatente, categoriaPatente, email, cellulare, sesso, password })
      addFlashMessage("Dipendente aggiunto con Successo")
      setTimeout(function () {
        window.location.href = "/areaPersonale"
      }, 1200)
    } catch (e) {
      console.log(e.response.data)
      setErrori(e.response.data)
      window.scrollTo(0, 0)
    }
  }

  return (
    <Page title="Aggiungi Dipendente">
      <div className="container text-font pt-5">
        <div className="row justify-content-center mt-5 mb-5 ">
          <div className="col-xl-10 col-lg-12 col-md-12 ">
            <div className="card my-4 img-contatti">
              <div className="card-body justify-content-center">
                <div className="row ">
                  <div className="col-12">
                    <div className="container mb-5 " style={{ width: "auto" }}>
                      <div className="row align-center justify-content-center">
                        {errori.length > 0 ? (
                          errori.map(errore => (
                            <div className=" p-2 m-2 mt-2 mb-2 col-xl-3 col-lg-4 col-md-10 col-sm-10 alert alert-danger img-contatti" role="alert">
                              {errore}
                            </div>
                          ))
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </div>
                    {/* RETTANGOLO CENTRALE */}
                    <div className="p-3 img-shadow img-contatti" style={{ backgroundColor: "#f8f9fa" }}>
                      <div className="text-center img-contatti pt-4 pb-3">
                        <h2>
                          <strong> Aggiungi un nuovo dipendente</strong>
                        </h2>
                      </div>

                      {/* FORM */}
                      <form onSubmit={handleSubmit} className="col-lg-12 col-md-12 col-sm-12  justify-content-center align-center mt-2 ">
                        <h7 className="align-center pb-5 pt-5">
                          <mark>Informazioni Personali del Dipendente</mark>
                        </h7>
                        <div className="form-row">
                          <div className="col-lg-6 col-md-12 col-sm-12 mt-4 mb-3">
                            <label htmlFor="nome">Nome*</label>
                            <input onChange={e => setNome(e.target.value)} type="text" className="form-control" id="nome" name="nome" />
                          </div>

                          <div className="col-lg-6 col-md-12 col-sm-12 mt-4 mb-3">
                            <label htmlFor="cognome" className="">
                              Cognome*
                            </label>
                            <input onChange={e => setCognome(e.target.value)} type="text" className="form-control" id="cognome" name="cognome" />
                          </div>

                          <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                            Data di nascita*
                            <div>
                              <KeyboardDatePicker cancelLabel="Annulla" clearLabel="Pulisci" clearable value={selectedDate} placeholder="Data di nascita" onChange={date => setSelectedDate(date)} format="dd/MM/yyyy" />
                            </div>
                          </div>

                          <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                            <label htmlFor="indirizzo" className="">
                              Indirizzo di residenza*
                            </label>
                            <input onChange={e => setIndirizzo(e.target.value)} type="text" className="form-control" id="indirizzo" name="indirizzo" />
                          </div>

                          <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                            <label htmlFor="luogoNascita" className="">
                              Luogo di nascita*
                            </label>
                            <input onChange={e => setLuogoNascita(e.target.value)} type="text" className="form-control" id="luogoNascita" name="luogoNascita" />
                          </div>

                          <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                            <label htmlFor="cf" className="">
                              Codice fiscale*
                            </label>
                            <input onChange={e => setCf(e.target.value)} type="text" className="form-control" id="cf" name="cf" />
                          </div>

                          <div className="col-lg-12 col-md-12 col-sm-12 mt-3 mb-3">
                            <select defaultValue={"DEFAULT"} onChange={e => setSesso(e.target.value)} className="custom-select" style={{ width: "auto" }} id="sesso" name="sesso">
                              <option disabled value="DEFAULT">
                                Sesso*
                              </option>
                              <option value="M">M</option>
                              <option value="F">F</option>
                            </select>
                          </div>

                          <div className="col-lg-12 col-md-12 col-sm-12 mt-2 mb-4">
                            <select defaultValue={"DEFAULT"} onChange={e => setRuolo(e.target.value)} className="custom-select" style={{ width: "auto" }} id="ruolo" name="ruolo">
                              <option disabled value="DEFAULT">
                                Ruolo*
                              </option>
                              <option value="autista">Autista</option>
                              <option value="addetto_parcheggio">Addetto Parcheggio</option>
                            </select>
                          </div>
                        </div>

                        {/*  <!-- CAMPI FACOLTATIVI --> */}

                        {ruolo == "autista" ? (
                          <div>
                            <h7 className="align-center mb-5 mt-5">
                              <mark>Informazioni sulla patente</mark>
                            </h7>

                            <div className="form-row">
                              <div className="col-lg-6 col-md-12 col-sm-12 mt-4 mb-3">
                                <label htmlFor="idPatente" className="">
                                  ID Patente
                                </label>
                                <input onChange={e => setIdPatente(e.target.value)} type="text" className="form-control" id="idPatente" name="idPatente" require />
                              </div>

                              <div className="col-lg-6 col-md-12 col-sm-12 mt-4 mb-3">
                                Scadenza patente
                                <div>
                                  <KeyboardDatePicker disablePast cancelLabel="Annulla" clearLabel="Pulisci" clearable value={selectedDate1} placeholder="Scadenza Patente" onChange={date => setSelectedDate1(date)} format="dd/MM/yyyy" require />
                                </div>
                              </div>

                              <div className="col-lg-12 col-md-12 col-sm-12 mt-3 mb-4">
                                <select onChange={e => setCategoriaPatente(e.target.value)} className="custom-select" style={{ width: "auto" }} id="categoriaPatente" name="categoriaPatente" require>
                                  <option default selected disabled value="">
                                    Categoria Patente
                                  </option>
                                  <option value="B">B</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <h3></h3>
                          </div>
                        )}

                        {/*  <!-- INFORMAZIONI ACCOUNT --> */}
                        <h7 className="align-center pb-5 mt-5">
                          <mark>Informazioni sull'Account del Dipendente</mark>
                        </h7>

                        <div className="form-row">
                          <div className="col-lg-6 col-md-12 col-sm-12 mt-4 mb-3">
                            <label htmlFor="email">Email aziendale*</label>
                            <input onChange={e => setEmail(e.target.value)} type="text" className="form-control" id="email" name="email" />
                          </div>

                          <div className="col-lg-6 col-md-12 col-sm-12 mt-4 mb-3">
                            <label htmlFor="cellulare">Numero di telefono*</label>
                            <input onChange={e => setCellulare(e.target.value)} type="tel" className="form-control" id="cellulare" name="cellulare" />
                          </div>
                        </div>

                        <div className="form-row">
                          <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                            <label htmlFor="password">Password*</label>
                            <input onChange={e => setPassword(e.target.value)} type="password" className="form-control" id="password" name="password" />
                          </div>

                          <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                            <label htmlFor="confermaPassword">Conferma password*</label>
                            <input type="password" className="form-control" id="confermaPassword" name="confermaPassword" />
                          </div>
                        </div>

                        <div className="col-12 align-center mt-3">
                          <button type="submit" className="btn btn-primary pr-5 pl-5" style={{ width: "auto" }}>
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

export default withRouter(AggiungiDipendente)
