import React, { useState, useContext } from "react"

import Axios from "axios"
import { withRouter } from "react-router-dom"

import Page from "../Page"
import ExampleContext from "../../ExampleContext"
import StateContext from "../../StateContext"

function ModificaPassword() {
  const [oldPassword, setOldPassword] = useState()
  const [newPassword, setNewPassword] = useState()
  const [confPassword, setConfPassword] = useState()
  const [errori, setErrori] = useState()
  const appState = useContext(StateContext)
  const id = appState._id
  const addFlashMessage = useContext(ExampleContext)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      var parametri = {
        id: id,
        oldPassword: oldPassword,
        newPassword: newPassword
      }

      if (oldPassword == null && newPassword == null) {
        setErrori("Compila i seguenti campi")
        window.scrollTo(0, 0)
      }
      if (newPassword == confPassword) {
        const response2 = await Axios.post("http://localhost:8081/doesPasswordExist", { parametri })
        console.log(response2)
        if (response2.data) {
          const response1 = await Axios.post("http://localhost:8081/changePassword", { parametri })
          addFlashMessage("Password cambiata con Successo!")
          setTimeout(function () {
            window.location.href = "/areaPersonale"
          }, 1200)
        } else {
          setErrori("Vecchia password errata")
          window.scrollTo(0, 0)
        }
      } else {
        setErrori("Password non coincidenti")
        window.scrollTo(0, 0)
      }
    } catch (e) {
      console.log(e.response)
    }
  }
  return (
    <Page title="Modifica Password">
      <div className="container pt-5 text-font">
        <div className="row justify-content-center mt-5 mb-5 ">
          <div className="col-xl-10 col-lg-12 col-md-12 ">
            <div className="card img-shadow img-contatti">
              <div className="card-body justify-content-center">
                {/* TESTO SUPERIORE */}
                <div className="text-center img-contatti pr-2 pl-2 pt-4 pb-3">
                  <h2 className=" mb-3">
                    <strong>Modifica la tua password</strong>
                  </h2>
                  <p className="pb-2">In questa sezione hai la possibilità di modificare la password del tuo account.</p>
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

                <div className="row mt-2 justify-content-center">
                  <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                    {/* RETTANGOLO ESTERNO */}
                    <div className="p-3 img-shadow mb-4 img-contatti" style={{ backgroundColor: "#f8f9fa" }}>
                      {/* FORM PASSWORD */}
                      <form onSubmit={handleSubmit} className="col-lg-12 col-md-12 col-sm-12 text-font justify-content-center align-center mt-2 ">
                        <div className="form-row mt-4">
                          <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                            <input onChange={e => setOldPassword(e.target.value)} type="password" name="oldPassword" placeholder="Inserisci la vecchia password" className="form-control" id="oldPassword" />
                          </div>

                          <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                            <input onChange={e => setNewPassword(e.target.value)} type="password" name="newPassword" placeholder="Inserisci la nuova password" className="form-control" id="newPassword" />
                          </div>

                          <div className="col-lg-12 col-md-12 col-sm-12 form-group">
                            <input onChange={e => setConfPassword(e.target.value)} type="password" name="confPassword" placeholder="Reinserisci la nuova password" className="form-control" id="confPassword" />
                          </div>

                          <div className="col-12 align-center mt-3">
                            <button type="submit" to="areaPersonale" className="btn btn-primary  pr-5 pl-5" style={{ width: "auto" }}>
                              Aggiorna
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

export default withRouter(ModificaPassword)
