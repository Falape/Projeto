var Comments = require('../models/comments')

//fazer agregação com os users para obter o nome 
//do user em vez do id
module.exports.GetCommentsRecurso = id => {
    return Comments
        .find({recurso:id})
        .sort({data:1})
        .exec()
}


//fazer agregação com a collection recursos para 
//que seja ordenado pelo titulo do recurso e não 
//pela data e para não aparecer o id do recurso 
//mas sim o seu nome
module.exports.GetCommentsUser = id => {
    return Comments
        .find({user:id},{recurso:1, comentario:1})
        .sort({data:1})
        .exec()
}



//não se apagam dados :) apenas não os mostramos ;)
module.exports.removeComment = id =>{
    console.log("string")
    var data = new Date()
    return Comments
        .updateOne({ _id:  id},{deleted:true, deleteDate:data.toISOString().substring(0,16)});  //mongoose.Types.ObjectId(id)
}
