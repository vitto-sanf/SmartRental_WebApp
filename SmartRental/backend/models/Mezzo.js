const mezziCollection = require("../db").db().collection("mezzi")
const validator = require("validator")
const md5 = require("md5")
const mongodb = require("mongodb")

let Mezzo = function (data) {
  this.data = data
  this.errors = []
}

Mezzo.prototype.cleanUp = function () {
  // VERIFICA DEI TIPI
  if (typeof this.data.cilindrata != "string") {
    this.data.cilindrata = ""
  }
  if (typeof this.data.targa != "string") {
    this.data.targa = ""
  }
  if (typeof this.data.modello != "string") {
    this.data.modello = ""
  }
  if (typeof this.data.identificativo != "string") {
    this.data.luogoNascita = ""
  }
  if (typeof this.data.numeroPosti != "string") {
    this.data.numeroPosti = ""
  }
  if (typeof this.data.trasmissione != "string") {
    this.data.trasmissione = ""
  }
  if (typeof this.data.carburante != "string") {
    this.data.carburante = ""
  }
  if (typeof this.data.descrizione != "string") {
    this.data.descrizione = ""
  }
  if (typeof this.data.tariffaOraria != "string") {
    this.data.tariffaOraria = ""
  }
  if (typeof this.data.tariffaGiornaliera != "string") {
    this.data.tariffaGiornaliera = ""
  }
  var patenti = []

  if (this.data.patenti == "B") {
    patenti.push("B")
  } else if (this.data.patenti == "A3") {
    patenti.push("A3")
  } else if (this.data.patenti == "A2") {
    patenti.push("A3", "A2")
  } else if (this.data.patenti == "A1") {
    patenti.push("B", "A3", "A2", "A1")
  } else if (this.data.patenti == "Am") {
    patenti.push("B", "A3", "A2", "A1", "Am")
  } else if (this.data.patenti === null || this.data.patenti === undefined) {
    patenti.push("B", "A3", "A2", "A1", "Am", "nessuna")
  }

  console.log("Patenti", patenti)
  // DATI Mezzo
  this.data = {
    tipoMezzo: this.data.tipoMezzo,
    categoria: this.data.categoria,
    cilindrata: this.data.cilindrata,
    targa: this.data.targa.trim(),
    modello: this.data.modello.trim(),
    identificativo: this.data.identificativo,
    numeroPosti: this.data.numeroPosti,
    trasmissione: this.data.trasmissione.trim(),
    carburante: this.data.carburante,
    descrizione: this.data.descrizione,
    tariffaOraria: this.data.tariffaOraria,
    tariffaGiornaliera: this.data.tariffaGiornaliera,
    parcheggio: this.data.parcheggio,
    imgName: this.data.fileName1,
    imgName1: this.data.fileName2,
    imgName2: this.data.fileName3,
    patenti: patenti,
    danneggiato: false

    /*  posizione: this.data.posizione,
    occupato:false */
  }
}

