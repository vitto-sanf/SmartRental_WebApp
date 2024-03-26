import React, { useState, useContext } from "react"
import { Link } from "react-router-dom"

import Axios from "axios"

import Page from "../Page"
import DispatchContext from "../../DispatchContext"

import ExampleContext from "../../ExampleContext"

function Login(props) {
  const appDispatch = useContext(DispatchContext)
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const addFlashMessage = useContext(ExampleContext)
  const [errori, setErrori] = useState()

  async function handledSubmit(e) {
    e.preventDefault()

    try {
      console.log(email)
      const response = await Axios.post("http://localhost:8081/login", { email, password })
        .then(response => {
          localStorage.setItem("token", response.data.token)
          appDispatch({ type: "login", data: response.data })
          addFlashMessage("Autenticazione avvenuta con Successo!")

          setTimeout(function () {
            window.location = "/"
          }, 1200)
        })
        .catch(e => {
          setErrori(e.response.data)
          window.scrollTo(0, 0)
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
        console.log("Errore", error.message)
      }
    }
  }

  return (
    <Page title="Accedi">
      <div className=" row text-font justify-content-center pt-5 pb-5" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="container mb-5 mt-5">
          <div className="col-xl-12 col-lg-12 col-md-12">
            <div className="row h-100 justify-content-center align-items-center">
              {/* IMG */}
              <div className="col-lg-6 col-md-12 col-sm-12 d-none d-lg-block pt-3 pb-3">
                <img className="img-shadow img-radius " src="/img/pexels-adrien-olichon.jpg" alt="Foto login" style={{ borderRadius: "60px" }} />
              </div>
              {/* TITOLO + FORM */}
              <div className="col-lg-6 col-md-12 col-sm-12 ">
                <div className="text-center">
                  <h2 className=" display-6 mt-5 pt-5">
                    <strong>Accedi al tuo Account!</strong>
                  </h2>
                  <p className=" display-7 ">Accedi per visualizzare le tue prenotazioni</p>
                </div>

                <form onSubmit={handledSubmit} action="/logged" className="col-lg-12 col-md-12 col-sm-12 justify-content-center align-center mt-2 ">
                  <div className="form-row ">
                    <div className="col-lg-12 col-md-12 col-sm-12 mt-3 mb-3">
                      <input onChange={e => setEmail(e.target.value)} type="email" name="email" placeholder="Email" className="form-control" id="email" />
                    </div>

                    <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
                      <input onChange={e => setPassword(e.target.value)} type="password" name="password" placeholder="Password" className="form-control" id="password" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="col-lg-6 col-md-12 col-sm-12 align-center mt-3">
                      <button type="submit" className="btn btn-primary ">
                        Accedi
                      </button>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12  align-center mt-3">
                      <Link to="/recuperaPassword" className="text-black text-font" style={{ lineHeight: "48px" }}>
                        Hai dimenticato la password?
                      </Link>
                    </div>
                  </div>
                </form>
                <div className="container ">
                  <div className="row align-center justify-content-center ">
                    {errori ? (
                      <div className=" mt-2 alert alert-danger img-contatti" role="alert">
                        {errori}
                      </div>
                    ) : (
                      <div></div>
                    )}
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

export default Login
