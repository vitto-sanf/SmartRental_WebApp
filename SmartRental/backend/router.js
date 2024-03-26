const apiRouter = require("express").Router()
const controllerUtente = require("./controllers/controllerUtente")
const controllerMezzo = require("./controllers/controllerMezzo")
const controllerMetodoPagamento = require("./controllers/controllerMetodoPagamento")
const controllerPrenotazione = require("./controllers/controllerPrenotazioni")
const cors = require("cors")
const express = require("express")
const fileUpload = require("express-fileupload")
const multer = require("multer")
const path = require("path")
const pathReq = path.join(__dirname, "../frontend/public/uploads")

apiRouter.use(cors())
apiRouter.use(express.static(pathReq))

apiRouter.get("/", (req, res) => res.json("Attenzione Attenzione! Il server di Back-end è attivo."))

apiRouter.post("/registrazione", controllerUtente.apiRegistrazione)
apiRouter.post("/login", controllerUtente.apiLogin)
apiRouter.post("/doesEmailExist", controllerUtente.doesEmailExist)
apiRouter.post("/doesPasswordExist", controllerUtente.doesPasswordExist)
apiRouter.post("/changePassword", controllerUtente.changePassword)
apiRouter.post("/visualizzaDipendente", controllerUtente.apiMustBeLoggedIn, controllerUtente.apiGetDipendente)
apiRouter.post("/rimuoviDipendente", controllerUtente.apiMustBeLoggedIn, controllerUtente.apiRimuoviDipendente)
apiRouter.post("/modificaUtente", controllerUtente.apiMustBeLoggedIn, controllerUtente.apiModificaUtente)
apiRouter.post("/findUserById", controllerUtente.apiFindUserById)
apiRouter.post("/getAutistaByPrenotazione", controllerUtente.apiGetAutistaByPrenotazione)
apiRouter.post("/checkPatente", controllerUtente.apiCheckPatente)

apiRouter.post("/aggiungiMezzo", controllerUtente.apiMustBeLoggedIn, controllerMezzo.apiAggiungiMezzo)
apiRouter.post("/visualizzaMezzo", controllerUtente.apiMustBeLoggedIn, controllerMezzo.apiGetMezzo)
apiRouter.post("/rimuoviMezzo", controllerUtente.apiMustBeLoggedIn, controllerMezzo.apiRimuoviMezzo)
apiRouter.post("/modificaMezzo", controllerUtente.apiMustBeLoggedIn, controllerMezzo.apiModificaMezzo)
apiRouter.post("/sostituzioneMezzo", controllerMezzo.apiSostituzioneMezzo)
apiRouter.post("/getIdMezzoByPrenotazione", controllerMezzo.apiGetIdMezzoByPrenotazione)
apiRouter.get("/dettagliOfferta/:modello", controllerMezzo.apiGetMezzoByModello)
apiRouter.post("/dannoMezzo", controllerMezzo.apiDannoMezzo)
apiRouter.post("/setParcheggioMezzo", controllerMezzo.apiSetParcheggioMezzo)

apiRouter.post("/aggiungiMetodoPagamento", controllerMetodoPagamento.apiAggiungiMetodoPagamento)
apiRouter.post("/getMetodoPagamento", controllerUtente.apiMustBeLoggedIn, controllerMetodoPagamento.apiGetMetodoPagamento)
apiRouter.post("/modificaMetodoPagamento", controllerUtente.apiMustBeLoggedIn, controllerMetodoPagamento.apiModificaMetodoPagamento)
apiRouter.post("/rimuoviMetodoPagamento", controllerUtente.apiMustBeLoggedIn, controllerMetodoPagamento.apiRimuoviMetodoPagamento)

apiRouter.post("/aggiungiPrenotazione", controllerPrenotazione.apiAggiungiPrenotazione)
apiRouter.post("/getPrenotazione", controllerUtente.apiMustBeLoggedIn, controllerPrenotazione.apiGetPrenotazione)
apiRouter.post("/getPrenotazioniByID", controllerPrenotazione.apiPrenotazioneById)
apiRouter.post("/rimuoviPrenotazione", controllerUtente.apiMustBeLoggedIn, controllerPrenotazione.apiRimuoviPrenotazione)
apiRouter.post("/checkModificaPrenotazione", controllerPrenotazione.apiCheckModificaPrenotazione)
apiRouter.post("/checkPrenotazioneImprevisti", controllerPrenotazione.apiCheckPrenotazioneImprevisti)
apiRouter.post("/modificaPrenotazione", controllerUtente.apiMustBeLoggedIn, controllerPrenotazione.apiModificaPrenotazione)
apiRouter.post("/getPrenotazioniByStato", controllerPrenotazione.apiGetPrenotazioniByStato)
apiRouter.post("/iniziaCorsa", controllerPrenotazione.apiIniziaCorsa)
apiRouter.post("/fineCorsa", controllerPrenotazione.apiFineCorsa)
apiRouter.post("/ricercaPrenotazione", controllerUtente.apiMustBeLoggedIn, controllerPrenotazione.apiRicercaPrenotazione)
apiRouter.post("/aggiungiDannoMezzo", controllerPrenotazione.apiAggiungiDannoMezzo)
apiRouter.post("/modificaPrenotazioneImprevisti", controllerPrenotazione.apiModificaPrenotazioneImprevisti)
apiRouter.post("/getPrenotazioniAutista", controllerPrenotazione.apiGetPrenotazioniAutista)
apiRouter.post("/accettaCorsa", controllerPrenotazione.apiAccettaCorsa)
apiRouter.post("/getPrenotazioniByParcheggio", controllerPrenotazione.apiGetPrenotazioniByParcheggio)
apiRouter.post("/getPrenotazioniByParcheggioConsegna", controllerPrenotazione.apiGetPrenotazioniByParcheggioConsegna)
apiRouter.post("/getPrenotazioniAutistaByStato", controllerPrenotazione.apiGetPrenotazioniAutistaByStato)
apiRouter.post("/cambiaAutista", controllerPrenotazione.apiCambiaAutista)
apiRouter.post("/cambiaPrenotazioneAutista", controllerPrenotazione.apiCambiaPrenotazioneAutista)
apiRouter.post("/checkRimozioneMezzo", controllerPrenotazione.apiCheckRimozioneMezzo)

const storage = multer.diskStorage({
  destination: `${pathReq}`,

  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage }).array("files")

apiRouter.post("/upload", function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }
    return res.status(200).send(req.file)
  })
})
module.exports = apiRouter
