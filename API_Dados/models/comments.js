var mongoose = require("mongoose");

var CommentsSchema = new mongoose.Schema({
    recurso: String,
    user: String,
    data: String,
    deleted: Boolean,
    deleteDate : String,
    //Editar comentários
    comentario: String
});

module.exports = mongoose.model("Comments", CommentsSchema);