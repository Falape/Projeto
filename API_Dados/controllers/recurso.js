var Recurso = require('../models/recurso')
var mongoose = require("mongoose");

//OBTER RECURSOS

//agregação com os users para aparecer o nome do user e não o id
module.exports.getAllPublic = () => {
    return Recurso
        .find({public:{$eq: true}})
        .sort({data:1})
        .exec()
}

//agregação com os users para aparecer o nome do user e não o id
module.exports.getAllFollow = listaUsers => {
    return Recurso
        .find({user:{$in: listaUsers}})
        .sort({data:1})
        .exec()
}


//agregação com os comentários para obter os comentários que por sua vez 
//tem de ser agregado com os users para obter os nomes dos user
//OUTRA SOLUÇÃO: fazer um pedido depois deste para obter os comentários, 
//na mesma é preciso fazer agregação com os users para obter o nome do user 
//que adicionou
module.exports.getRecurso = id => {
    return Recurso
        .find({_id:id})
        .exec()
}


//EDITAR RECURSOS
module.exports.alterarPublicoProvato = (id,estado) =>{
    console.log("string")
    return Comments
        .updateOne({ _id:  id},{public:estado});  //mongoose.Types.ObjectId(id)
}

//Alterar título
module.exports.alterarTitle = (id,titulo) =>{
    console.log("string")
    return Comments
        .updateOne({ _id:  id},{title:titulo});  //mongoose.Types.ObjectId(id)
}

//Alterar Author
module.exports.alterarAuthor = (id,author) =>{
    console.log("string")
    return Comments
        .updateOne({ _id:  id},{author:author});  //mongoose.Types.ObjectId(id)
}


//APAGAR RECURSOS

//não se apagam dados :) apenas não os mostramos ;)
module.exports.removeRecurso = (id,user) =>{
    console.log("string")
    var data = new Date()
    return Comments
        .updateOne({ _id:  id},{deleted:true, deleteDate:data.toISOString().substring(0,16), deleteUser:user});  //mongoose.Types.ObjectId(id)
}


