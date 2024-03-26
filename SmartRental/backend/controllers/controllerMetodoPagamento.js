const MetodoPagamento = require("../models/MetodoPagamento")
const jwt = require("jsonwebtoken")

const tokenLasts = "365d"

exports.apiAggiungiMetodoPagamento = function (req, res) {
  let metodoPagamento = new MetodoPagamento(req.body)
  console.log(req.body)
  metodoPagamento
    .aggiungiMetodoPagamento()
    .then(() => {
      res.json({
        numeroCarta: metodoPagamento.data.numeroCarta
      })
    })
    .catch(regErrors => {
      res.status(500).send(regErrors)
    })
}

exports.apiGetMetodoPagamento = async function (req, res) {
  let metodiPagamento = await MetodoPagamento.getMetodoPagamento(req.body)
  res.json(metodiPagamento)
}

exports.apiModificaMetodoPagamento = async function (req, res) {
  let response = await MetodoPagamento.modificaMetodoPagamento(req.body)
  res.json(response)
}
exports.apiRimuoviMetodoPagamento = async function (req, res) {
  let response = await MetodoPagamento.rimuoviMetodoPagamento(req.body)
  res.json(response)
}
