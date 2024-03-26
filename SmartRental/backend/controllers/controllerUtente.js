const Utente = require("../models/Utente").default
const jwt = require("jsonwebtoken")
const Prenotazione = require("../models/Prenotazione")
const { ObjectID } = require("mongodb")
//CIAO
//how long a token lasts before expiring
const tokenLasts = "365d"

exports.apiMustBeLoggedIn = function (req, res, next) {
  try {
    req.apiUser = jwt.verify(req.body.token, process.env.JWTSECRET)
    next()
  } catch (e) {
    res.status(500).send("Sorry, you must provide a valid token.")
  }
}

exports.apiRegistrazione = function (req, res) {
  let utente = new Utente(req.body)
  console.log(req.body)
  utente
    .registrazione()
    .then(() => {
      res.json({
        token: jwt.sign({ _id: utente.data._id, email: utente.data.email, ruolo: utente.data.ruolo }, process.env.JWTSECRET, { expiresIn: tokenLasts }),
        email: utente.data.email,
        ruolo: utente.data.ruolo,
        _id: utente.data._id
      })
    })
    .catch(regErrors => {
      res.status(500).send(regErrors)
    })
}

exports.apiLogin = function (req, res) {
  let utente = new Utente(req.body)
  utente
    .login()
    .then(() => {
      res.json({
        token: jwt.sign({ _id: utente.data._id, email: utente.data.email, ruolo: utente.data.ruolo }, process.env.JWTSECRET, { expiresIn: tokenLasts }),
        email: utente.data.email,
        ruolo: utente.data.ruolo,
        _id: utente.data._id
      })
    })
    .catch(regErrors => {
      res.status(500).send(regErrors)
    })
}

exports.apiGetAutistaByPrenotazione = async function (req, res) {
  try {
    await Prenotazione.getPrenotazioni(req.body).then(async prenotazioni => {
      let idAutista = []

      for (let i = 0; i < prenotazioni.length; i++) {
        if (prenotazioni[i].idAutista != "") {
          idAutista.push(ObjectID(prenotazioni[i].idAutista))
        }
      }

      console.log("IDAutista", idAutista)
      let autista = await Utente.findByPrenotazione(idAutista)

      res.json(autista)
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
      console.log("Error", error)
    }
  }
}

exports.doesEmailExist = async function (req, res) {
  let emailBool = await Utente.doesEmailExist(req.body.email)
  res.json(emailBool)
}

exports.doesPasswordExist = async function (req, res) {
  let passwordBool = await Utente.doesPasswordExist(req.body)
  res.json(passwordBool)
}

exports.changePassword = async function (req, res) {
  let response = await Utente.changePassword(req.body)
  res.json(response)
}

exports.apiGetDipendente = async function (req, res) {
  await Utente.getDipendente(req.body)
    .then(dipendente => {
      res.json(dipendente)
    })
    .catch(regErrors => {
      res.status(500).send(regErrors)
    })
}

exports.apiRimuoviDipendente = async function (req, res) {
  let response = await Utente.rimuoviDipendente(req.body)
  res.json(response)
}

exports.apiModificaUtente = async function (req, res) {
  let response = await Utente.modificaUtente(req.body)
  res.json(response)
}

exports.apiFindUserById = async function (req, res) {
  let utente = await Utente.FindUser(req.body)
  res.json(utente)
}
exports.apiCheckPatente = async function (req, res) {
  let response = await Utente.checkPatente(req.body)
  res.json(response)
}
