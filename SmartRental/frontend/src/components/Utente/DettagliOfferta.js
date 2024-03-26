import React, { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import Axios from "axios"
import Icon from "@material-ui/core/Icon"
import { Link } from "react-router-dom"
import Page from "../Page"
import LoadingDotsIcon from "../LoadingDotsIcon"
import StateContext from "../../StateContext"

function DettagliOfferta() {
  const [mezzo, setMezzo] = useState()
  const { modello } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [prezzo, setPrezzo] = useState()
  const [autistaSelected, setAutistaSelected] = useState(false)
  const [errori, setErrori] = useState()
  const prenotazione = JSON.parse(localStorage.getItem("prenotazione"))
  const autista = JSON.parse(localStorage.getItem("autista"))
  const appState = useContext(StateContext)

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source()

    async function fetchMezzo() {
      try {
        const response = await Axios.get(`http://localhost:8081/dettagliOfferta/${modello}`, { cancelToken: ourRequest.token })
        console.log(response)
        let dataRitiro = new Date(prenotazione.ritiro)
        let dataConsegna = new Date(prenotazione.consegna)

        const difference = (dataConsegna - dataRitiro) / (1000 * 60 * 60)
        const days = Math.floor(difference / 24)
        const hours = Math.floor(difference % 24)
        const total = days * Number(response.data.tariffaGiornaliera) + hours * Number(response.data.tariffaOraria)
        setPrezzo(total)
        setMezzo(response.data)

        setIsLoading(false)
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
    fetchMezzo()
    return () => {
      ourRequest.cancel()
    }
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    try {
      let patenti = mezzo.patenti
      const id = appState._id
      Axios.post("http://localhost:8081/checkPatente", { id, patenti })
        .then(function (validate) {
          console.log(validate)
          if (validate.data) {
            if (autistaSelected && autista.length > 0) {
              var idAutista = autista[0]._id
            } else if (autistaSelected && autista.length == 0) {
              var idAutista = " "
              console.log("Autista non disponibile")
              window.location = "/home"
            }
            const prenotazione1 = {
              ritiro: prenotazione.ritiro,
              consegna: prenotazione.consegna,
              parcheggioRitiro: prenotazione.parcheggioRitiro,
              parcheggioConsegna: prenotazione.parcheggioConsegna,
              idCliente: prenotazione.idCliente,
              stato: prenotazione.stato,
              tipologia: prenotazione.tipologia,
              categoria: prenotazione.categoria,
              idMezzo: mezzo._id,
              modello: mezzo.modello,
              imgMezzo: mezzo.imgName,
              targa: mezzo.targa,
              identificativoMezzo: mezzo.identificativo,
              idAutista: idAutista,
              prezzo: prezzo,
              autistaSelected: autistaSelected
            }

            localStorage.setItem("prenotazione", JSON.stringify(prenotazione1))

            window.location = "/pagamento"
          } else {
            setErrori("La tua patente non è valida per questo mezzo")
            window.scrollTo(0, 0)
            setTimeout(function () {
              window.location = "/home"
            }, 2000)
          }
        })
        .catch(e => {
          console.log(e)
        })
    } catch (error) {
      console.log(error)
    }
  }

  if (isLoading) return <LoadingDotsIcon />
  return (
    <Page title="Dettagli Offerta">
      <div className="modal fade text-font" id="exampleModal2" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog ">
          <div className="modal-content" style={{ height: "50%" }}>
            <div className="modal-header ">
              <h5 className="modal-title" id="exampleModalLabel">
                <strong>Mancata Autenticazione</strong>
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">Per continuare la prenotazione la preghiamo di effettuare il Login</div>
            <div className="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">
                Chiudi
              </button>
              <a type="button" onClick={() => hideModalInfo($("#exampleModal2").modal("hide"))} className="btn btn-success" href="/login">
                Accedi
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5 text-font pt-5 " style={{ backgroundColor: "#f8f9fa" }}>
        <div className="container">
          <div className="row justify-content-center pt-5">
            <div className="col-md-12 col-lg-10">
              <h3 className="align-center mt-4 mb-3 display-2">
                <strong>Dettagli dell'Offerta</strong>
              </h3>
              <h4 className="align-center mb-4 ">Scopri tutti i dettagli relativi al tuo mezzo</h4>
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
        {/* CAROSELLO */}

        <div className="row justify-content-center p-3">
          <div id="carouselExampleIndicators" className="carousel slide col-xl-8 col-lg-8 col-md-8 col-sm-10" data-ride="carousel">
            <ol className="carousel-indicators">
              <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner mt-4 mb-3 img-contatti img-border img-shadow">
              <div className="carousel-item active">
                <img src={`/uploads/${mezzo.imgName}`} className="d-block w-100 p-2" alt="foto1" />
              </div>
              <div className="carousel-item">
                <img src={`/uploads/${mezzo.imgName1}`} className="d-block w-100 p-2" alt="foto2" />
              </div>
              <div className="carousel-item">
                <img src={`/uploads/${mezzo.imgName2}`} className="d-block w-100 p-2" alt="foto3" />
              </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="sr-only">Indietro</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="sr-only">Avanti</span>
            </a>
          </div>
        </div>

        <div className="row justify-content-center pt-3 text-font">
          <div className="card text-center" style={{ width: 18 + "rem" }}>
            <label>
              <mark>Numero Posti</mark>
            </label>
            <div className="card-body">
              <Icon className="material-icons md-36 ">groups</Icon>
              <h5 className="card-title">{mezzo.numeroPosti}</h5>
            </div>
          </div>
          <div className="card text-center" style={{ width: 18 + "rem" }}>
            <label>
              <mark> Carburante</mark>
            </label>
            <div className="card-body">
              <Icon className="material-icons md-36 ">local_gas_station</Icon>
              <h5 className="card-title">{mezzo.carburante}</h5>
            </div>
          </div>
          <div className="card text-center" style={{ width: 18 + "rem" }}>
            <label>
              <mark> Trasmissione</mark>
            </label>
            <div className="card-body">
              <Icon className="material-icons md-36 ">miscellaneous_services</Icon>
              <h5 className="card-title">{mezzo.trasmissione}</h5>
            </div>
          </div>
        </div>

        {/* DESCRIZIONE */}
        <div className="container align-left p-3 pb-5">
          <div className="img-contatti img-shadow img-border p-3" style={{ backgroundColor: "#bcc8e9" }}>
            <div className="row justify-content-center py-5 text-font">
              <div className="col-md-12 col-lg-10">
                <h4 className="align-center pb-3">
                  <strong>Descrizione del mezzo</strong>
                </h4>
                <p className=" display-7">{mezzo.descrizione}</p>
              </div>
            </div>
          </div>
        </div>

        {/* CARTE CON TARIFFE */}

        <div className="container pb-5 ">
          <div className="row justify-content-center p-3">
            <div className="col-xl-6 col-lg-6 col-md-10 col-sm-10">
              <div className="card img-shadow img-border" style={{ width: "auto" }}>
                <div className="card-header text-center">
                  <h4> {mezzo.modello}</h4>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <h5 className="card-title mt-3">Tariffa Giornaliera</h5>
                    <h4 className=" mb-4">
                      <strong>{mezzo.tariffaGiornaliera}€/giorno</strong>
                    </h4>
                    <h5 className="card-title ">Tariffa Oraria</h5>
                    <h4 className=" mb-3">
                      <strong>{mezzo.tariffaOraria}€/ora</strong>
                    </h4>
                    <div className="form-check align-center">
                      {mezzo.tipoMezzo == "auto" ? (
                        <div>
                          <input onClick={() => setAutistaSelected(autista => !autista)} className="form-check-input" type="checkbox" id="flexCheckDefault" />
                          <label className="form-check-label  display-7" htmlFor="flexCheckDefault">
                            <h6>Aggiungi Autista</h6>
                          </label>
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                    <h3 className="card-title align-center mt-4" style={{ color: "red" }}>
                      <u>Prezzo Totale</u>
                    </h3>
                    <h4 className="mb-4 align-center">
                      <strong>{prezzo + "€"}</strong>
                    </h4>

                    <p className="card-text align-center text-muted"> Attenzione: Il calcolo del prezzo è ottenuto prendendo in considerazione la data di ritiro e di consegna selezionata nella pagina precedente. </p>

                    <div className="align-center">
                      {appState.loggedIn ? (
                        appState.ruolo == "cliente" ? (
                          <button className="col-4 btn btn-primary justify-content-center mt-2" type="submit">
                            Prenota
                          </button>
                        ) : (
                          <div></div>
                        )
                      ) : (
                        <button type="button" className="col-4 btn btn-primary justify-content-center mt-2" data-toggle="modal" data-target="#exampleModal2">
                          Prenota
                        </button>
                      )}
                    </div>
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

export default DettagliOfferta
