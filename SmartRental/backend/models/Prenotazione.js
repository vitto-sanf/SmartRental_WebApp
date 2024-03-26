const prenotazioniCollection = require("../db").db().collection("prenotazioni")
const validator = require("validator")
const mongodb = require("mongodb")

let Prenotazione = function (data) {
  this.data = data
  this.errors = []
}

Prenotazione.prototype.cleanUp = function () {
  // VERIFICA DEI TIPI
  if (typeof this.data.prenotazione1.parcheggioRitiro != "string") {
    this.data.parcheggioRitiro = ""
  }
  if (typeof this.data.prenotazione1.parcheggioConsegna != "string") {
    this.data.parcheggioConsegna = ""
  }
  if (typeof this.data.prenotazione1.dataOraRitiro != "string") {
    this.data.dataOraRitiro = ""
  }
  if (typeof this.data.prenotazione1.dataOraConsegna != "string") {
    this.data.dataOraConsegna = ""
  }
  if (typeof this.data.prenotazione1.costo != "string") {
    this.data.costo = ""
  }
  if (typeof this.data.prenotazione1.stato != "string") {
    this.data.stato = ""
  }
  if (typeof this.data.prenotazione1.danniVeicolo != "string") {
    this.data.danniVeicolo = ""
  }

  // DATI Prenotazione
  this.data = {
    idPrenotazione: undefined,
    dataRitiro: new Date(this.data.prenotazione1.dataRitiro),
    dataConsegna: new Date(this.data.prenotazione1.dataConsegna),
    parcheggioRitiro: this.data.prenotazione1.parcheggioRitiro,
    parcheggioConsegna: this.data.prenotazione1.parcheggioConsegna,
    idCliente: this.data.prenotazione1.idCliente,
    stato: this.data.prenotazione1.stato,
    tipologia: this.data.prenotazione1.tipologia,
    categoria: this.data.prenotazione1.categoria,
    idMezzo: this.data.prenotazione1.idMezzo,
    modello: this.data.prenotazione1.modello,
    totale: this.data.prenotazione1.totale,
    nomeCliente: this.data.prenotazione1.nomeCliente,
    cognomeCliente: this.data.prenotazione1.cognomeCliente,
    targa: this.data.prenotazione1.targa,
    identificativoMezzo: this.data.prenotazione1.identificativoMezzo,
    idAutista: this.data.prenotazione1.idAutista,
    idPagamento: this.data.prenotazione1.idPagamento,
    imgMezzo: this.data.prenotazione1.imgMezzo,
    danniVeicolo: " "

    /*  posizione: this.data.posizione,
    occupato:false */
  }
}

Prenotazione.prototype.aggiungiPrenotazione = function () {
  return new Promise(async (resolve, reject) => {
    // VERIFICA LA VALIDITA' DEI DATI
    this.cleanUp()
    /* await this.validate() */

    // SE NON  CI SONO ERRORI SALVA I DATI NEL DATABASE
    if (!this.errors.length) {
      // "CREATE" NEL DATABASE
      await prenotazioniCollection.insertOne({
        idPrenotazione: this.data.idPrenotazione,
        ParcheggioRitiro: this.data.parcheggioRitiro,
        parcheggioConsegna: this.data.parcheggioConsegna,
        dataRitiro: this.data.dataRitiro,
        dataConsegna: this.data.dataConsegna,
        totale: this.data.totale,
        stato: this.data.stato,
        danniVeicolo: this.data.danniVeicolo,
        idCliente: this.data.idCliente,
        idMezzo: this.data.idMezzo,
        idMetodoPagamento: this.data.idPagamento,
        idAutista: this.data.idAutista,
        targa: this.data.targa,
        identificativoMezzo: this.data.identificativoMezzo,
        tipologia: this.data.tipologia,
        modello: this.data.modello,
        imgMezzo: this.data.imgMezzo,
        dataPrenotazione: new Date().toLocaleDateString(),
        nomeCliente: this.data.nomeCliente,
        cognomeCliente: this.data.cognomeCliente
      })
      resolve()
    } else {
      reject(this.errors)
    }
  })
}

