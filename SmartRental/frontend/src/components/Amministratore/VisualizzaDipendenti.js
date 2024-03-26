import React, { useContext, useState } from "react"

import { Link } from "react-router-dom"
import Axios from "axios"
import StateContext from "../../StateContext"
import Page from "../Page"
import ExampleContext from "../../ExampleContext"
import { withRouter } from "react-router-dom"

function VisualizzaDipendenti() {
  const [idDipendente, setIdDipendente] = useState(undefined)
  const [ruolo, setRuolo] = useState(undefined)
  const [nome, setNome] = useState(undefined)
  const [cognome, setCognome] = useState(undefined)
  const [errori, setErrori] = useState()
  const [dipendenti, setDipendenti] = useState()
  const [dipendenteEmail, setDipendenteEmail] = useState()
  const [dipendenteModified, setDipendenteModified] = useState()
  const appState = useContext(StateContext)
  const addFlashMessage = useContext(ExampleContext)

  function modificaDipendente() {
    localStorage.setItem("dipendente_selezionato", JSON.stringify(dipendenteModified))
    window.location = "/modificaDipendente"
  }

  async function rimuoviDipendente(e) {
    e.preventDefault()

    try {
      let id = idDipendente
      console.log(dipendenteEmail)
      await Axios.post("http://localhost:8081/rimuoviDipendente", { token: appState.utente.token, id })
        .then(() => {
          addFlashMessage("Utente rimosso con Successo")
          setTimeout(function () {
            window.location.reload()
          }, 1200)
        })
        .catch(e => {
          console.log(e)
        })
    } catch (e) {
      console.log(e.response)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()

    let ruoloDip = ruolo
    let nomeDip = nome
    let cognomeDip = cognome

    if (ruoloDip == "undefined") {
      ruoloDip = undefined
    }
    if (nomeDip == "") {
      nomeDip = undefined
    }
    if (cognomeDip == "") {
      cognomeDip = undefined
    }
    try {
      await Axios.post("http://localhost:8081/visualizzaDipendente", { token: appState.utente.token, ruoloDip, nomeDip, cognomeDip })
        .then(function (response) {
          console.log(response)
          setDipendenti(response.data)
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
    <Page title="Visualizza Dipendenti">
      {/* FINESTRA DI CONFERMA RIMOZIONE */}
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
            <div className="modal-body">Vuoi davvero rimuovere il dipendente selezionato?</div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary btn-sm" data-dismiss="modal">
                Chiudi
              </button>
              <button onClick={rimuoviDipendente} type="button" className="btn btn-warning btn-sm">
                Conferma
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid pt-5 pb-5 text-font">
        <div className="row justify-content-center mt-5 mb-5 pb-5 pt-5 ">
          <div className="col-xl-10 col-lg-12 col-md-9 ">
            <div className="card img-shadow  img-contatti ">
              {/* RETTANGOLO CENTRALE */}
              <div className="card-body justify-content-center img-shadow img-contatti " style={{ backgroundColor: "#f8f9fa" }}>
                <div className="row mt-2">
                  <div className="col-lg-12 col-md-12 col-sm-12 pb-5">
                    {/* TESTO SUPERIORE */}
                    <div className="text-center img-contatti pt-3 pb-1">
                      <h2 className="  mb-3">
                        <strong> Visualizza Dipendenti</strong>
                      </h2>
                    </div>
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
                    {/* FORM DI RICERCA */}
                    <form onSubmit={handleSubmit} className="col-lg-12 col-md-12 col-sm-12  justify-content-center  align-center  mt-3 ">
                      <div className="form-row">
                        <div className="col-lg-4 col-md-12 col-sm-12 mb-3">
                          <input onChange={e => setNome(e.target.value)} type="text" className="form-control" placeholder="Nome Dipendente" id="nome" name="nome" />
                        </div>
                        <div className="col-lg-4 col-md-12 col-sm-12 mb-3">
                          <input onChange={e => setCognome(e.target.value)} type="text" className="form-control" placeholder="Cognome Dipendente" id="cognome" name="cognome" />
                        </div>

                        <div className="col-lg-4 col-md-12 col-sm-12 mb-3 ">
                          <select defaultValue={"undefined"} onChange={e => setRuolo(e.target.value)} className="custom-select" style={{ width: "auto" }} id="ruolo" name="ruolo">
                            <option value="undefined">Ruolo*</option>
                            <option value="autista">Autista</option>
                            <option value="addetto_parcheggio">Addetto Parcheggio</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-12 mt-3 align-center ">
                        <button type="submit" to="" className="pr-5 pl-5 btn btn-primary display-4" style={{ width: "auto" }}>
                          Cerca
                        </button>
                      </div>
                    </form>
                    <div className="row justify-content-center ">
                      <div className="col-sm-8 col-lg-8 col-md-8 ">
                        <div className="card  img-shadow img-contatti">
                          {/* CONTENUTO DELLA RICERCA */}
                          <div className="card-body justify-content-center">
                            {dipendenti ? (
                              dipendenti.map(dipendente => (
                                <div key={dipendente._id}>
                                  <div className="accordion py-3 " id="accordion">
                                    <div className="card img-radius">
                                      <div className="card-header" id="acc">
                                        <h1>
                                          <button onClick={() => setDipendenteModified(dipendente)} className="btn btn-lg btn-link btn-block text-black" data-toggle="collapse" data-target={"#" + dipendente._id} aria-expanded="true" aria-controls={dipendente._id}>
                                            {dipendente.nome} {dipendente.cognome}
                                          </button>
                                        </h1>
                                      </div>
                                      <div id={dipendente._id} className="collapse" aria-labelledby="acc">
                                        <div className="row card-body">
                                          <div className="col-sm-12 col-lg-6 col-xl-6 col-md-12 ">
                                            <ul className="list-group list-group-item-action">
                                              <li className="list-group-item">Nome: {dipendente.nome} </li>
                                              <li className="list-group-item">Cognome: {dipendente.cognome}</li>
                                              <li className="list-group-item">Codice fiscale: {dipendente.cf} </li>

                                              <li className="list-group-item">Data di nascita: {new Date(dipendente.dataNascita).toLocaleDateString("it-IT")} </li>
                                              <li className="list-group-item">Luogo di nascita: {dipendente.luogoNascita}</li>
                                              <li className="list-group-item">Indirizzo di residenza: {dipendente.indirizzo} </li>
                                            </ul>
                                          </div>
                                          {dipendente.ruolo == "autista" ? (
                                            <div className="col-sm-12 col-lg-6 col-xl-6 col-md-12">
                                              <ul className="list-group list-group-item-action">
                                                <li className="list-group-item">Ruolo: {dipendente.ruolo} </li>
                                                <li className="list-group-item">ID Patente: {dipendente.idPatente} </li>
                                                <li className="list-group-item">Scadenza patente: {new Date(dipendente.scadenzaPatente).toLocaleDateString("it-IT")} </li>
                                                <li className="list-group-item">Categoria patente: {dipendente.categoriaPatente} </li>
                                                <li className="list-group-item">Email aziendale: {dipendente.email} </li>
                                                <li className="list-group-item">Numero di telefono: {dipendente.cellulare} </li>
                                              </ul>
                                            </div>
                                          ) : dipendente.ruolo == "addetto_parcheggio" ? (
                                            <div className="col-sm-12 col-lg-6 col-xl-6 col-md-12">
                                              <ul className="list-group list-group-item-action">
                                                <li className="list-group-item">Ruolo: {dipendente.ruolo} </li>
                                                <li className="list-group-item">Email aziendale: {dipendente.email} </li>
                                                <li className="list-group-item">Numero di telefono: {dipendente.cellulare} </li>
                                              </ul>
                                            </div>
                                          ) : (
                                            <div></div>
                                          )}
                                        </div>
                                        <div className="align-right mb-2">
                                          <button onClick={modificaDipendente} className=" btn btn-outline-dark  ">
                                            Modifica
                                          </button>
                                          {/* BUTTON CHE FA DA TRIGGER PER IL MODAL INSERITO IN ALTO */}
                                          <button onClick={() => setIdDipendente(dipendente._id)} type="button" className="btn btn-secondary img-shadow" data-toggle="modal" data-target="#exampleModal2">
                                            Rimuovi
                                          </button>
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
      </div>
    </Page>
  )
}

export default withRouter(VisualizzaDipendenti)
