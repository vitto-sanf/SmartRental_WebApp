import React, { useContext, useState } from "react"
import StateContext from "../../StateContext"
import Page from "../Page"
import Axios from "axios"
import ExampleContext from "../../ExampleContext"
import { withRouter } from "react-router-dom"
import { KeyboardDatePicker } from "@material-ui/pickers"

function RimuoviMetodoPagamento() {
  const metodiPagamento = JSON.parse(localStorage.getItem("metodiPagamento"))
  const [id, setId] = useState()
  const addFlashMessage = useContext(ExampleContext)
  const [selectedDate, setSelectedDate] = useState(new Date(metodiPagamento.scadenza))
  const appState = useContext(StateContext)
  async function handledSubmit(e) {
    e.preventDefault()

    try {
      console.log(id)
      const response = await Axios.post("http://localhost:8081/rimuoviMetodoPagamento", { token: appState.utente.token, id })

      if (response) {
        console.log(response)
        addFlashMessage("Metodo di Pagamento Rimosso con Successo")
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

    localStorage.removeItem("metodiPagamento")
  }
  return (
    <Page title="Cancella metodo di pagamento">
      <div className="container text-font pt-5 pb-5">
        <div className="row justify-content-center mt-5 pt-5 mb-5 pb-5 ">
          <div className="col-xl-10 col-lg-12 col-md-9 ">
            <div className="card img-shadow my-4 img-contatti">
              <div className="card-body justify-content-center">
                {/* TESTO SOPRA */}
                <div className="text-center img-contatti pr-2 pl-2 pt-4 pb-3">
                  <h2 className=" mb-3">
                    <strong> Rimuovi i tuoi metodi di pagamento</strong>
                  </h2>
                  <p>In questa sezione puoi rimuovere i metodi di pagamento che non vuoi utilizzare.</p>
                </div>
                <div className="row mt-2 align-center justify-content-center">
                  <div className="col-lg-8 col-md-12 col-sm-12">
                    <div className="p-3 img-shadow mb-4" style={{ backgroundColor: "#f8f9fa" }}>
                      <div>
                        {/* NAV METODI PAGAMENTO */}
                        <div className="row align-center justify-content-center">
                          <ul className="nav nav-pills mb-3 pt-3 pb-3 mt-3 justify-content-center img-contatti img-shadow" style={{ backgroundColor: "#ffffff", height: "8%", width: "80%" }} id="pills-tab" role="tablist">
                            {metodiPagamento.map(metodoPagamento => (
                              <li key={metodoPagamento._id} className="nav-item" role="presentation">
                                <a onClick={() => setId(metodoPagamento._id)} className="nav-link " id={metodoPagamento.circuito} data-toggle="pill" href={"#" + metodoPagamento.numeroCarta} role="tab" aria-controls={metodoPagamento.circuito} aria-selected="false">
                                  {metodoPagamento.circuito}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                        {/* CONTENUTO */}
                        <div className="tab-content" id="pills-tabContent">
                          {metodiPagamento.map(metodoPagamento => (
                            <div key={metodoPagamento._id} className="tab-pane fade " id={metodoPagamento.numeroCarta} role="tabpanel" aria-labelledby={metodoPagamento.circuito}>
                              <form onSubmit={handledSubmit} className="col-lg-12 col-md-12 col-sm-12 text-font justify-content-center align-center mt-2 ">
                                <div className="form-row ">
                                  <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
                                    <div className="center mt-2" style={{ width: "60%" }}>
                                      <img className="img-border" src="/img/iu.png" alt="Foto pagamento" />
                                    </div>
                                    <select defaultValue={"DEFAULT"} className="custom-select mt-4" style={{ width: "auto" }} id="circuito" name="circuito" disabled>
                                      <option value="DEFAULT" disabled>
                                        {metodoPagamento.circuito}
                                      </option>
                                      <option value="visa">Visa</option>
                                      <option value="mastercard">Mastercard</option>
                                    </select>
                                  </div>

                                  <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                                    <label className="ml-2"> Numero Carta</label>
                                    <input value={metodoPagamento.numeroCarta} type="text" className="form-control" id="numeroCarta" placeholder="Numero carta" name="numeroCarta" disabled />
                                  </div>

                                  <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                                    <label className="ml-2">Scadenza</label>
                                    <KeyboardDatePicker disablePast cancelLabel="Annulla" clearLabel="Pulisci" clearable value={metodiPagamento.scadenza} inputProps={{ style: { textAlign: "center" } }} placeholder="Scadenza metodo pagamento" onChange={date => setSelectedDate(date)} format="dd/MM/yyyy" />
                                  </div>

                                  <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                                    <label className="ml-3">Proprietario</label>
                                    <input value={metodoPagamento.proprietario} type="text" className="form-control" id="proprietario" name="proprietario" disabled />
                                  </div>

                                  <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                                    <label className="ml-2">CVV</label>
                                    <input onChange={e => setCvv(e.target.value)} type="text" className="form-control" value={metodoPagamento.cvv} id="cvv" name="cvv" disabled />
                                  </div>

                                  <div className="col-12 align-center mt-3">
                                    <button type="submit" to="areaPersonale_Cliente" className="btn btn-secondary display-4 pr-5 pl-5" style={{ width: "auto" }}>
                                      Rimuovi
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
      </div>
    </Page>
  )
}

export default withRouter(RimuoviMetodoPagamento)
