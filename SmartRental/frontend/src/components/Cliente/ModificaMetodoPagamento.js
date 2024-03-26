import React, { useContext, useState } from "react"

import { KeyboardDatePicker } from "@material-ui/pickers"
import Axios from "axios"
import StateContext from "../../StateContext"
import Page from "../Page"
import ExampleContext from "../../ExampleContext"
import { withRouter } from "react-router-dom"

function ModificaMetodoPagamento() {
  const metodiPagamento = JSON.parse(localStorage.getItem("metodiPagamento"))

  const [cvv, setCvv] = useState(metodiPagamento.cvv)
  const [id, setId] = useState()
  const [selectedDate, setSelectedDate] = useState()
  const [errori, setErrori] = useState()
  const addFlashMessage = useContext(ExampleContext)
  const appState = useContext(StateContext)
  function setPagamento(id, scadenza, cvv) {
    setId(id)
    setSelectedDate(scadenza)
    setCvv(cvv)
  }

  async function handledSubmit(e) {
    e.preventDefault()

    try {
      if (cvv.length == 3) {
        const response = await Axios.post("http://localhost:8081/modificaMetodoPagamento", { token: appState.utente.token, id, selectedDate, cvv })

        if (response.data) {
          addFlashMessage("Metodo di Pagamento Aggiornato con Successo")
          localStorage.removeItem("metodiPagamento")
          setTimeout(function () {
            window.location.href = "/areaPersonale"
          }, 1200)
        } else {
          console.log("Errore nei dati inseriti")
        }
      } else {
        setErrori("CVV errato")
        window.scrollTo(0, 0)
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
  }

  return (
    <Page title="Modifica metodo di pagamento">
      <div className="container text-font pt-5 pb-5">
        <div className="row justify-content-center mt-5 mb-5 ">
          <div className="col-xl-10 col-lg-12 col-md-9 mb-3">
            <div className="card img-shadow my-5 img-contatti">
              {/* TESTO SUPERIORE */}
              <div className="card-body ">
                <div className="text-center img-contatti  pt-4 pb-5">
                  <h2 className=" mb-3">
                    <strong> Modifica i tuoi metodi di pagamento</strong>
                  </h2>
                  <p className="fs-4">In questa sezione puoi modificare i metodi di pagamento che hai aggiunto.</p>
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

                <div className="row mt-2 align-center justify-content-center">
                  <div className="col-lg-8 col-md-12 col-sm-12 ">
                    {/* RETTANGOLO CENTRALE */}
                    <div className="p-3 img-shadow mb-4 " style={{ backgroundColor: "#f8f9fa" }}>
                      <div className="row  justify-content-center">
                        {/* NAV CON METODI PAGAMENTO */}
                        <ul className="nav nav-pills mb-3 pt-3 pb-3 mt-3 justify-content-center img-contatti img-shadow" style={{ backgroundColor: "#ffffff", height: "8%", width: "80%" }} id="pills-tab" role="tablist">
                          {metodiPagamento.map(metodoPagamento => (
                            <li key={metodoPagamento._id} className="nav-item" role="presentation">
                              <a onClick={() => setPagamento(metodoPagamento._id, metodoPagamento.scadenza, metodoPagamento.cvv)} className="nav-link " id={metodoPagamento.circuito} data-toggle="pill" href={"#" + metodoPagamento.numeroCarta} role="tab" aria-controls={metodoPagamento.circuito} aria-selected="false">
                                {metodoPagamento.circuito}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="tab-content" id="pills-tabContent">
                        {metodiPagamento.map(metodoPagamento => (
                          <div key={metodoPagamento._id} className="tab-pane fade " id={metodoPagamento.numeroCarta} role="tabpanel" aria-labelledby={metodoPagamento.circuito}>
                            <form onSubmit={handledSubmit} className="col-lg-12 col-md-12 col-sm-12 text-font justify-content-center align-center mt-2 ">
                              <div className="form-row ">
                                <div className="center mt-2 mb-3" style={{ width: "60%" }}>
                                  <img className="img-border" src="/img/iu.png" alt="Foto Pagamento" />
                                </div>
                                <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
                                  <label>Circuito</label>
                                  <div>
                                    <select defaultValue={"DEFAULT"} className="custom-select " style={{ width: "auto" }} id="circuito" name="circuito" disabled>
                                      <option value="DEFAULT" disabled>
                                        {metodoPagamento.circuito}
                                      </option>
                                      <option value="visa">Visa</option>
                                      <option value="mastercard">Mastercard</option>
                                    </select>
                                  </div>
                                </div>

                                <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                                  <label> Numero Carta</label>
                                  <input value={metodoPagamento.numeroCarta} type="text" className="form-control" id="numeroCarta" placeholder="Numero carta" name="numeroCarta" disabled />
                                </div>

                                <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                                  <label>Scadenza</label>
                                  <div>
                                    <KeyboardDatePicker disablePast cancelLabel="Annulla" clearLabel="Pulisci" clearable value={selectedDate} inputProps={{ style: { textAlign: "center" } }} placeholder="Scadenza metodo pagamento" onChange={date => setSelectedDate(date)} format="dd/MM/yyyy" />
                                  </div>
                                </div>

                                <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                                  <label>Proprietario</label>
                                  <input value={metodoPagamento.proprietario} type="text" className="form-control" id="proprietario" name="proprietario" disabled />
                                </div>

                                <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                                  <label>CVV</label>
                                  <input onChange={e => setCvv(e.target.value)} type="text" className="form-control" placeholder={metodoPagamento.cvv} id="cvv" name="cvv" />
                                </div>

                                <div className="col-12 align-center mt-3">
                                  <button type="submit" to="areaPersonale_Cliente" className="btn btn-primary display-4 pr-5 pl-5" style={{ width: "auto" }}>
                                    Modifica
                                  </button>
                                </div>
                              </div>
                            </form>
                          </div>
                        ))}
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

export default withRouter(ModificaMetodoPagamento)
