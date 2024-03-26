import React, { useState, useEffect, useContext } from "react"
import Axios from "axios"
import emailjs from "emailjs-com"
import { Link } from "react-router-dom"
import Page from "../Page"
import LoadingDotsIcon from "../LoadingDotsIcon"
import StateContext from "../../StateContext"
import { withRouter } from "react-router-dom"

function Pagamento() {
  const prenotazione = JSON.parse(localStorage.getItem("prenotazione"))
  const [mancia, setMancia] = useState(0)
  const [metodiPagamento, setMetodiPagamento] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [idPagamento, setIdPagamento] = useState(undefined)
  const [circuito, setCircuito] = useState(" ")
  const [numeroCarta, setNumeroCarta] = useState(" ")
  const [totale, setTotale] = useState("")
  const [nomeUtente, setNomeUtente] = useState()
  const [cognomeUtente, setCognomeUtente] = useState()
  const [errori, setErrori] = useState()
  const appState = useContext(StateContext)
  const dataRitiro = new Date(prenotazione.ritiro)
  const dataConsegna = new Date(prenotazione.consegna)

  function pagamento(value, circuito, carta) {
    setIdPagamento(value)
    setCircuito(circuito)
    setNumeroCarta(carta)
  }
  useEffect(() => {
    const ourRequest = Axios.CancelToken.source()
    const id = appState._id

    async function fetchMetodiPagamento() {
      try {
        const response = await Axios.post(`http://localhost:8081/getMetodoPagamento`, { token: appState.utente.token, id })
        console.log(response)
        setMetodiPagamento(response.data)
        setIsLoading(false)
      } catch (error) {
        console.log("There was a problem.")
      }
    }
    async function fetchDatiCliente() {
      try {
        await Axios.post("http://localhost:8081/findUserById", { id })
          .then(function (response) {
            console.log(response)
            setNomeUtente(response.data.nome)
            setCognomeUtente(response.data.cognome)
          })
          .catch(e => {
            console.log(e)
          })
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

    fetchMetodiPagamento()
    fetchDatiCliente()
    return () => {
      ourRequest.cancel()
    }
  }, [])

  useEffect(() => {
    const total = Number(prenotazione.prezzo) + Number(mancia)
    setTotale(total)
  }, [mancia])

  if (isLoading) return <LoadingDotsIcon />

  async function handleSubmit(e) {
    e.preventDefault()
    const id = appState._id
    const email = localStorage.getItem("email")
    const autista = JSON.parse(localStorage.getItem("autista"))
    var idAutista = " "
    console.log(autista)
    console.log(nomeUtente, cognomeUtente)
    console.log(idPagamento)

    if (autista.length > 0 && prenotazione.autistaSelected) {
      idAutista = autista[0]._id
    } else if (autista.length >= 0 && !prenotazione.autistaSelected) {
      idAutista = ""
    } else if (autista.length == 0 && !prenotazione.autistaSelected) {
      idAutista = ""
    } else {
      setErrori("Autista non disponibile")
      window.scrollTo(0, 0)
      setTimeout(function () {
        window.history.back()
      }, 1200)
    }

    if (idPagamento != undefined) {
      const prenotazione1 = {
        dataRitiro: new Date(prenotazione.ritiro),
        dataConsegna: new Date(prenotazione.consegna),
        parcheggioRitiro: prenotazione.parcheggioRitiro,
        parcheggioConsegna: prenotazione.parcheggioConsegna,
        idCliente: prenotazione.idCliente,
        stato: prenotazione.stato,
        nomeCliente: nomeUtente,
        cognomeCliente: cognomeUtente,
        tipologia: prenotazione.tipologia,
        categoria: prenotazione.categoria,
        idMezzo: prenotazione.idMezzo,
        modello: prenotazione.modello,
        imgMezzo: prenotazione.imgMezzo,
        targa: prenotazione.targa,
        identificativoMezzo: prenotazione.identificativoMezzo,
        totale: totale,
        idAutista: idAutista,
        idPagamento: idPagamento
      }
      const datiEmail = {
        email: email,
        dataRitiro: new Date(prenotazione.ritiro).toLocaleString(),
        dataConsegna: new Date(prenotazione.consegna).toLocaleString(),
        parcheggioRitiro: prenotazione.parcheggioRitiro,
        parcheggioConsegna: prenotazione.parcheggioConsegna,
        modello: prenotazione.modello,
        totale: totale
      }
      try {
        emailjs.send("service_9pghi1c", "resoconto_prenotazione", datiEmail, "user_f8eOINgia5sNit8AooEiG").then(
          async function (risposta) {
            await Axios.post("http://localhost:8081/aggiungiPrenotazione", { prenotazione1 })
              .then(async function (response) {
                console.log(response)
                let id = prenotazione1.idMezzo
                let parcheggio = prenotazione1.parcheggioConsegna
                await Axios.post("http://localhost:8081/setParcheggioMezzo", { id, parcheggio })
                  .then(() => {
                    console.log("Mezzo aggiornato")
                    localStorage.removeItem("autista")
                    localStorage.removeItem("metodiPagamento")
                    localStorage.removeItem("prenotazione")
                    window.location = "/home"
                  })
                  .catch(e => {
                    console.log(e)
                  })
              })
              .catch(e => {
                console.log(e)
              })
            console.log("SUCCESS!", risposta.status, risposta.text)
          },
          function (error) {
            console.log("FAILED...", error)
          }
        )
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
    } else {
      setErrori("Inserire un metodo di pagamento")
      window.scrollTo(0, 0)
    }
  }
  return (
    <Page title="Pagamento">
      <div className="pt-5 text-font " style={{ backgroundColor: "#f8f9fa" }}>
        {/* TESTO IN ALTO  */}
        <div className="container  mt-5">
          <div className="row justify-content-center">
            <div className="title col-12 ">
              <h3 className="align-center display-2">
                <strong>Pagamento</strong>
              </h3>
              <h4 className="align-center mb-3 display-7">Concludi la prenotazione, scegliendo il tuo metodo di pagamento preferito</h4>
            </div>
          </div>
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
        {/* CARDS CARTE DI CREDITO */}
        <div className="container">
          <div className="align-center justify-content-center pt-5">
            <div className=" row  img-shadow img-contatti">
              {metodiPagamento ? (
                metodiPagamento.map(metodoPagamento => (
                  <div key={metodoPagamento._id} className="сol-sm-12 col-md-6 col-lg-6 col-xl-4 p-5">
                    <div className="card img-shadow img-border">
                      <img src="/img/iu.png" className="card-img-top img-shadow" alt="Foto visa" />
                      <div className="card-body align-center">
                        <h4 className="mb-3">Carta di credito</h4>
                        <p id="proprietario" className="card-text">
                          {metodoPagamento.proprietario}
                        </p>
                        <p id=" num_carta" className="card-text">
                          {metodoPagamento.numeroCarta}
                        </p>
                      </div>
                      <div className="btn-group-toggle align-center mb-4 " data-toggle="buttons">
                        <button className="btn btn-primary align-center" onClick={() => pagamento(metodoPagamento._id, metodoPagamento.circuito, metodoPagamento.numeroCarta)} type="button">
                          Seleziona
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div> </div>
              )}
            </div>
          </div>
          <div className="row justify-content-center pt-2">
            <div className="col-12 align-center mt-4 mb-5 pb-3 ">
              <Link className="text-black" to="/aggiungiMetodoPagamento">
                <u>
                  <mark> AGGIUNGI UN NUOVO METODO DI PAGAMENTO</mark>
                </u>
              </Link>
            </div>
          </div>
        </div>

        {/* FORM PRECOMPILATO RIEPILOGO */}
        <div className="container ">
          <div className="row justify-content-center pb-5">
            <div className="card col-12 col-md-12 col-lg-11">
              <div className="card-wrapper img-shadow img-border p-3" style={{ backgroundColor: "#bcc8e9" }}>
                <div className="card-box align-center ">
                  <div className="row justify-content-center">
                    <div className="col-md-12 col-lg-10 ">
                      <h5 className="mt-3 mb-5 align-center display-5">Riepilogo della prenotazione</h5>
                    </div>
                  </div>
                  <div className="row justify-content-center mb-5">
                    <div className=" col-xl-4 col-lg-4 col-md-12 col-sm-12  mb-3">
                      <label htmlFor="parcheggio ritiro" className="ml-3">
                        Parcheggio/Stallo Ritiro
                      </label>
                      <input value={prenotazione.parcheggioRitiro} type="text" className="form-control" id="parcheggio ritiro" disabled />
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12  mb-3">
                      <label htmlFor="parcheggioConsegna" className="ml-2">
                        Parcheggio/Stallo Consegna
                      </label>
                      <input value={prenotazione.parcheggioConsegna} type="text" className="form-control" id="parcheggioConsegna" disabled />
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12  mb-3">
                      <label htmlFor="mezzoScelto" className="ml-3">
                        Mezzo Scelto
                      </label>
                      <input value={prenotazione.modello} type="text" className="form-control" id="mezzoScelto" disabled />
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12  mb-3">
                      <label htmlFor="orarioRitiro" className="ml-3">
                        Data/Orario Ritiro
                      </label>
                      <input value={dataRitiro.toLocaleString()} type="text" className="form-control" id="orarioRitiro" disabled />
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12  mb-3">
                      <label htmlFor="orarioConsegna" className="ml-2">
                        Data/Orario Consegna
                      </label>
                      <input value={dataConsegna.toLocaleString()} type="text" className="form-control" id="orarioConsegna" disabled />
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 mb-3">
                      <label htmlFor="metodoPagamento" className="ml-3">
                        Metodo Pagamento
                      </label>
                      <input value={`${circuito} ${numeroCarta} `} type="text" className="form-control" id="metodoPagamento" disabled />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*  FORM PAGAMENTO */}
        <div className="container">
          <div className="row justify-content-center pb-5">
            <div className="card col-12 col-md-12 col-lg-5">
              <div className="card-wrapper img-shadow img-contatti img-border">
                <div className="card-box align-center ">
                  {/* AGGIUNGI MANCIA */}
                  <form onSubmit={handleSubmit}>
                    <div className="form-row mt-5 ">
                      <div className="col-12 mb-4">
                        {prenotazione.autistaSelected ? (
                          <div>
                            <label htmlFor="validationDefault04">Mancia Autista </label>
                            <div>
                              <select defaultValue={"0"} onChange={e => setMancia(e.target.value)} className="custom-select" style={{ width: "auto" }} id="validationDefault04" required>
                                <option value="0">Mancia</option>
                                <option value="5"> 5€</option>
                                <option value="10">10€</option>
                                <option value="15">15€</option>
                                <option value="20">20€</option>
                              </select>
                            </div>
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                      <div className="col-12">
                        <h4 style={{ color: "red" }}>
                          <u>Totale</u>
                        </h4>
                        <h4>
                          <strong>{totale + "€"}</strong>
                        </h4>
                      </div>
                    </div>

                    <button type="submit" className="btn btn-block btn-primary align-center mt-3">
                      Prenota
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}

export default withRouter(Pagamento)
