var Recurso = require('../models/recurso')
var mongoose = require("mongoose");

//OBTER RECURSOS

//agregação com os users para aparecer o nome do user e não o id
//Obtem todos os recursos
module.exports.getAll = () => {
    return Recurso
        .find()
        .sort({ data: 1 })
        .exec()
}

//agregação com os users para aparecer o nome do user e não o id
//Obtem todos os recursos
module.exports.getAllDeleted = () => {
    return Recurso
        .find({ deleted: { $eq: true } })
        .sort({ data: 1 })
        .exec()
}

//agregação com os users para aparecer o nome do user e não o id
//Obtem todos os recursos
module.exports.getAllNoDeleted = () => {
    return Recurso
    .find({ deleted: { $eq: false } })
    .sort({ data: 1 })
    .exec()
}


//obtem todos os recursos que um user publicou 
module.exports.getMyRec = id => {
    return Recurso
        .find({user:id})
        .sort({ data: 1 })
        .exec()
}

module.exports.getRecFromUser = id => {
    return Recurso
        .find({user:id, deleted: { $eq: false }})
        .sort({ data: 1 })
        .exec()
}

//obtem todos os recursos publicos que um user publicou 
module.exports.getRecFromUserPublic = id => {
    return Recurso
        .find({user:id,  public: { $eq: true }, deleted: { $eq: false }})
        .sort({ data: 1 })
        .exec()
}

//agregação com os users para aparecer o nome do user e não o id
//Obtem recursos com estão como publicos
module.exports.getAllPublic = () => {
    return Recurso
        .find({ public: { $eq: true }, deleted: { $eq: false } })
        .sort({ data: 1 })
        .exec()
}


//agregação com os users para aparecer o nome do user e não o id
//Obtem recursos com estão como publicos e têm tipo
module.exports.getAllPublicWithTipo = tipo => {
    return Recurso
        .find({ public: { $eq: true }, deleted: { $eq: false }, tipo: tipo })
        .sort({ data: 1 })
        .exec()
}

//agregação com os users para aparecer o nome do user e não o id
//Obtem recursos com estão como publicos e e com determinado nome no título
module.exports.getAllPublicWithName = nome => {
    console.log('entra')
    var reg = new RegExp(nome, 'i')
    return Recurso
        .find({
            public: { $eq: true },
            deleted: { $eq: false },
            title:reg
        })
        .sort({ data: 1 })
        .exec()
}

module.exports.getAllPublicWithNameAndTipo = (tipo, nome) => {
    return Recurso
        .find({
            public: { $eq: true },
            deleted: { $eq: false },
            title: { $regex: nome, $options: i },
            tipo: tipo
        })
        .sort({ data: 1 })
        .exec()
}

//agregação com os users para aparecer o nome do user e não o id
//Obtem recursos apenas dos Users que segue(tenho de lhe dar a lista)
module.exports.getAllFollow = listaUsers => {
    return Recurso
        .find({ user: { $in: listaUsers }, deleted: { $eq: false } })
        .sort({ data: 1 })
        .exec()
}
//agregação com os users para aparecer o nome do user e não o id
//Obtem recursos apenas dos Users que segue(tenho de lhe dar a lista) e com determinado tipo
module.exports.getAllFollowWithTipo = (listaUsers, tipo) => {
    return Recurso
        .find({ user: { $in: listaUsers }, deleted: { $eq: false }, tipo: tipo })
        .sort({ data: 1 })
        .exec()
}

//agregação com os users para aparecer o nome do user e não o id
//Obtem recursos apenas dos Users que segue(tenho de lhe dar a lista) e com determinado nome no título
module.exports.getAllFollowWithName = (listaUsers, nome) => {
    return Recurso
        .find({
            user: { $in: listaUsers },
            deleted: { $eq: false },
            title: { $regex: nome, $options: i }
        })
        .sort({ data: 1 })
        .exec()
}

//agregação com os users para aparecer o nome do user e não o id
//Obtem recursos apenas dos Users que segue(tenho de lhe dar a lista) e com determinado nome no título
module.exports.getAllFollowWithNameAndTipo = (listaUsers, tipo, nome) => {
    return Recurso
        .find({
            user: { $in: listaUsers },
            deleted: { $eq: false },
            title: { $regex: nome, $options: i },
            tipo: tipo
        })
        .sort({ data: 1 })
        .exec()
}

//recursos pelo seu tipo

//agregação com os comentários para obter os comentários que por sua vez 
//tem de ser agregado com os users para obter os nomes dos user
//OUTRA SOLUÇÃO: fazer um pedido depois deste para obter os comentários, 
//na mesma é preciso fazer agregação com os users para obter o nome do user 
//que adicionou
module.exports.getRecursoAgr = id => {
    return Recurso
        .find({ _id: id })
        .exec()
}

//recurso em bruto, como está com ids
module.exports.getRecurso = id => {
    return Recurso
        .find({ _id: id })
        .exec()
}

//EDITAR RECURSOS
module.exports.alterarPublicoPrivato = (id, estado) => {
    return Recurso
        .updateOne({ _id: id, deleted: { $eq: false }}, { public: estado });  //mongoose.Types.ObjectId(id)
}

//Alterar título
module.exports.alterarTitle = (id, titulo) => {
    return Recurso
        .updateOne({ _id: id, deleted: { $eq: false } }, { title: titulo });  //mongoose.Types.ObjectId(id)
}

//Alterar Author
module.exports.alterarAuthor = (id, author) => {
    return Recurso
        .updateOne({ _id: id, deleted: { $eq: false } }, { author: author });  //mongoose.Types.ObjectId(id)
}

//ADICIONAR RECURSOS
module.exports.inserir = recurso => {
    console.log("aqui")
    var data = new Date()
    recurso.data = data.toISOString().substring(0, 16)
    recurso.deleted=false
    var newRecurso = new Recurso(recurso)
    console.log(newRecurso)

    return newRecurso.save()
}


//APAGAR RECURSOS

//não se apagam dados :) apenas não os mostramos ;)
module.exports.removeRecurso = (id, user) => {
    var data = new Date()
    return Recurso
        .updateOne({ _id: id }, { deleted: true, deleteDate: data.toISOString().substring(0, 16), deleteUser: user });  //mongoose.Types.ObjectId(id)
}

//recupera recurso
module.exports.recuperaRecurso = (id) => {
    return Recurso
        .updateOne({ _id: id }, { deleted: false, deleteDate: '', deleteUser: '' });  //mongoose.Types.ObjectId(id)
}
