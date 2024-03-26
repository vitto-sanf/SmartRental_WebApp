const Prenotazione = require("../models/Prenotazione")
const Utente = require("../models/Utente").default
const mongodb = require("mongodb")

exports.apiAggiungiPrenotazione = function (req, res) {
  let prenotazione = new Prenotazione(req.body)
  console.log(req.body)
  prenotazione
    .aggiungiPrenotazione()
    .then(response => {
      res.json("Prenotazione Effettuata con Successo")
    })
    .catch(regErrors => {
      res.status(500).send(regErrors)
    })
}
exports.apiCambiaAutista = async function (req, res) {
  try {
    await Utente.cambiaAutista(req.body.id)
      .then(async autisti => {
        let dataConsegna = req.body.dataConsegna
        let dataRitiro = req.body.dataRitiro
        let idAutisti = []

        for (let i = 0; i < autisti.length; i++) {
          idAutisti.push(autisti[i]._id)
        }

        let prenotazioni = await Prenotazione.cercaAutistiDisponibili(dataRitiro, dataConsegna, idAutisti)
        //res.header("Cache-Control", "max-age=10").json(posts)
        let autistiDisponibili = []

        for (let i = 0; i < idAutisti.length; i++) {
          var bool = true
          for (let j = 0; j < prenotazioni.length; j++) {
            if (idAutisti[i] == prenotazioni[j].idAutista) {
              bool = false
            }
          }
          if (bool == true) {
            autistiDisponibili.push(idAutisti[i])
          }
        }
        res.json(autistiDisponibili)
      })
      .catch(regErrors => {
        res.status(500).send(regErrors)
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
exports.apiGetPrenotazione = async function (req, res) {
  let prenotazioni = await Prenotazione.getPrenotazione(req.body.idPrenotazione)
  res.json(prenotazioni)
}
exports.apiPrenotazioneById = async function (req, res) {
  let prenotazioni = await Prenotazione.getPrenotazioneById(req.body.id)
  res.json(prenotazioni)
}
exports.apiRimuoviPrenotazione = async function (req, res) {
  let response = await Prenotazione.rimuoviPrenotazione(req.body)
  res.json(response)
}
exports.apiCheckModificaPrenotazione = async function (req, res) {
  let response = await Prenotazione.checkModificaPrenotazione(req.body)
  res.json(response)
}
exports.apiCheckPrenotazioneImprevisti = async function (req, res) {
  let response = await Prenotazione.checkPrenotazioneImprevisti(req.body)
  res.json(response)
}
exports.apiModificaPrenotazione = async function (req, res) {
  let response = await Prenotazione.ModificaPrenotazione(req.body)
  res.json(response)
}

exports.apiGetPrenotazioniByStato = async function (req, res) {
  let response = await Prenotazione.getPrenotazioniByStato(req.body)
  res.json(response)
}
exports.apiIniziaCorsa = async function (req, res) {
  let response = await Prenotazione.iniziaCorsa(req.body.id)
  res.json(response)
}
exports.apiFineCorsa = async function (req, res) {
  let response = await Prenotazione.fineCorsa(req.body.id)
  res.json(response)
}

exports.apiRicercaPrenotazione = async function (req, res) {
  await Prenotazione.ricercaPrenotazione(req.body)
    .then(prenotazioni => {
      res.json(prenotazioni)
    })
    .catch(regErrors => {
      res.status(500).send(regErrors)
    })
}
exports.apiAggiungiDannoMezzo = async function (req, res) {
  let prenotazioni = await Prenotazione.aggiungiDannoMezzo(req.body)
  res.json(prenotazioni)
}
exports.apiGetPrenotazioniAutista = async function (req, res) {
  let prenotazioni = await Prenotazione.getPrenotazioniAutista(req.body.id)
  res.json(prenotazioni)
}
exports.apiAccettaCorsa = async function (req, res) {
  let response = await Prenotazione.accettaCorsa(req.body.idPrenotazione)
  res.json(response)
}

exports.apiGetPrenotazioniByParcheggio = async function (req, res) {
  let prenotazioni = await Prenotazione.getPrenotazioniByParcheggio(req.body)
  res.json(prenotazioni)
}
exports.apiGetPrenotazioniByParcheggioConsegna = async function (req, res) {
  let prenotazioni = await Prenotazione.getPrenotazioniByParcheggioConsegna(req.body)
  res.json(prenotazioni)
}

exports.apiGetPrenotazioniAutistaByStato = async function (req, res) {
  let response = await Prenotazione.getPrenotazioniAutistaByStato(req.body)
  res.json(response)
}

exports.apiModificaPrenotazioneImprevisti = async function (req, res) {
  let response = await Prenotazione.modificaPrenotazioneImprevisti(req.body)
  res.json(response)
}

exports.apiCambiaPrenotazioneAutista = async function (req, res) {
  let response = await Prenotazione.cambiaPrenotazioneAutista(req.body)
  res.json(response)
}
exports.apiCheckRimozioneMezzo = async function (req, res) {
  let response = await Prenotazione.checkRimozioneMezzo(req.body)
  res.json(response)
}