Prenotazione.getPrenotazioni = function (data) {
  return new Promise(function (resolve, reject) {
    let dataRitiro = data.dataRitiro
    let dataConsegna = data.dataConsegna
    const idMezzi = []

    prenotazioniCollection
      .find({
        $or: [{ dataRitiro: { $gte: new Date(dataRitiro), $lte: new Date(dataConsegna) } }, { dataConsegna: { $gte: new Date(dataRitiro), $lte: new Date(dataConsegna) } }, { dataRitiro: { $gte: new Date(dataRitiro) }, dataConsegna: { $lte: new Date(dataConsegna) } }, { dataRitiro: { $lte: new Date(dataRitiro) }, dataConsegna: { $gte: new Date(dataConsegna) } }]
      })
      .toArray()
      .then(function (prenotazioni) {
        if (prenotazioni) {
          resolve(prenotazioni)
        } else {
          reject("Prenotazioni non trovate")
        }
      })
      .catch(function (e) {
        reject("Errore")
      })
  })
}

Prenotazione.getPrenotazioneById = function (_id) {
  return new Promise(function (resolve, reject) {
    prenotazioniCollection
      .find({
        idCliente: _id
      })
      .toArray()
      .then(function (prenotazioni) {
        if (prenotazioni) {
          resolve(prenotazioni)
        } else {
          reject("Prenotazioni non trovate")
        }
      })
      .catch(function (e) {
        reject("Errore")
      })
  })
}

Prenotazione.getPrenotazione = function (id) {
  return new Promise(function (resolve, reject) {
    prenotazioniCollection
      .findOne({
        idPrenotazione: Number(id)
      })
      .then(function (prenotazione) {
        if (prenotazione) {
          resolve(prenotazione)
        } else {
          reject("Prenotazione non trovata")
        }
      })
      .catch(function (e) {
        reject("Errore")
      })
  })
}

Prenotazione.rimuoviPrenotazione = function (data) {
  return new Promise(async function (resolve, reject) {
    await prenotazioniCollection
      .deleteOne({ _id: new mongodb.ObjectID(data.id) })
      .then(response => {
        if (response) {
          resolve("Prenotazione eliminata con successo!")
        } else {
          reject("Errore")
        }
      })
      .catch(function (e) {
        reject("Errore")
      })
  })
}

Prenotazione.checkModificaPrenotazione = function (data) {
  return new Promise(function (resolve, reject) {
    let dataRitiro = data.dataOraRitiro
    let dataConsegna = data.dataOraConsegna

    prenotazioniCollection
      .find({
        $and: [
          {
            $or: [{ dataRitiro: { $gte: new Date(dataRitiro), $lte: new Date(dataConsegna) } }, { dataConsegna: { $gte: new Date(dataRitiro), $lte: new Date(dataConsegna) } }, { dataRitiro: { $gte: new Date(dataRitiro) }, dataConsegna: { $lte: new Date(dataConsegna) } }, { dataRitiro: { $lte: new Date(dataRitiro) }, dataConsegna: { $gte: new Date(dataConsegna) } }]
          },
          {
            idMezzo: data.idMezzo
          },
          {
            idCliente: { $ne: data.idCliente }
          }
        ]
      })
      .toArray()
      .then(function (prenotazioni) {
        if (prenotazioni.length > 0) {
          resolve(true)
        } else {
          resolve(false)
        }
      })
      .catch(function (e) {
        reject("Errore")
      })
  })
}

Prenotazione.checkPrenotazioneImprevisti = function (data) {
  return new Promise(function (resolve, reject) {
    let dataConsegna = data.dataOraConsegna
    let dataRitiro = data.dataOraRitiro

    prenotazioniCollection
      .findOne({
        $and: [
          {
            $or: [{ dataRitiro: { $gte: new Date(dataRitiro), $lte: new Date(dataConsegna) } }, { dataConsegna: { $gte: new Date(dataRitiro), $lte: new Date(dataConsegna) } }, { dataRitiro: { $gte: new Date(dataRitiro) }, dataConsegna: { $lte: new Date(dataConsegna) } }, { dataRitiro: { $lte: new Date(dataRitiro) }, dataConsegna: { $gte: new Date(dataConsegna) } }]
          },
          {
            idMezzo: data.idMezzo
          },
          {
            idCliente: { $ne: data.idCliente }
          }
        ]
      })

      .then(function (prenotazione) {
        if (prenotazione) {
          resolve(prenotazione)
        } else {
          reject("Prenotazione non trovata")
        }
      })
      .catch(function (e) {
        reject("Errore")
      })
  })
}

