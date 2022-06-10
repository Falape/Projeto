var mongoose = require("mongoose");

var RecursoSchema = new mongoose.Schema({
    _id: String,
    title: { type: String, required: true },
    author: String,
    user: { type: String, required: true },
    data: { type: String, required: true },
    public: Boolean,
    classificacao: String, //Ver melhor pois assim não dá para fazer média de resultados
    //comentarios: String,
    deleted: Boolean,
    deleteDate : String,
    deleteUser : String,
    path: { type: String, required: true }
});

module.exports = mongoose.model("Recurso", RecursoSchema);