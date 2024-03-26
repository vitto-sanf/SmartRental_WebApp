import React, { useContext } from "react"

import NavbarLoggedOut from "./NavbarLoggedOut"
import NavbarLoggedIn from "./NavbarLoggedIn"

import StateContext from "../StateContext"

function Navbar(props) {
  const appState = useContext(StateContext)
  return <section className="img-shadow-nav">{appState.loggedIn ? <NavbarLoggedIn /> : <NavbarLoggedOut />}</section>
}

export default Navbar