Prenotazione.cercaAutistiDisponibili = function (dataRitiro, dataConsegna, idAutisti) {
  return new Promise(function (resolve, reject) {
    console.log(idAutisti)
    prenotazioniCollection
      .find({
        $or: [{ dataRitiro: { $gte: new Date(dataRitiro), $lte: new Date(dataConsegna) } }, { dataConsegna: { $gte: new Date(dataRitiro), $lte: new Date(dataConsegna) } }, { dataRitiro: { $gte: new Date(dataRitiro) }, dataConsegna: { $lte: new Date(dataConsegna) } }, { dataRitiro: { $lte: new Date(dataRitiro) }, dataConsegna: { $gte: new Date(dataConsegna) } }]
      })
      .toArray()
      .then(function (prenotazione) {
        if (prenotazione) {
          resolve(prenotazione)
        } else {
          reject("Prenotazione non trovata")
        }
      })
      .catch(function (error) {
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
      })
  })
}

Prenotazione.ModificaPrenotazione = function (data) {
  return new Promise(async function (resolve, reject) {
    let dataRitiro = data.dataOraRitiro
    let dataConsegna = data.dataOraConsegna
    console.log(data.dataRitiro, data.dataConsegna, data.parcheggioConsegna, data.id)
    let response = await prenotazioniCollection.updateOne({ _id: new mongodb.ObjectID(data.id) }, { $set: { dataRitiro: new Date(dataRitiro), dataConsegna: new Date(dataConsegna), parcheggioConsegna: data.parcheggioConsegna, ritardo: data.ritardo } })

    if (response) {
      resolve("Prenotazione aggiornata con successo!")
    } else {
      reject("C'è stato un problema...")
    }
  })
}

Prenotazione.cambiaPrenotazioneAutista = function (data) {
  return new Promise(async function (resolve, reject) {
    let response = await prenotazioniCollection.updateOne({ _id: new mongodb.ObjectID(data.idPrenotazione) }, { $set: { idAutista: data.idAutista } })

    if (response) {
      resolve("Prenotazione aggiornata con successo!")
    } else {
      reject("C'è stato un problema...")
    }
  })
}
Prenotazione.getPrenotazioniByStato = function (data) {
  return new Promise(function (resolve, reject) {
    prenotazioniCollection
      .find({
        idCliente: data.id,
        stato: data.stato
      })
      .toArray()
      .then(function (prenotazioni) {
        if (prenotazioni) {
          resolve(prenotazioni)
        } else {
          reject("Prenotazioni non trovate")
        }
      })
      .catch(function (e) {
        reject("Errore")
      })
  })
}

Prenotazione.iniziaCorsa = function (id) {
  return new Promise(function (resolve, reject) {
    const stato = "In Corso"
    prenotazioniCollection
      .updateOne({ _id: new mongodb.ObjectID(id) }, { $set: { stato: stato } })
      .then(function (response) {
        if (response) {
          resolve("Stato aggiornato con successo!")
        } else {
          reject("C'è stato un problema...")
        }
      })
      .catch(function (e) {
        reject("Errore")
      })
  })
}
Prenotazione.fineCorsa = function (id) {
  return new Promise(function (resolve, reject) {
    const stato = "Conclusa"
    prenotazioniCollection
      .updateOne({ _id: new mongodb.ObjectID(id) }, { $set: { stato: stato } })
      .then(function (response) {
        if (response) {
          resolve("Stato aggiornato con successo!")
        } else {
          reject("C'è stato un problema...")
        }
      })
      .catch(function (e) {
        reject("Errore")
      })
  })
}
Prenotazione.aggiungiDannoMezzo = function (data) {
  return new Promise(function (resolve, reject) {
    prenotazioniCollection
      .updateOne({ _id: new mongodb.ObjectID(data.id) }, { $set: { danniVeicolo: data.dannoMezzo } })
      .then(function (response) {
        if (response) {
          resolve("Prenotazione aggiornata con successo!")
        } else {
          reject("C'è stato un problema...")
        }
      })
      .catch(function (e) {
        reject("Errore")
      })
  })
}

