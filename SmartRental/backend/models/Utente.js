const bcrypt = require("bcryptjs")
const usersCollection = require("../db").db().collection("utenti")
const validator = require("validator")
const md5 = require("md5")
const mongodb = require("mongodb")
const codiceFiscaleUtils = require("@marketto/codice-fiscale-utils")
var passwordValidator = require("password-validator")
const isValidBirthdate = require("is-valid-birthdate")

let Utente = function (data) {
  this.data = data
  this.errors = []
}

Utente.prototype.cleanUp = function () {
  // VERIFICA DEI TIPI
  if (typeof this.data.nome != "string") {
    this.data.nome = ""
  }
  if (typeof this.data.cognome != "string") {
    this.data.cognome = ""
  }

  if (typeof this.data.indirizzo != "string") {
    this.data.indirizzo = ""
  }
  if (typeof this.data.luogoNascita != "string") {
    this.data.luogoNascita = ""
  }
  if (typeof this.data.cf != "string") {
    this.data.cf = ""
  }
  if (typeof this.data.idPatente != "string") {
    this.data.idPatente = ""
  }
  if (typeof this.data.email != "string") {
    this.data.email = ""
  }
  if (typeof this.data.password != "string") {
    this.data.password = ""
  }
  if (typeof this.data.confermaPassword != "string") {
    this.data.confermaPassword = ""
  }
  if (typeof this.data.cellulare != "string") {
    this.data.cellulare = ""
  }
  if (this.data.categoriaPatente === null || this.data.categoriaPatente === undefined) {
    this.data.categoriaPatente = "nessuna"
  }

  // DATi DELL'UTENTE
  this.data = {
    ruolo: this.data.ruolo,
    nome: this.data.nome.trim(),
    cognome: this.data.cognome.trim(),
    sesso: this.data.sesso,
    dataNascita: new Date(this.data.dataNascita),
    indirizzo: this.data.indirizzo.trim(),
    luogoNascita: this.data.luogoNascita.trim(),
    cf: this.data.cf.trim(),
    idPatente: this.data.idPatente,
    scadenzaPatente: new Date(this.data.scadenzaPatente),
    categoriaPatente: this.data.categoriaPatente,
    cellulare: this.data.cellulare,
    email: this.data.email.trim().toLowerCase(),
    password: this.data.password
  }
}

Utente.prototype.validate = function () {
  const { Validator } = codiceFiscaleUtils

  // SETTAGGI PASSWORD CHECK
  var schema = new passwordValidator()
  schema
    .is()
    .min(8) // Minimum length 8
    .is()
    .max(30) // Maximum length 30
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .symbols(1) // Must have at least one symbol
    .has()
    .digits(2) // Must have digits

  return new Promise(async (resolve, reject) => {
    // CONTROLLI NOME
    if (this.data.nome == "") {
      this.errors.push("Inserisci un Nome.")
    }
    if (this.data.nome != "" && !validator.isAlphanumeric(this.data.nome)) {
      this.errors.push("Il Nome può contenere solo caratteri.")
    }
    if (this.data.nome.length > 0 && this.data.nome.length < 3) {
      this.errors.push("Il Nome deve avere almeno 3 caratteri.")
    }
    if (this.data.nome.length > 30) {
      this.errors.push("Il Nome non può avere più 30 caratteri.")
    }
    // CONTROLLI COGNOME
    if (this.data.cognome == "") {
      this.errors.push("Inserisci un Cognome.")
    }
    if (this.data.cognome != "" && !validator.isAlphanumeric(this.data.cognome)) {
      this.errors.push("Il Cognome può contenere solo caratteri.")
    }

    if (this.data.cognome.length > 0 && this.data.cognome.length < 3) {
      this.errors.push("Il Cognome deve avere almeno 3 caratteri.")
    }
    if (this.data.cognome.length > 30) {
      this.errors.push("Il Cognome non può avere più 30 caratteri.")
    }

    // CONTROLLI LUOGO DI NASCITA
    if (this.data.luogoNascita == "") {
      this.errors.push("Inserisci un Luogo di nascita.")
    }
    if (!validator.isAlphanumeric(this.data.luogoNascita)) {
      this.errors.push("Il Luogo di nascita può contenere solo caratteri.")
    }

    // CONTROLLI DATA DI NASCITA

    if (this.data.dataNascita != "" && !validator.isDate(this.data.dataNascita)) {
      this.errors.push("Inserisci una Data di nascita valida.")
    }

    if (this.data.dataNascita != "" && validator.isDate(new Date(this.data.dataNascita)) && !isValidBirthdate(new Date(this.data.dataNascita), { minAge: 16 })) {
      this.errors.push("Per registrati devi avere almeno 14 anni")
    }

    // CONTROLLI INDIRIZZO DI RESIDENZA
    if (this.data.indirizzo == "") {
      this.errors.push("Inserisci un Indirizzo di residenza.")
    }

    // CONTROLLI CODICE FISCALE
    if (this.data.cf == "") {
      this.errors.push("Inserici un Codice fiscale.")
    }

    if (this.data.cf != "" && this.data.cf.length != 16) {
      this.errors.push("Inserisci un Codice fiscale di 16 caratteri.")
    }

    if (this.data.cf != "" && !validator.isAlphanumeric(this.data.luogoNascita)) {
      this.errors.push("Inserisci un Codice fiscale alfanumerico.")
    }

    if ((this.data.cf != "" && !Validator.codiceFiscale(this.data.cf).matchLastName(this.data.cognome)) || (this.data.cf != "" && !Validator.codiceFiscale(this.data.cf).matchFirstName(this.data.nome)) || (this.data.cf != "" && !Validator.codiceFiscale(this.data.cf).matchBirthDate(new Date(this.data.dataNascita))) || (this.data.cf != "" && !Validator.codiceFiscale(this.data.cf).matchBirthPlace(this.data.luogoNascita)) || (this.data.cf != "" && !Validator.codiceFiscale(this.data.cf).matchGender(this.data.sesso))) {
      this.errors.push("Inserisci un Codice fiscale valido.")
    }

    // CONTROLLI EMAIL
    if (this.data.email == "") {
      this.errors.push("Inserisci un'Email.")
    }

    if (this.data.email != "" && !validator.isEmail(this.data.email)) {
      this.errors.push("Inserisci un Email corretta.")
    }

    if (this.data.email != "" && validator.isEmail(this.data.email)) {
      // SE L'EMAIL E' VALIDA: CONTROLLA SE E' GIA' STATA UTILIZZATA
      let emailExists = await usersCollection.findOne({ email: this.data.email })
      if (emailExists) {
        this.errors.push("Account già esistente.")
      }
    }

    // CONTROLLI NUMERO DI TELEFONO
    if (this.data.cellulare == "") {
      this.errors.push("Inserisci un Numero di telefono.")
    }

    if (this.data.cellulare != "" && !validator.isMobilePhone(this.data.cellulare, "it-IT")) {
      this.errors.push("Inserisci un Numero di telefono valido.")
    }

    // CONTROLLI ID PATENTE

    if (this.data.idPatente != "") {
      if (this.data.idPatente != "" && !validator.isAlphanumeric(this.data.idPatente)) {
        this.errors.push("Inserisci un ID Patente.")
      }
    }

    // CONTROLLI PASSWORD

    if (this.data.password == "") {
      this.errors.push("Inserisci una Password.")
    }

    if (this.data.password != "" && !schema.validate(this.data.password)) {
      let error = schema.validate(this.data.password, { list: true })
      for (i = 0; i < error.length; i++) {
        switch (error[i]) {
          case "min":
            this.errors.push("La Password deve contenere almeno 8 caratteri")
            break
          case "max":
            this.errors.push("La Password può contenere al massimo 30 caratteri")
            break
          case "uppercase":
            this.errors.push("La Password deve contenere dei caratteri maiuscoli")
            break
          case "lowercase":
            this.errors.push("La Password deve contenere dei caratteri minuscoli")
            break
          case "digits":
            this.errors.push("La Password deve contenere almeno 2 numeri")
            break
          case "symbols":
            this.errors.push("La Password deve contenere almeno un carattere speciale")
            break
          default:
          // code block
        }
      }
    }

    resolve()
  })
}

Utente.prototype.registrazione = function () {
  return new Promise(async (resolve, reject) => {
    // VERIFICA LA VALIDITA' DEI DATI
    this.cleanUp()
    await this.validate()

    // SE NON  CI SONO ERRORI SALVA I DATI NEL DATABASE
    if (!this.errors.length) {
      // HASH DELLA PASSWORD DELL'UTENTE
      let salt = bcrypt.genSaltSync(10)
      this.data.password = bcrypt.hashSync(this.data.password, salt)
      // "CREATE" NEL DATABASE
      await usersCollection.insertOne(this.data)
      resolve()
    } else {
      reject(this.errors)
    }
  })
}

Utente.prototype.login = function () {
  return new Promise((resolve, reject) => {
    this.cleanUp()

    usersCollection
      .findOne({ email: this.data.email })
      .then(attemptedUser => {
        if (attemptedUser && bcrypt.compareSync(this.data.password, attemptedUser.password)) {
          this.data = attemptedUser
          resolve("Accesso eseguito")
        } else {
          reject("Email/password non valida.")
        }
      })
      .catch(function (e) {
        reject("Per favore riprova più tardi.")
      })
  })
}

Utente.doesEmailExist = function (email) {
  return new Promise(async function (resolve, reject) {
    if (typeof email != "string") {
      resolve(false)
      return
    }

    let utente = await usersCollection.findOne({ email: email })
    if (utente) {
      resolve(true)
    } else {
      resolve(false)
    }
  })
}

Utente.findByPrenotazione = async function (idAutista) {
  return new Promise(function (resolve, reject) {
    usersCollection
      .find({ _id: { $nin: idAutista }, ruolo: "autista" })
      .toArray()
      .then(function (autista) {
        console.log(autista)

        if (autista) {
          resolve(autista)
        } else {
          reject("autista non trovati")
        }
      })
      .catch(function (e) {
        reject("Errore")
      })
  })
}

Utente.cambiaAutista = async function (id) {
  return new Promise(function (resolve, reject) {
    usersCollection
      .find({ _id: { $ne: new mongodb.ObjectID(id) }, ruolo: "autista" })
      .toArray()
      .then(function (autista) {
        console.log(autista)

        if (autista) {
          resolve(autista)
        } else {
          reject("autista non trovati")
        }
      })
      .catch(function (e) {
        reject("Prova")
      })
  })
}

Utente.doesPasswordExist = function (data) {
  return new Promise(async function (resolve, reject) {
    let utente = await usersCollection.findOne({ _id: new mongodb.ObjectID(data.parametri.id) })

    if (bcrypt.compareSync(data.parametri.oldPassword, utente.password)) {
      resolve(true)
    } else {
      resolve(false)
    }
  })
}

Utente.changePassword = function (data) {
  return new Promise(async (resolve, reject) => {
    let salt = bcrypt.genSaltSync(10)
    let passwordCryp = bcrypt.hashSync(data.parametri.newPassword, salt)
    let response = await usersCollection.updateOne({ _id: new mongodb.ObjectID(data.parametri.id) }, { $set: { password: passwordCryp } })
    if (response) {
      resolve("Password cambiata correttamente!")
    } else {
      reject("C'è stato un problema")
    }
  })
}

Utente.getDipendente = function (data) {
  return new Promise(function (resolve, reject) {
    let ruolo1 = data.ruoloDip
    let nome1 = data.nomeDip
    let cognome1 = data.cognomeDip

    if (ruolo1 === undefined && nome1 === undefined && cognome1 === undefined) {
      reject("Inserire parametri nella ricerca")
    }

    if (ruolo1 == undefined || ruolo1 == " ") {
      ruolo1 = { $exists: true }
    }
    if (nome1 == undefined || nome1 == " ") {
      nome1 = { $exists: true }
    }
    if (cognome1 == undefined || cognome1 == " ") {
      cognome1 = { $exists: true }
    }
    console.log(nome1)
    console.log(cognome1)
    console.log(ruolo1)
    try {
      usersCollection
        .find({ ruolo: ruolo1, nome: nome1, cognome: cognome1, $or: [{ ruolo: "addetto_parcheggio" }, { ruolo: "autista" }] })
        .toArray()
        .then(function (dipendenti) {
          if (dipendenti.length > 0) {
            resolve(dipendenti)
          } else {
            reject("Dipendente non trovato!")
          }
        })
        .catch(function (e) {
          reject(e)
        })
    } catch (error) {
      console.log(error)
    }
  })
}

Utente.rimuoviDipendente = function (data) {
  return new Promise(async function (resolve, reject) {
    await usersCollection
      .deleteOne({ _id: new mongodb.ObjectID(data.id) })
      .then(response => {
        if (response) {
          resolve("Dipendente eliminato con successo!")
        } else {
          reject("Errore")
        }
      })
      .catch(function (e) {
        reject("Errore")
      })
  })
}

Utente.modificaUtente = function (data) {
  return new Promise(async function (resolve, reject) {
    if (typeof data.email != "string" && data.email != null) {
      resolve("L'Email non è corretta")
      return
    }
    if (typeof data.indirizzo != "string" && data.indirizzo != null) {
      resolve("L'Indirizzo di residenza non è corretto")
      return
    }
    if (typeof data.idPatente != "string" && data.idPatente != null) {
      resolve("L'ID Patente non è corretto")
      return
    }
    if (typeof data.cellulare != "string" && data.cellulare != null) {
      resolve("Il Cellulare non è corretto")
      return
    }

    let response = await usersCollection.updateOne({ _id: new mongodb.ObjectID(data.id) }, { $set: { indirizzo: data.indirizzo, idPatente: data.idPatente, scadenzaPatente: new Date(data.scadenzaPatente), categoriaPatente: data.categoria, cellulare: data.cellulare } })

    if (response) {
      resolve("Utente aggiornato con successo!")
    } else {
      reject("C'è stato un problema...")
    }
  })
}

Utente.FindUser = function (data) {
  return new Promise(function (resolve, reject) {
    usersCollection
      .findOne({ _id: new mongodb.ObjectID(data.id) }, { password: 0 })
      .then(function (dipendente) {
        if (dipendente) {
          resolve(dipendente)
        } else {
          reject("Dipendente non trovato!")
        }
      })
      .catch(function (e) {
        reject("Errore")
      })
  })
}

Utente.checkPatente = function (data) {
  return new Promise(function (resolve, reject) {
    usersCollection
      .findOne({ _id: new mongodb.ObjectID(data.id), categoriaPatente: { $in: data.patenti } })
      .then(function (utente) {
        if (utente) {
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

Utente.findUtenteByCognome = function (cognome) {
  return new Promise(function (resolve, reject) {
    usersCollection
      .find({ cognome: cognome })
      .toArray()
      .then(function (utenti) {
        if (utenti) {
          resolve(utenti)
        } else {
          resolve("Nessun Utente Trovato")
        }
      })
      .catch(function (e) {
        reject("Errore")
      })
  })
}
module.exports = Utente
