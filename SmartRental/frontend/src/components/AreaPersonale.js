import React from "react"
import Page from "./Page"
import { withRouter } from "react-router"

import AreaPersonale_AddP from "./AddettoParcheggio/AreaPersonale_AddP"
import AreaPersonale_Autista from "./Autista/AreaPersonale_Autista"
import AreaPersonale_Admin from "./Amministratore/AreaPersonale_Admin"
import AreaPersonale_Cliente from "./Cliente/AreaPersonale_Cliente"

function AreaPersonale() {
  const ruolo = localStorage.getItem("ruolo")
  return <Page title="AreaPersonale">{ruolo == "cliente" ? <AreaPersonale_Cliente /> : ruolo == "amministratore" ? <AreaPersonale_Admin /> : ruolo == "addetto_parcheggio" ? <AreaPersonale_AddP /> : <AreaPersonale_Autista />}</Page>
}

export default withRouter(AreaPersonale)