Mezzo.prototype.validate = function () {
  return new Promise(async (resolve, reject) => {
    // CONTROLLI CILINDRATA
    if (this.data.tipoMezzo == "auto" || this.data.tipomezzo == "moto") {
      if (this.data.cilindrata == "") {
        this.errors.push("Devi inserire una cilindrata.")
      }

      if (this.data.cilindrata != "" && !validator.isNumeric(this.data.cilindrata)) {
        this.errors.push("Devi inserire un numero come cilindrata.")
      }
    }

    // CONTROLLI MODELLO
    if (this.data.tipoMezzo == "auto" || this.data.tipoMezzo == "moto") {
      if (this.data.modello == "") {
        this.errors.push("Devi inserire un modello.")
      }
    }
    // CONTROLLI TARGA
    if (this.data.tipoMezzo == "auto" || this.data.tipoMezzo == "moto") {
      if (this.data.targa == "") {
        this.errors.push("Devi inserire una targa.")
      }

      if (this.data.targa != "" && !validator.isAlphanumeric(this.data.targa)) {
        this.errors.push("Il targa non puo' contenere solo caratteri.")
      }

      if (this.data.targa != "" && this.data.targa.length != 7) {
        this.errors.push("La targa non è corretta")
      }
    }

    // CONTROLLI IDENTIFICATIVO
    if (this.data.tipoMezzo == "bicicletta" || this.data.tipoMezzo == "monopattino") {
      if (this.data.identificativo == "") {
        this.errors.push("Devi inserire un identificativo.")
      }

      if (this.data.identificativo != "" && !validator.isNumeric(this.data.identificativo)) {
        this.errors.push("Devi inserire un numero come identificativo.")
      }
    }
    // CONTROLLI NUMERO POSTI
    if (this.data.tipoMezzo == "auto" || this.data.tipoMezzo == "moto") {
      if (this.data.numeroPosti == "") {
        this.errors.push("Devi inserire un numero di posti.")
      }
      if (this.data.numeroPosti != "" && !validator.isNumeric(this.data.numeroPosti)) {
        this.errors.push("Devi inserire un numero come numero di posti.")
      }
    }

    // CONTROLLI TRASMISSIONE
    if (this.data.tipoMezzo == "auto" || this.data.tipoMezzo == "moto") {
      if (this.data.trasmissione == "") {
        this.errors.push("Devi inserire una trasmissione.")
      }
    }

    // CONTROLLI CARBURANTE
    if (this.data.tipoMezzo == "auto" || this.data.tipoMezzo == "moto") {
      if (this.data.carburante == "") {
        this.errors.push("Devi inserire un carburante.")
      }
    }
    // CONTROLLI DESCRIZIONE
    if (this.data.descrizione == "") {
      this.errors.push("Devi inserire una descrizione.")
    }

    // CONTROLLI TARIFFA ORARIA
    if (this.data.tariffaOraria == "") {
      this.errors.push("Devi inserire una tariffa oraria.")
    }
    if (this.data.tariffaOraria != "" && !validator.isNumeric(this.data.tariffaOraria)) {
      this.errors.push("Devi inserire un numero come tariffa oraria.")
    }

    // CONTROLLI TARIFFA GIORNALIERA
    if (this.data.tariffaGiornaliera == "") {
      this.errors.push("Devi inserire una tariffa giornaliera.")
    }
    if (this.data.tariffaGiornaliera != "" && !validator.isNumeric(this.data.tariffaGiornaliera)) {
      this.errors.push("Devi inserire un numero come tariffa giornaliera.")
    }
    // CONTROLLI IMMAGINE
    if (this.data.imgName == "") {
      this.errors.push("Devi inserire un' immagine.")
    }

    resolve()
  })
}

Mezzo.prototype.aggiungiMezzo = function () {
  return new Promise(async (resolve, reject) => {
    // VERIFICA LA VALIDITA' DEI DATI
    this.cleanUp()
    await this.validate()

    // SE NON  CI SONO ERRORI SALVA I DATI NEL DATABASE
    if (!this.errors.length) {
      // "CREATE" NEL DATABASE
      await mezziCollection.insertOne(this.data)
      resolve()
    } else {
      reject(this.errors)
    }
  })
}

Mezzo.getMezzo = function (data) {
  return new Promise(function (resolve, reject) {
    let tipologia1 = data.tipo
    let categoria1 = data.categoriaMezzo
    let targa1 = data.targaMezzo
    let identificativo1 = data.identificativo

    if (tipologia1 == undefined && categoria1 == undefined && targa1 == undefined && identificativo1 == undefined) {
      reject("Inserire parametri per la ricerca")
    }

    if (tipologia1 == undefined || tipologia1 == " ") {
      tipologia1 = { $exists: true }
    }
    if (categoria1 == undefined || categoria1 == " ") {
      categoria1 = { $exists: true }
    }
    if (targa1 == undefined || targa1 == " ") {
      targa1 = { $exists: true }
    }
    if (identificativo1 == undefined || identificativo1 == " ") {
      identificativo1 = { $exists: true }
    }

    mezziCollection
      .find({ tipoMezzo: tipologia1, categoria: categoria1, targa: targa1, identificativo: identificativo1 })
      .toArray()
      .then(function (mezzi) {
        if (mezzi.length > 0) {
          resolve(mezzi)
        } else {
          reject("Mezzi non trovati")
        }
      })
      .catch(function (e) {
        reject("Errore")
      })
  })
}

