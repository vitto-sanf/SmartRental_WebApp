import React, { useState, useContext } from "react"

import Axios from "axios"

import { KeyboardDatePicker } from "@material-ui/pickers"

import Page from "../Page"
import DispatchContext from "../../DispatchContext"
import { withRouter } from "react-router-dom"

function Registrazione(props) {
  const [nome, setNome] = useState()
  const [cognome, setCognome] = useState()
  const [sesso, setSesso] = useState()
  const [indirizzo, setIndirizzo] = useState()
  const [luogoNascita, setLuogoNascita] = useState()

  const [cf, setCf] = useState()
  const [idPatente, setIdPatente] = useState()
  const [categoriaPatente, setCategoriaPatente] = useState()
  const [email, setEmail] = useState()
  const [cellulare, setCellulare] = useState()
  const [password, setPassword] = useState()
  const [confermaPassword, setConfermaPassword] = useState()
  const [errori, setErrori] = useState([])
  const appDispatch = useContext(DispatchContext)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedDate1, setSelectedDate1] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()

    if (password == confermaPassword) {
      try {
        const dataNascita = selectedDate
        const scadenzaPatente = selectedDate1
        const response = await Axios.post("http://localhost:8081/registrazione", {
          ruolo: "cliente",
          nome,
          cognome,
          dataNascita,
          indirizzo,
          luogoNascita,
          cf,
          idPatente,
          scadenzaPatente,
          categoriaPatente,
          email,
          cellulare,
          password,
          sesso
        })

        appDispatch({
          type: "flashMessage",
          value: "Congratulazioni, hai creato il tuo Account!"
        })
        console.log("Utente creato con successo")

        window.location = "/login"
      } catch (e) {
        console.log(e.response.data)
        setErrori(e.response.data)
        window.scrollTo(0, 0)
      }
    } else {
      setErrori("Password non coincidenti")
      window.scrollTo(0, 0)
    }
  }

  return (
    <Page title="Registrati">
      <div className="pt-5" style={{ backgroundColor: "#f8f9fa" }}>
        {/* TITOLO */}
        <div className="container mb-5">
          <div className="row justify-content-center pt-5">
            <h2 className="mb-3 display-2 align-center">
              <strong>Crea un nuovo Account!</strong>
            </h2>
            <h3 className=" display-7 align-center">Sono richiesti i seguenti dati per favorire il completo funzionamento del nostro servizio.</h3>
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

        {/* PARTE CENTRALE  */}
        <div className="pb-5">
          <div className="container">
            <div className="row justify-content-center align-center">
              {/* IMMAGINE SX */}
              <div className="row justify-content-center align-items-center">
                <div className="col-lg-6 col-xl-6 d-none d-xl-block ">
                  <img src="/img/pexels-cottonbro-4604722.jpg" className="img-shadow mb-5 mt-5" alt="Foto registrazione" style={{ borderRadius: "60px" }} />
                </div>
                {/* FORM REGISTRAZIONE */}
                <form onSubmit={handleSubmit} className="col-12 col-md-12 col-lg-6 text-font">
                  <h5 className="align-center mb-4 mt-3 ">
                    <strong>
                      <mark>Informazioni Personali</mark>
                    </strong>
                  </h5>
                  <div className="form-row">
                    <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 mt-3 mb-4">
                      <label htmlFor="nome">Nome*</label>
                      <input onChange={e => setNome(e.target.value)} type="text" className="form-control" id="nome" name="nome" />
                    </div>
                    <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 mt-3 mb-3">
                      <label htmlFor="cognome">Cognome*</label>
                      <input onChange={e => setCognome(e.target.value)} type="text" className="form-control" id="cognome" name="cognome" />
                    </div>

                    <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 mt-3 mb-4">
                      <label htmlFor="dataNascita">Data di nascita*</label>
                      <div>
                        <KeyboardDatePicker cancelLabel="Annulla" disableFuture clearLabel="Pulisci" clearable value={selectedDate} placeholder="Data di nascita" onChange={date => setSelectedDate(date)} format="dd/MM/yyyy" />
                      </div>
                    </div>

                    <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 mb-3">
                      <label htmlFor="indirizzo">Indirizzo di residenza*</label>
                      <input onChange={e => setIndirizzo(e.target.value)} type="text" className="form-control" id="indirizzo" name="indirizzo" />
                    </div>
                    <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 mb-3">
                      <label htmlFor="luogoNascita">Luogo di nascita*</label>
                      <input onChange={e => setLuogoNascita(e.target.value)} type="text" className="form-control" id="luogoNascita" name="luogoNascita" />
                    </div>
                    <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 mb-4 ">
                      <label htmlFor="luogoNascita">Sesso*</label>
                      <div>
                        <select onChange={e => setSesso(e.target.value)} defaultValue={"DEFAULT"} className="custom-select" style={{ width: "auto" }} id="sesso" name="sesso">
                          <option default selected value="DEFAULT" disabled>
                            Seleziona
                          </option>
                          <option value="M">M</option>
                          <option value="F">F</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-12 mb-4">
                      <label htmlFor="cf">Codice fiscale*</label>
                      <input onChange={e => setCf(e.target.value)} type="text" className="form-control" style={{ width: "70%" }} id="cf" name="cf" />
                    </div>
                  </div>

                  <h5 className="align-center mb-4 mt-3">
                    <strong>
                      <mark>Campi Facoltativi</mark>
                    </strong>
                  </h5>

                  <div className="form-row">
                    <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 mb-4">
                      <label htmlFor="idPatente">ID Patente</label>
                      <input onChange={e => setIdPatente(e.target.value)} type="text" className="form-control" id="idPatente" name="idPatente" />
                    </div>
                    <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 mb-4">
                      <label htmlFor="scadenzaPatente">Scadenza patente</label>
                      <div>
                        <KeyboardDatePicker cancelLabel="Annulla" disablePast clearLabel="Pulisci" clearable value={selectedDate1} style={{ width: "auto" }} placeholder="Inserisci" onChange={date => setSelectedDate1(date)} format="dd/MM/yyyy" />
                      </div>
                    </div>
                    <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12  mb-4">
                      <label htmlFor="categoriaPatente">Categoria Patente</label>
                      <div>
                        <select onChange={e => setCategoriaPatente(e.target.value)} defaultValue={"DEFAULT"} className="custom-select" style={{ width: "auto" }} id="categoriaPatente" name="categoriaPatente">
                          <option defaut selected value="DEFAULT" disabled>
                            Seleziona
                          </option>
                          <option value="Am">AM</option>
                          <option value="A1">A1</option>
                          <option value="A2">A2</option>
                          <option value="A3">A3</option>
                          <option value="B">B</option>
                        </select>
                      </div>
                    </div>
                    <div className="container">
                      <h6 className="text-muted small" style={{ lineHeight: "20px" }}>
                        NB. Se nella tua patente compare più di una categoria, inserisci quella che ritieni più opportuna per il tuo noleggio. In qualsiasi momento potrai aggiornarla dalla tua Area Personale.
                      </h6>
                    </div>
                  </div>

                  <h5 className="align-center mb-4 mt-3">
                    <strong>
                      <mark>Informazioni Account</mark>
                    </strong>
                  </h5>

                  <div className="form-row">
                    <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 md-6 mb-3">
                      <label htmlFor="email">Indirizzo email*</label>
                      <input onChange={e => setEmail(e.target.value)} type="text" className="form-control" id="email" name="email" />
                    </div>
                    <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 md-3 mb-3">
                      <label htmlFor="cellulare">Numero di telefono*</label>
                      <input onChange={e => setCellulare(e.target.value)} type="tel" className="form-control" id="cellulare" name="cellulare" />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 md-6 mb-3">
                      <label htmlFor="password">Password*</label>
                      <input onChange={e => setPassword(e.target.value)} type="password" className="form-control" id="password" name="password" />
                    </div>
                    <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 md-3 mb-3">
                      <label htmlFor="confermaPassword">Conferma password*</label>
                      <input onChange={e => setConfermaPassword(e.target.value)} type="password" className="form-control" id="confermaPassword" name="confermaPassword" />
                    </div>
                  </div>

                  <div className="col-12 align-center mt-3">
                    <button type="submit" className="btn btn-primary display-4">
                      Registrati
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}

export default withRouter(Registrazione)
