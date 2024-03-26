const metodiPagamentoCollection = require("../db").db().collection("metodiPagamento")
const validator = require("validator")
const md5 = require("md5")
const mongodb = require("mongodb")

let MetodoPagamento = function (data) {
  this.data = data
  this.errors = []
}

MetodoPagamento.prototype.cleanUp = function () {
  // VERIFICA DEI TIPI
  if (typeof this.data.numeroCarta != "string") {
    this.data.numeroCarta = ""
  }
  if (typeof this.data.proprietario != "string") {
    this.data.proprietario = ""
  }
  if (typeof this.data.cvv != "string") {
    this.data.cvv = ""
  }

  // DATI MetodoPagamento
  this.data = {
    circuito: this.data.circuito,
    numeroCarta: this.data.numeroCarta.trim(),
    scadenza: new Date(this.data.selectedDate),
    proprietario: this.data.proprietario,
    cvv: this.data.cvv.trim(),
    idProprietario: this.data.idProprietario
  }
}

MetodoPagamento.prototype.validate = function () {
  return new Promise(async (resolve, reject) => {
    // CONTROLLI CIRCUITO
    if (this.data.circuito != "visa" && this.data.circuito != "mastercard") {
      this.errors.push("Devi inserire un circuito.")
    }
    // CONTROLLI NUMERO CARTA
    if (this.data.numeroCarta == "") {
      this.errors.push("Devi inserire il numero della carta.")
    }

    if (this.data.numeroCarta != "" && !validator.isNumeric(this.data.numeroCarta)) {
      this.errors.push("Il numero della carta non puo' contenere caratteri.")
    }

    if (this.data.numeroCarta != "" && this.data.numeroCarta.length != 16) {
      this.errors.push("Numero della carta non valido")
    }

    if (this.data.numeroCarta != "" && this.data.numeroCarta.length == 16) {
      // SE IL NUMERO CARTA E' VALIDO: CONTROLLA SE E' GIA' STATA UTILIZZATA
      let numeroCartaExists = await metodiPagamentoCollection.findOne({ numeroCarta: this.data.numeroCarta })
      if (numeroCartaExists) {
        this.errors.push("Numero carta già registrato.")
      }
    }

    // CONTROLLI SCADENZA
    if (new Date(this.data.scadenza).getTime() === new Date(null).getTime()) {
      this.errors.push("Devi inserire una scadenza.")
    }

    // CONTROLLI PROPRIETARIO
    if (this.data.proprietario == "") {
      this.errors.push("Devi inserire un proprietario.")
    }

    // CONTROLLI CVV
    if (this.data.cvv == "") {
      this.errors.push("Devi inserire un CVV.")
    }

    if (this.data.cvv != "" && !validator.isNumeric(this.data.cvv)) {
      this.errors.push("Il CVV non puo' contenere caratteri.")
    }

    if (this.data.cvv != "" && this.data.cvv.length != 3) {
      this.errors.push("CVV inserito non valido")
    }

    resolve()
  })
}

MetodoPagamento.prototype.aggiungiMetodoPagamento = function () {
  return new Promise(async (resolve, reject) => {
    // VERIFICA LA VALIDITA' DEI DATI
    this.cleanUp()
    await this.validate()

    // SE NON  CI SONO ERRORI SALVA I DATI NEL DATABASE
    if (!this.errors.length) {
      // "CREATE" NEL DATABASE
      await metodiPagamentoCollection.insertOne(this.data)
      resolve()
    } else {
      reject(this.errors)
    }
  })
}

MetodoPagamento.getMetodoPagamento = function (data) {
  return new Promise(async function (resolve, reject) {
    metodiPagamentoCollection
      .find({ idProprietario: data.id })
      .toArray()
      .then(function (metodiPagamento) {
        if (metodiPagamento) {
          resolve(metodiPagamento)
        } else {
          reject("Metodi di Pagamento non trovati!")
        }
      })
      .catch(function (e) {
        reject("Errore...")
      })
  })
}

MetodoPagamento.modificaMetodoPagamento = function (data) {
  return new Promise(async function (resolve, reject) {
    if (new Date(data.selectedDate).getTime() === new Date(null).getTime()) {
      resolve("La scadenza non è corretta")
      return
    }
    if (typeof data.cvv != "string" && data.cvv != null) {
      resolve("Il cvv non è corretto")
      return
    }
    let scadenza = new Date(data.selectedDate)
    let response = await metodiPagamentoCollection.updateOne({ _id: new mongodb.ObjectID(data.id) }, { $set: { scadenza: scadenza, cvv: data.cvv } })

    if (response) {
      resolve("Metodo di pagamento aggiornato con successo!")
    } else {
      reject("C'è stato un problema...")
    }
  })
}

MetodoPagamento.rimuoviMetodoPagamento = function (data) {
  return new Promise(async function (resolve, reject) {
    await metodiPagamentoCollection
      .deleteOne({ _id: new mongodb.ObjectID(data.id) })
      .then(response => {
        if (response) {
          resolve("Metodo di Pagamento eliminato con successo!")
        } else {
          reject("Errore")
        }
      })
      .catch(function (e) {
        reject("Errore")
      })
  })
}
module.exports = MetodoPagamento