Mezzo.rimuoviMezzo = function (data) {
  return new Promise(async function (resolve, reject) {
    await mezziCollection
      .deleteOne({ _id: new mongodb.ObjectID(data.Id) })
      .then(response => {
        if (response) {
          resolve("Mezzo eliminato con successo")
        } else {
          reject("Error")
        }
      })
      .catch(function (e) {
        reject("Errore")
      })
  })
}

Mezzo.modificaMezzo = function (data) {
  return new Promise(async function (resolve, reject) {
    if (typeof data.descrizione != "string" && data.descrizione != null) {
      resolve("L'descrizione è sbagliata")
      return
    }
    if (typeof data.tariffaOraria != "string" && data.tariffaOraria != null) {
      resolve("La tariffa oraria è sbagliata")
      return
    }
    if (typeof data.tariffaGiornaliera != "string" && data.tariffaGiornaliera != null) {
      resolve("La tariffa giornaliera è sbagliata")
      return
    }

    let response = await mezziCollection.updateOne({ _id: new mongodb.ObjectID(data.id) }, { $set: { descrizione: data.descrizione, tariffaOraria: data.tariffaOraria, tariffaGiornaliera: data.tariffaGiornaliera } })

    if (response) {
      resolve("Mezzo Aggiornato con successo")
    } else {
      reject("C'è stato un problema")
    }
  })
}

Mezzo.findByPrenotazione = async function (idMezzo, tipologia, categoria, parcheggioRitiro) {
  return new Promise(function (resolve, reject) {
    console.log(idMezzo, tipologia, categoria)
    mezziCollection
      .find({ _id: { $nin: idMezzo }, tipoMezzo: tipologia, categoria: categoria, parcheggio: parcheggioRitiro, danneggiato: { $ne: true } })
      .toArray()
      .then(function (mezzi) {
        if (mezzi) {
          resolve(mezzi)
        } else {
          reject("Mezzi non trovati")
        }
      })
      .catch(function (e) {
        reject("Errore")
      })
  })
}

Mezzo.sostituzioneMezzo = async function (data) {
  return new Promise(function (resolve, reject) {
    console.log(data)
    mezziCollection
      .find({ _id: { $ne: new mongodb.ObjectID(data.idMezzo) }, modello: data.modello, parcheggio: data.parcheggioRitiro })
      .toArray()
      .then(function (mezzi) {
        if (mezzi) {
          resolve(mezzi)
        } else {
          reject("Mezzi non trovati")
        }
      })
      .catch(function (e) {
        reject("Errore")
      })
  })
}

Mezzo.getMezzoByModello = async function (modello) {
  return new Promise(function (resolve, reject) {
    mezziCollection
      .findOne({ modello: modello })
      .then(function (mezzo) {
        if (mezzo) {
          resolve(mezzo)
        } else {
          reject("Mezzi non trovati")
        }
      })
      .catch(function (e) {
        reject("Errore")
      })
  })
}

Mezzo.dannoMezzo = function (id) {
  return new Promise(async function (resolve, reject) {
    let response = await mezziCollection.updateOne({ _id: new mongodb.ObjectID(id) }, { $set: { danneggiato: true } })

    if (response) {
      resolve("Mezzo Aggiornato con successo")
    } else {
      reject("C'è stato un problema")
    }
  })
}

Mezzo.setParcheggioMezzo = function (data) {
  return new Promise(async function (resolve, reject) {
    let response = await mezziCollection.updateOne({ _id: new mongodb.ObjectID(data.id) }, { $set: { parcheggio: data.parcheggio } })

    if (response) {
      resolve("Mezzo Aggiornato con successo")
    } else {
      reject("C'è stato un problema")
    }
  })
}

module.exports = Mezzo
