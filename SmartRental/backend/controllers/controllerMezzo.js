const Mezzo = require("../models/Mezzo")
const Prenotazione = require("../models/Prenotazione")
const jwt = require("jsonwebtoken")
const { ObjectID } = require("mongodb")

const tokenLasts = "365d"

exports.apiAggiungiMezzo = function (req, res) {
  let mezzo = new Mezzo(req.body)
  console.log(req.body)
  mezzo
    .aggiungiMezzo()
    .then(() => {
      res.json({
        token: jwt.sign({ _id: mezzo.data._id, modello: mezzo.data.modello }, process.env.JWTSECRET, { expiresIn: tokenLasts }),
        modello: mezzo.data.modello,
        identificativo: mezzo.data.identificativo
      })
    })
    .catch(regErrors => {
      res.status(500).send(regErrors)
    })
}

exports.apiGetIdMezzoByPrenotazione = async function (req, res) {
  try {
    await Prenotazione.getPrenotazioni(req.body).then(async prenotazioni => {
      let categoria = req.body.categoria
      let tipologia = req.body.tipologia
      let parcheggioRitiro = req.body.parcheggioRitiro
      let idMezzo = []

      for (let i = 0; i < prenotazioni.length; i++) {
        idMezzo.push(ObjectID(prenotazioni[i].idMezzo))
      }

      console.log("IDMEZZO", idMezzo)
      /*  if(!prenotazioni){
        idMezzo= undefined
      } */
      console.log(categoria, tipologia, parcheggioRitiro)
      let mezzi = await Mezzo.findByPrenotazione(idMezzo, tipologia, categoria, parcheggioRitiro)
      //res.header("Cache-Control", "max-age=10").json(posts)
      res.json(mezzi)
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

exports.apiGetMezzo = async function (req, res) {
  await Mezzo.getMezzo(req.body)
    .then(mezzo => {
      res.json(mezzo)
    })
    .catch(regErrors => {
      res.status(500).send(regErrors)
    })
}

exports.apiRimuoviMezzo = async function (req, res) {
  let response = await Mezzo.rimuoviMezzo(req.body)
  res.json(response)
}

exports.apiModificaMezzo = async function (req, res) {
  let response = await Mezzo.modificaMezzo(req.body)
  res.json(response)
}

exports.apiGetMezzoByModello = async function (req, res) {
  let mezzo = await Mezzo.getMezzoByModello(req.params.modello)
  res.json(mezzo)
}
exports.apiDannoMezzo = async function (req, res) {
  let response = await Mezzo.dannoMezzo(req.body.idMezzo)
  res.json(response)
}

exports.apiSostituzioneMezzo = async function (req, res) {
  let mezzo = await Mezzo.sostituzioneMezzo(req.body)
  res.json(mezzo)
}
exports.apiSetParcheggioMezzo = async function (req, res) {
  let mezzo = await Mezzo.setParcheggioMezzo(req.body)
  res.json(mezzo)
}
