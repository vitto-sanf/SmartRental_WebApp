import React, { useState, useContext } from "react"
import { Link } from "react-router-dom"
import Icon from "@material-ui/core/Icon"
import Page from "../Page"
import emailjs from "emailjs-com"
import ExampleContext from "../../ExampleContext"

function Contatti() {
  const [nome, setNome] = useState()
  const [email, setEmail] = useState()
  const [cellulare, setCellulare] = useState()
  const [messaggio, setMessaggio] = useState()
  const addFlashMessage = useContext(ExampleContext)

  async function handledSubmit(e) {
    e.preventDefault()

    let parametri = {
      nome: nome,
      email: email,
      cellulare: cellulare,
      messaggio: messaggio
    }
    emailjs.send("gmail", "contattaci", parametri, "user_NN9lDf5obpmw3wW1FlWy5").then(
      async function (response) {
        console.log("SUCCESS!", response.status, response.text)
        addFlashMessage("Email Inviata con Successo!")
        setTimeout(function () {
          window.location = "/"
        }, 1200)
      },
      function (error) {
        console.log("FAILED...", error)
      }
    )
  }
  return (
    <Page title="Contatti ">
      <div className="text-font pt-5" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="container-fluid mt-5 ">
          <div className="row justify-content-center pb-5 pb-5">
            <div className="col-xl-10 col-lg-12 col-md-9 ">
              {/* RETTANGOLO CENTRALE */}
              <div className="card img-shadow-nav my-4 img-contatti">
                <div className="card-body img-shadow img-contatti">
                  <div className="row h-100 justify-content-center align-items-center">
                    {/* IMG */}
                    <div className="col-lg-6 col-md-12 col-sm-12 d-none d-lg-block pt-3 pb-3">
                      <img className="img-contatti img-shadow" src="/img/pexels-oleg-magni-2764678.jpg" alt="Foto contatti" />
                    </div>
                    {/* TESTO + FORM */}
                    <div className="col-lg-6 col-md-12 col-sm-12">
                      <div className=" text-center mt-4">
                        <h2 className=" mb-3">
                          <strong>Resta in contatto con noi!</strong>
                        </h2>
                        <p className="mb-4 ">Per qualsiasi informazione è possibile contattarci direttamente compilando il form qui sotto</p>
                      </div>
                      <div className="img-contatti img-shadow" style={{ backgroundColor: "#ffffff" }}>
                        <form onSubmit={handledSubmit} className="col-lg-12 col-md-12 col-sm-12 text-font justify-content-center align-center mt-2 ">
                          <div className="form-row">
                            <div className="col-lg-12 col-md-12 col-sm-12 mt-5 mb-3">
                              <input onChange={e => setNome(e.target.value)} type="text" className="form-control" placeholder="Inserisci il tuo nome e cognome" id="nome" name="nome" />
                            </div>

                            <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
                              <input onChange={e => setEmail(e.target.value)} type="email" className="form-control" placeholder="Inserisci la tua Email " id="email" name="email" />
                            </div>

                            <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
                              <input onChange={e => setCellulare(e.target.value)} type="tel" className="form-control" placeholder="Inserisci il tuo numero di telefono" id="cellulare" name="cellulare" />
                            </div>
                          </div>

                          <div className="col-lg-12 col-md-12 col-sm-12 mt-2 mb-3">
                            <div className="form-group">
                              <textarea onChange={e => setMessaggio(e.target.value)} className="form-control" id="exampleFormControlTextarea1" placeholder="Inserisci qui il tuo messaggio" rows="5" defaultValue="" />
                            </div>
                          </div>

                          <div className="col-12 align-center mt-3">
                            <button type="submit" className="btn btn-primary pr-5 pl-5 mb-4 " style={{ width: "auto" }}>
                              Invia
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
        {/* ICONE CON CONTATTI */}
        <div className="row mt-2 pb-5 justify-content-center ">
          <div className="col-lg-2 col-md-12 col-sm-12">
            <div className="text-center mb-5">
              <div className="  align-items-center justify-content-center">
                <Icon className="material-icons-outlined md-36 ">location_on</Icon>
              </div>
              <p className="card-text pt-4">
                <a href="https://goo.gl/maps/qFXEVyqHhfqhh3Fe6">Viale delle Scienze, Palermo</a>
              </p>
            </div>
          </div>
          <div className="col-lg-2 col-md-12 col-sm-12">
            <div className=" text-center mb-5 ">
              <div className="  align-items-center justify-content-center">
                <Icon className="material-icons-outlined md-36 ">phone</Icon>
              </div>
              <p className="card-text pt-4">
                <a href="tel://1234567920">091 23867503</a>
              </p>
            </div>
          </div>
          <div className="col-lg-2 col-md-12 col-sm-12">
            <div className=" text-center mb-5">
              <div className="  align-items-center justify-content-center">
                <Icon className="material-icons-outlined md-36 ">email</Icon>
              </div>
              <p className="card-text pt-4">
                <a href="mailto:progetto.gaas@gmail.com">progetto.gaas@gmail.com</a>
              </p>
            </div>
          </div>
          <div className="col-lg-2 col-md-12 col-sm-12">
            <div className="text-center mb-5">
              <div className="  align-items-center justify-content-center">
                <Icon className="material-icons-outlined md-36 ">schedule</Icon>
              </div>
              <p>
                <p className="card-text pt-4">9:00 - 22:00</p>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}

export default Contatti
