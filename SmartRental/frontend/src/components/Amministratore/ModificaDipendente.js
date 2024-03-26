import React, { useContext, useState } from "react"

import Axios from "axios"

import { KeyboardDatePicker } from "@material-ui/pickers"
import StateContext from "../../StateContext"
import Page from "../Page"
import ExampleContext from "../../ExampleContext"
import { withRouter } from "react-router-dom"

function ModificaDipendente() {
  const dipendente = JSON.parse(localStorage.getItem("dipendente_selezionato"))
  const [indirizzo, setIndirizzo] = useState(dipendente.indirizzo)
  const [idPatente, setIdPatente] = useState(dipendente.idPatente)
  const [categoria, setCategoria] = useState(dipendente.categoriaPatente)
  const [cellulare, setCellulare] = useState(dipendente.cellulare)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [selectedDate1, setSelectedDate1] = useState(new Date(dipendente.scadenzaPatente))
  const ruolo = dipendente.ruolo
  const addFlashMessage = useContext(ExampleContext)
  const appState = useContext(StateContext)

  async function handledSubmit(e) {
    e.preventDefault()
    const id = dipendente._id
    const scadenzaPatente = selectedDate1
    try {
      const response = await Axios.post("http://localhost:8081/modificaUtente", { token: appState.utente.token, id, indirizzo, idPatente, scadenzaPatente, categoria, cellulare })

      if (response) {
        console.log(response)
        addFlashMessage("Utente modificato con Successo")
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

    localStorage.removeItem("dipendente_selezionato")
  }
  return (
    <Page title="Modifica Dipendente">
      <div className="container text-font">
        <div className="row justify-content-center mt-5 mb-5 ">
          <div className="col-xl-10 col-lg-12 col-md-12 ">
            <div className="card  my-4 img-contatti">
              <div className="card-body ">
                <div className="row  ">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="container">
                      <div className="row  img-radius">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <div className="text-center img-contatti pr-2 pl-2 pt-4 pb-3">
                            <h2 className=" mb-3">
                              <strong> Modifica Dati di un Dipendente </strong>
                            </h2>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-2">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <div className="p-3 img-shadow img-contatti" style={{ backgroundColor: "#f8f9fa" }}>
                            <form onSubmit={handledSubmit} className="col-lg-12 col-md-12 col-sm-12  justify-content-center align-center mt-2 ">
                              <h6 className="align-center mb-4 mt-3">
                                <mark>Informazioni Personali del Dipendente</mark>
                              </h6>
                              <div className="form-row">
                                <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                                  <label htmlFor="nome">Nome</label>
                                  <input value={dipendente.nome} type="text" className="form-control" placeholder="Nome" id="nome" name="nome" disabled />
                                </div>

                                <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                                  <label htmlFor="cognome">Cognome</label>
                                  <input value={dipendente.cognome} type="text" className="form-control" placeholder="Cognome" id="cognome" name="cognome" disabled />
                                </div>

                                <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                                  Data di nascita
                                  <div>
                                    <KeyboardDatePicker disabled cancelLabel="Annulla" clearLabel="Pulisci" clearable value={dipendente.dataNascita} placeholder="Data di nascita" onChange={date => setSelectedDate(date)} format="dd/MM/yyyy" />
                                  </div>
                                </div>

                                <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                                  <label htmlFor="indirizzo">Indirizzo di residenza</label>
                                  <input onChange={e => setIndirizzo(e.target.value)} type="text" className="form-control" placeholder={dipendente.indirizzo} id="indirizzo" name="indirizzo" />
                                </div>

                                <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                                  <label htmlFor="luogoNascita">Luogo di nascita</label>
                                  <input value={dipendente.luogoNascita} type="text" className="form-control" placeholder="Luogo  di nascita" id="luogoNascita" name="luogoNascita" disabled />
                                </div>

                                <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                                  <label htmlFor="cf">Codice fiscale</label>
                                  <input value={dipendente.cf} type="text" className="form-control" placeholder="Codice Fiscale" id="cf" name="cf" disabled />
                                </div>

                                <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
                                  <label htmlFor="sesso">Sesso</label>
                                  <input value={dipendente.sesso} type="text" className="form-control" style={{ width: "auto" }} placeholder="Sesso" id="sesso" name="sessp" disabled />
                                </div>

                                <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
                                  <label htmlFor="ruolo">Ruolo</label>
                                  <input value={dipendente.ruolo} type="text" className="form-control" style={{ width: "auto" }} placeholder="Ruolo" id="ruolo" name="ruolo" disabled />
                                </div>
                              </div>

                              {/*  <!-- CAMPI FACOLTATIVI --> */}

                              {ruolo == "autista" ? (
                                <div>
                                  <h6 className="align-center mb-4 mt-3">
                                    <mark>Informazioni sulla patente</mark>
                                  </h6>
                                  <div className="form-row align-center justify-content-center">
                                    <div className="col-lg-12 col-md-12 col-sm-12 mb-4 ">
                                      <label htmlFor="idPatente">ID Patente</label>
                                      <input onChange={e => setIdPatente(e.target.value)} type="text" className="form-control" placeholder={dipendente.idPatente} id="idPatente" name="idPatente" style={{ width: "auto" }} />
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12 mb-4 ">
                                      <label htmlFor="scadenzaPatente"> Scadenza patente</label>

                                      <div>
                                        <KeyboardDatePicker cancelLabel="Annulla" clearLabel="Pulisci" clearable value={selectedDate1} placeholder="Data di nascita" onChange={date => setSelectedDate1(date)} format="dd/MM/yyyy" />
                                      </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
                                      <select onChange={e => setCategoria(e.target.value)} className="custom-select" style={{ width: "auto" }} id="categoriaPatente" name="categoriaPatente">
                                        <option value="DEFAULT" disabled>
                                          Seleziona
                                        </option>
                                        <option value="B">B</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div></div>
                              )}

                              {/*  <!-- INFORMAZIONI ACCOUNT --> */}
                              <h6 className="align-center mb-4 mt-3">
                                <mark>Informazioni sull'Account del Dipendente</mark>
                              </h6>

                              <div className="form-row">
                                <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                                  <label htmlFor="email">Email aziendale</label>
                                  <input value={dipendente.email} type="text" className="form-control" placeholder="Email aziendale" id="email" name="email" disabled />
                                </div>

                                <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                                  <label htmlFor="cellulare" name="cellulare">
                                    Numero di telefono
                                  </label>
                                  <input onChange={e => setCellulare(e.target.value)} type="tel" className="form-control" placeholder={dipendente.cellulare} id="cellulare" name="cellulare" />
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
          </div>
        </div>
      </div>
    </Page>
  )
}

export default withRouter(ModificaDipendente)
