var mongoose = require("mongoose");

var CassificationSchema = new mongoose.Schema({
    classificacao: Number,
    numClassif: Number,
    usersQclassific: [],
    recurso: String
});

module.exports = mongoose.model("Classifications", CassificationSchema);