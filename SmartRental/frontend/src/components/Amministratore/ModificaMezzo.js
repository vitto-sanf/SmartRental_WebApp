import React, { useContext, useState } from "react"
import StateContext from "../../StateContext"
import Axios from "axios"
import { withRouter } from "react-router-dom"
import Page from "../Page"
import ExampleContext from "../../ExampleContext"

function ModificaMezzo() {
  const mezzo = JSON.parse(localStorage.getItem("mezzo_selezionato"))
  const [descrizione, setDescrizione] = useState(mezzo.descrizione)
  const [tariffaOraria, setTariffaOraria] = useState(mezzo.tariffaOraria)
  const [tariffaGiornaliera, setTariffaGiornaliera] = useState(mezzo.tariffaGiornaliera)
  const addFlashMessage = useContext(ExampleContext)
  const appState = useContext(StateContext)

  async function handledSubmit(e) {
    e.preventDefault()
    const id = mezzo._id

    try {
      const response = await Axios.post("http://localhost:8081/modificaMezzo", { token: appState.utente.token, id, descrizione, tariffaGiornaliera, tariffaOraria })

      if (response) {
        addFlashMessage("Mezzo modificato con Successo")
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

    localStorage.removeItem("mezzo_selezionato")
  }
  return (
    <Page title="Modifica Mezzo">
      <div className="container text-font">
        <div className="row justify-content-center mt-2 mb-3 ">
          <div className="col-xl-10 col-lg-12 col-md-12 ">
            <div className="card o-hidden border-0 shadow-lg my-4 img-contatti">
              <div className="card-body justify-content-center">
                <div className="text-center img-contatti pr-2 pl-2 pt-4 pb-3">
                  <h2 className=" mb-3">
                    <strong> Modifica le informazioni di un Mezzo</strong>
                  </h2>
                </div>
                <div className="row mt-2">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="p-3 img-shadow mb-4 img-contatti" style={{ backgroundColor: "#f8f9fa" }}>
                      <form onSubmit={handledSubmit} className="col-lg-12 col-md-12 col-sm-12 text-font justify-content-center align-center mt-2 ">
                        <h5 className="align-center mb-4 mt-3">
                          <mark>Informazioni generali sul mezzo</mark>
                        </h5>
                        <div className="form-row">
                          <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                            <label htmlFor="cilindrata">Tipo di mezzo</label>
                            <input value={mezzo.tipoMezzo} type="text" className="form-control" placeholder="..." id="tipo" name="tipo" disabled />
                          </div>
                          <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                            <label htmlFor="modello">Modello</label>
                            <input value={mezzo.modello} type="text" className="form-control" placeholder="..." id="modello" name="modello" disabled />
                          </div>
                          {mezzo.tipoMezzo == "auto" || mezzo.tipoMezzo == "moto" ? (
                            <div className="form-row">
                              <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                                <label htmlFor="cilindrata">Categoria</label>
                                <input value={mezzo.categoria} type="text" className="form-control" placeholder="..." id="categoria" name="categoria" disabled />
                              </div>

                              <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                                <label htmlFor="cilindrata">Cilindrata</label>
                                <input value={mezzo.cilindrata} type="text" className="form-control" placeholder="..." id="cilindrata" name="cilindrata" disabled />
                              </div>

                              <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                                <label htmlFor="targa">Targa</label>
                                <input value={mezzo.targa} type="text" className="form-control" placeholder="..." id="targa" name="targa" disabled />
                              </div>
                              <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                                <label htmlFor="nPosti">Numero Posti</label>
                                <input value={mezzo.numeroPosti} type="text" className="form-control" placeholder="..." id="nPosti" name="nPosti" disabled />
                              </div>
                              <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                                <label htmlFor="modello">Trasmissione</label>
                                <input value={mezzo.trasmissione} type="text" className="form-control" placeholder="..." id="trasmissione" name="trasmissione" disabled />
                              </div>
                              <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                                <label htmlFor="modello">Carburante</label>
                                <input value={mezzo.carburante} type="text" className="form-control" placeholder="..." id="carburante" name="carburante" disabled />
                              </div>
                            </div>
                          ) : mezzo.tipoMezzo == "bicicletta" || mezzo.tipoMezzo == "monopattino" ? (
                            <div className="col-12">
                              <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
                                <label htmlFor="id">Identificativo</label>
                                <input value={mezzo.identificativo} type="text" className="form-control" style={{ width: "auto" }} id="id" placeholder="..." name="id" disabled />
                              </div>
                            </div>
                          ) : (
                            <div></div>
                          )}
                        </div>

                        {/*  <!-- CAMPI FACOLTATIVI --> */}
                        <h5 className="align-center mb-4 mt-3">
                          <mark>Foto del mezzo</mark>
                        </h5>

                        <div className="form-row">
                          <div className="input-group mb-3 h-100 justify-content-center align-items-center">
                            <div className="col-lg-6 col-md-12 col-sm-12 ">
                              <img className="img-contatti" src={`/uploads/${mezzo.imgName}`} alt="" />
                            </div>
                          </div>
                        </div>

                        {/*  <!-- INFORMAZIONI ACCOUNT --> */}
                        <h5 className="align-center mb-4 mt-3">
                          <mark>Descrizione del mezzo</mark>
                        </h5>

                        <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
                            <div className="form-group">
                              <textarea onChange={e => setDescrizione(e.target.value)} className="form-control" id="exampleFormControlTextarea1" placeholder={mezzo.descrizione} rows={6} />
                            </div>
                          </div>
                        </div>

                        {/*  <!-- INFORMAZIONI ACCOUNT --> */}
                        <h5 className="align-center mb-4 mt-2">
                          <mark>Tariffe orarie e giornaliere</mark>
                        </h5>

                        <div className="row">
                          <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                            <label htmlFor="tariffaOraria">Tariffa Oraria</label>
                            <input onChange={e => setTariffaOraria(e.target.value)} type="text" className="form-control" placeholder={mezzo.tariffaOraria} id="tariffaOraria" name="tariffaOraria" />
                          </div>
                          <div className="col-lg-6 col-md-12 col-sm-12 mb-3">
                            <label htmlFor="tariffaGiornaliera">Tariffa Giornaliera</label>
                            <input onChange={e => setTariffaGiornaliera(e.target.value)} type="text" className="form-control" placeholder={mezzo.tariffaGiornaliera} id="tariffaGiornaliera" name="tariffaGiornaliera" />
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
    </Page>
  )
}

export default withRouter(ModificaMezzo)
