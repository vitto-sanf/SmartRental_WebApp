import React, { useContext } from "react"

import { Link } from "react-router-dom"
import Icon from "@material-ui/core/Icon"

import DispatchContext from "../DispatchContext"
import StateContext from "../StateContext"
import ExampleContext from "../ExampleContext"

function NavbarLoggedIn(props) {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)
  const addFlashMessage = useContext(ExampleContext)

  function handleLogout() {
    appDispatch({ type: "logout" })
    addFlashMessage("Logout eseguito con Successo!")
    setTimeout(function () {
      window.location.href = "/"
    }, 1200)
  }

  return (
    <div className="container">
      <nav className=" navbar navbar-expand-lg navbar-light text-font">
        <Link className="navbar-brand " to="/" data-toggle="collapse" data-target=".navbar-collapse.show">
          <img src="/img/smartLogo.svg" alt="LOGO" width="60" height="60" />
        </Link>
        <button className="navbar-toggler mt-3" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0 mr-3">
            <li className="nav-item active mr-4">
              <Link className="nav-link link text-black text-primary display-4" to="/home" data-toggle="collapse" data-target=".navbar-collapse.show">
                Home
              </Link>
            </li>
            <li className="nav-item mr-4">
              <Link className="nav-link link text-black display-4" to="/chiSiamo" data-toggle="collapse" data-target=".navbar-collapse.show">
                Chi siamo
              </Link>
            </li>
            <li className="nav-item mr-4">
              <Link className="nav-link link text-black display-4 " to="/contatti" data-toggle="collapse" data-target=".navbar-collapse.show">
                Contatti
              </Link>
            </li>
          </ul>
          <div className=" align-center">
            <Link className="btn btn-primary-outline display-4" to="/" data-toggle="collapse" data-target=".navbar-collapse.show">
              <Icon className="material-icons-outlined mr-2">account_circle</Icon>
              Area Personale
            </Link>

            <Link onClick={handleLogout} className="btn btn-secondary display-4" to="/" data-toggle="collapse" data-target=".navbar-collapse.show">
              Logout
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavbarLoggedIn
