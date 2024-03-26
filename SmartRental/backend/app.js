// SETTAGGIO DI EXPRESS
const express = require("express")
const app = express()

const sanitizeHTML = require("sanitize-html")
const jwt = require("jsonwebtoken")

// ABILITA RICHIESTE AD EXPRESS TRAMITE POST E JSON
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use("/", require("./router"))

const server = require("http").createServer(app)

module.exports = server
