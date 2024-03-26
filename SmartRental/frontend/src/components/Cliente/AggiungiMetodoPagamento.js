import React, { useContext, useState } from "react"

import Axios from "axios"
import { KeyboardDatePicker } from "@material-ui/pickers"

import Page from "../Page"
import ExampleContext from "../../ExampleContext"
import { withRouter } from "react-router-dom"

function AggiungiMetodoPagamento() {
  const [circuito, setCircuito] = useState()
  const [numeroCarta, setNumeroCarta] = useState()
  const [selectedDate, setSelectedDate] = useState(null)
  const [proprietario, setProprietario] = useState()
  const [errori, setErrori] = useState([])
  const [cvv, setCvv] = useState()
  const addFlashMessage = useContext(ExampleContext)

  async function handleSubmit(e) {
    e.preventDefault()
    const idProprietario = localStorage.getItem("_id")

    try {
      await Axios.post("http://localhost:8081/aggiungiMetodoPagamento", { circuito, numeroCarta, selectedDate, proprietario, cvv, idProprietario })
        .then(response => {
          console.log(response)
          addFlashMessage("Metodo di pagamento aggiunto con successo")
          setTimeout(function () {
            window.location.href = "/areaPersonale"
          }, 1200)
        })
        .catch(errore => {
          setErrori(errore.response.data)
          window.scrollTo(0, 0)
        })
    } catch (e) {
      console.log(e.response.data)
    }
  }

  return (
    <Page title="Aggiungi metodo di pagamento">
      <div className="container text-font">
        <div className="row justify-content-center mt-5 mb-5 ">
          <div className="col-xl-10 col-lg-12 col-md-9 ">
            <div className="card img-shadow my-4 img-contatti">
              <div className="card-body justify-content-center">
                {/* TESTO SUPERIORE */}

                <div className="text-center img-contatti pr-2 pl-2 pt-4 pb-3">
                  <h2 className=" mb-3">
                    <strong> Aggiungi un nuovo metodo di pagamento</strong>
                  </h2>
                </div>
                <div className="container mb-5 " style={{ width: "auto" }}>
                  <div className="row align-center justify-content-center">
                    {errori.length > 0 ? (
                      errori.map(errore => (
                        <div className=" p-2 m-2 mt-2 mb-2 col-4 alert alert-danger img-contatti" role="alert">
                          {errore}
                        </div>
                      ))
                    ) : (
                      <div></div>
                    )}
                  </div>
                </div>

                <div className="row mt-2 align-center justify-content-center">
                  <div className="col-lg-8 col-md-12 col-sm-12">
                    {/* RETTANGOLO CENTRALE */}
                    <div className="p-3 img-shadow  img-contatti" style={{ backgroundColor: "#f8f9fa" }}>
                      {/* FORM */}
                      <form onSubmit={handleSubmit} className="col-lg-12 col-md-12 col-sm-12 justify-content-center align-center mt-2 ">
                        <div className="form-row ">
                          <div className="center mt-2">
                            <img className="img-border" src="/img/iu.png" alt="Foto metodo di pagamento" />
                          </div>
                          <div className="col-lg-12 col-md-12 col-sm-12 mt-3 mb-3">
                            <label> Circuito</label>
                            <div>
                              <select defaultValue={"DEFAULT"} onChange={e => setCircuito(e.target.value)} className="custom-select required " style={{ width: "auto" }} id="circuito" name="circuito">
                                <option value="DEFAULT" disabled>
                                  Circuito
                                </option>
                                <option value="visa">Visa</option>
                                <option value="mastercard">Mastercard</option>
                              </select>
                            </div>
                          </div>

                          <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                            <label> Numero Carta</label>
                            <input onChange={e => setNumeroCarta(e.target.value)} type="text" className="form-control" id="numeroCarta" name="numeroCarta" />
                          </div>

                          <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                            <label>Scadenza</label>
                            <div>
                              <KeyboardDatePicker disablePast cancelLabel="Annulla" clearLabel="Pulisci" clearable value={selectedDate} inputProps={{ style: { textAlign: "center" } }} placeholder="Seleziona" onChange={date => setSelectedDate(date)} format="dd/MM/yyyy" />
                            </div>
                          </div>

                          <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                            <label className="ml-3">Proprietario</label>
                            <input onChange={e => setProprietario(e.target.value)} type="text" className="form-control" id="proprietario" name="proprietario" />
                          </div>

                          <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                            <label>CVV</label>
                            <input onChange={e => setCvv(e.target.value)} type="text" className="form-control" id="cvv" name="cvv" />
                          </div>

                          <div className="col-12 align-center mt-3">
                            <button type="submit" className="btn btn-primary display-4 pr-5 pl-5" style={{ width: "auto" }}>
                              Aggiungi
                            </button>
                          </div>
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

export default withRouter(AggiungiMetodoPagamento)