Prenotazione.ricercaPrenotazione = function (data) {
  return new Promise(async function (resolve, reject) {
    let idPrenotazione1 = Number(data.prenotazione)
    let cognomeUtente1 = data.cognome
    let dataPrenotazione1 = new Date(data.data).toLocaleDateString()

    if (data.data === undefined && cognomeUtente1 === undefined && data.prenotazione === undefined) {
      reject("Inserire parametri per la ricerca")
    }

    if (data.data == undefined || data.data == " ") {
      dataPrenotazione1 = { $exists: true }
    }
    if (data.prenotazione == undefined || data.prenotazione == " ") {
      idPrenotazione1 = { $exists: true }
    }
    if (cognomeUtente1 == undefined || cognomeUtente1 == " ") {
      cognomeUtente1 = { $exists: true }
    }

    await prenotazioniCollection
      .find({ cognomeCliente: cognomeUtente1, idPrenotazione: idPrenotazione1, dataPrenotazione: dataPrenotazione1 })
      .toArray()
      .then(function (prenotazioni) {
        if (prenotazioni.length > 0) {
          resolve(prenotazioni)
        } else {
          reject("Prenotazioni non trovate")
        }
      })
      .catch(function (e) {
        reject("Errore")
      })
  })
}
Prenotazione.getPrenotazioniAutista = function (id) {
  return new Promise(async function (resolve, reject) {
    await prenotazioniCollection
      .find({ idAutista: id, stato: { $ne: "Conclusa" } })
      .toArray()
      .then(function (prenotazioni) {
        if (prenotazioni) {
          resolve(prenotazioni)
        } else {
          reject("Prenotazioni non trovate")
        }
      })
      .catch(function (e) {
        reject("Errore")
      })
  })
}

Prenotazione.accettaCorsa = function (id) {
  return new Promise(async function (resolve, reject) {
    await prenotazioniCollection
      .updateOne({ _id: new mongodb.ObjectID(id) }, { $set: { accettata: true } })
      .then(function (response) {
        if (response) {
          resolve("Prenotazione aggiornata con successo!")
        } else {
          reject("C'è stato un problema...")
        }
      })
      .catch(function (e) {
        reject("Errore")
      })
  })
}
Prenotazione.modificaPrenotazioneImprevisti = function (data) {
  return new Promise(async function (resolve, reject) {
    await prenotazioniCollection
      .updateOne({ idPrenotazione: data.idPrenotazione }, { $set: { identificativoMezzo: data.identificativo, targa: data.targa, idMezzo: data.idMezzo, tipologia: data.tipologia, modello: data.modello, imgMezzo: data.img } })
      .then(function (response) {
        if (response) {
          resolve("Prenotazione aggiornata con successo!")
        } else {
          reject("C'è stato un problema...")
        }
      })
      .catch(function (e) {
        reject("Errore")
      })
  })
}

Prenotazione.getPrenotazioniByParcheggio = function (data) {
  return new Promise(async function (resolve, reject) {
    await prenotazioniCollection
      .find({ ParcheggioRitiro: data.parcheggioRitiro, stato: data.stato })
      .toArray()
      .then(function (prenotazioni) {
        if (prenotazioni) {
          resolve(prenotazioni)
        } else {
          reject("Prenotazioni non trovate")
        }
      })
      .catch(function (e) {
        reject("Errore")
      })
  })
}
Prenotazione.getPrenotazioniByParcheggioConsegna = function (data) {
  return new Promise(async function (resolve, reject) {
    await prenotazioniCollection
      .find({ parcheggioConsegna: data.parcheggioConsegna, stato: data.stato })
      .toArray()
      .then(function (prenotazioni) {
        if (prenotazioni) {
          resolve(prenotazioni)
        } else {
          reject("Prenotazioni non trovate")
        }
      })
      .catch(function (e) {
        reject("Errore")
      })
  })
}

Prenotazione.getPrenotazioniAutistaByStato = function (data) {
  return new Promise(function (resolve, reject) {
    prenotazioniCollection
      .find({
        idAutista: data.id,
        stato: data.stato
      })
      .toArray()
      .then(function (prenotazioni) {
        if (prenotazioni) {
          resolve(prenotazioni)
        } else {
          reject("Prenotazioni non trovate")
        }
      })
      .catch(function (e) {
        reject("Errore")
      })
  })
}
Prenotazione.checkRimozioneMezzo = function (data) {
  return new Promise(function (resolve, reject) {
    

    prenotazioniCollection
      .find({
        $and: [
          {
            stato : {$ne:"In Corso"}
          },
          {
            idMezzo: data.Id
          }
          
          
        ]
      })
      .toArray()
      .then(function (prenotazioni) {
        if (prenotazioni.length > 0) {
          resolve(true)
        } else {
          resolve(false)
        }
      })
      .catch(function (e) {
        reject("Errore")
      })
  })
}

module.exports = Prenotazione
