var Comments = require('../models/comments')
var mongoose = require("mongoose");


module.exports.inserir = comment => {
    console.log("aqui")
    var data = new Date()
    comment.data = data.toISOString().substring(0, 16)
    comment.deleted=false
    var newComment = new Comments(comment)
    console.log(newComment)
    return newComment.save()
}

//fazer agregação com os users para obter o nome 
//do user e manter o seu id
module.exports.GetComment = id => {
    return Comments
        .find({_id:id})
        .sort({data:1})
        .exec()
}

//fazer agregação com os users para obter o nome 
//do user e manter o seu id
module.exports.GetCommentsRecurso = id => {
    return Comments
        .find({recurso:id, deleted: { $eq: false } })
        .sort({data:1})
        .exec()
}

//fazer agregação com os users para obter o nome 
//do user e manter o seu id
module.exports.GetCommentsRecursoAdmin = id => {
    return Comments
        .find({recurso:id})
        .sort({data:1})
        .exec()
}

module.exports.GetNumberOfcommentsRecurso = id => {
    return Comments
        .find({user:id})
        .count()
        .exec()
}



//fazer agregação com os users para obter o nome 
//do user e manter o seu id
module.exports.GetCommentsRecurso = id => {
    return Comments
        .find({recurso:id, deleted: { $eq: false }})
        .sort({data:1})
        .exec()
}


//fazer agregação com a collection recursos para 
//que seja ordenado pelo titulo do recurso e não 
//pela data e para não aparecer o id do recurso 
//mas sim o seu nome
//NÃO FAZER
module.exports.GetCommentsUser = id => {
    return Comments
        .find({user:id},{recurso:1, comentario:1})
        .sort({data:1})
        .exec()
}



//não se apagam dados :) apenas não os mostramos ;)
module.exports.removeComment = (id, user) =>{
    console.log("string")
    var data = new Date()
    return Comments
        .updateOne({ _id:  id},{deleted:true, deleteDate:data.toISOString().substring(0,16), deleteUser:user}); 
}

module.exports.recuperaComment = id =>{
    console.log("string")
    return Comments
        .updateOne({ _id:  id},{deleted:false, deleteDate:'', deleteUser:''}); 
}
