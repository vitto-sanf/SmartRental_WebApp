import React, { useState, useContext } from "react"
import { Link } from "react-router-dom"
import emailjs from "emailjs-com"
import Axios from "axios"
import ExampleContext from "../../ExampleContext"
import Page from "../Page"
import StateContext from "../../StateContext"
import { withRouter } from "react-router-dom"

function randomString(length, chars) {
  var result = ""
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)]
  return result
}

function RecuperaPassword() {
  const [email, setEmail] = useState()
  const addFlashMessage = useContext(ExampleContext)
  const appState = useContext(StateContext)

  async function handledSubmit(e) {
    e.preventDefault()
    const id = appState._id
    try {
      const response = await Axios.post("http://localhost:8081/doesEmailExist", { email })
      if (response.data) {
        console.log(response)
        var random = randomString(10, "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")

        var parametri = {
          email: email,
          newPassword: random,
          id: id
        }

        emailjs.send("gmail", "recupero_password", parametri, "user_NN9lDf5obpmw3wW1FlWy5").then(
          async function (response) {
            const response1 = await Axios.post("http://localhost:8081/changePassword", { parametri })
            console.log("Risposta change Password", response1)
            console.log("SUCCESS!", response.status, response.text)
            addFlashMessage("Email Inviata con Successo!")
          },
          function (error) {
            console.log("FAILED...", error)
          }
        )
      } else {
        console.log("Email errata")
      }
    } catch (e) {
      console.log(e.response.data)
    }
    setTimeout(function () {
      window.location = "/"
    }, 1200)
  }

  return (
    <Page title="Recupera la tua Password">
      <div className="container text-font pt-5 pb-5">
        <div className="row justify-content-center mt-5 mb-5 ">
          <div className="col-xl-10 col-lg-12 col-md-9 ">
            <div className="card img-shadow my-4 img-contatti">
              <div className="card-body justify-content-center" style={{ backgroundColor: "#f8f9fa" }}>
                <div className="row mt-2">
                  <div className="col-lg-6 d-lg-block mt-5">
                    <img className="img-contatti" src="/img/pexels-ready-made-4297818.jpg" alt="" />
                  </div>
                  <div className="col-lg-6">
                    <div className="p-4">
                      {/* TESTO SOPRA */}
                      <div className="text-center">
                        <h4 className="  mb-3">Hai dimenticato la password?</h4>
                        <p className="mb-4 ">Non ti preoccupare, succede! Inserisci il tuo indirizzo email qui sotto e ti invieremo un link con una password generata randomicamente per accedere di nuovo al tuo account!</p>
                      </div>
                      {/* FORM CON EMAIL */}
                      <form onSubmit={handledSubmit} className="user align-center">
                        <div className="form-group mb-4">
                          <input onChange={e => setEmail(e.target.value)} type="email" className="form-control form-control-user pt-3 pb-3" id="email" name="email" aria-describedby="emailHelp" placeholder="Indirizzo Email" />
                        </div>
                        <button type="submit" className="btn btn-primary btn-user btn-block">
                          Recupera Password
                        </button>
                      </form>
                      {/* LINK PER REGISTRATI E LOGIN */}
                      <div className="text-center mb-2">
                        <Link className="small" to="/Registrazione">
                          Crea un nuovo account!
                        </Link>
                      </div>
                      <div className="text-center">
                        <Link className="small" to="/login">
                          Hai già un account? Fai il login!
                        </Link>
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

export default withRouter(RecuperaPassword)
