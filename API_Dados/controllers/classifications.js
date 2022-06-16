var Classificacao = require('../models/classifications')
var mongoose = require("mongoose");

//Obter classificacao

module.exports.getClassificacao = id => {
    return Classificacao
        .find({recurso:id},{classificacao:1})
        .exec()
}

module.exports.getClassificacao = id => {
    return Classificacao
        .find({recurso:id})
        .exec()
}