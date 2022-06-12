var User = require('../models/user')
var mongoose = require("mongoose");

module.exports.getAllUsers = () => {
    return User
        .find()  //mongoose.Types.ObjectId(id)
        .exec()
}


module.exports.getUser = id => {
    return User
        .findOne({_id: id})
        .exec()
}

//Procura users que contenham o nome
module.exports.getUserByName = nome => {
    return User
        .find({username: {$regex : nome, $options: i}})
        .exec()
}

//Procura users com o livel
module.exports.getUserBylvl = lvl => {
    return User
        .find({level: lvl})
        .exec()
}

//Procura users que contenham o nome e o lvl
module.exports.getUserByNameAndlvl = (nome,lvl) => {
    return User
        .find({username: {$regex : nome, $options: i}, level: lvl})
        .exec()
}

//devolve seguidores
//Talvez fazer agregação para já obter o id, nome e pathImagem
module.exports.getFollowing = id => {
    return User
        .findOne({_id: id},{followers:1})
        .exec()
}

//query dificil mas valorizada
//preciso ir a todos os users ver se estão a dar follow no id dado
module.exports.getFollwers = id => {
    return User
        .findOne({_id: id})
        .exec()
}


//EDITAR Users
module.exports.alterarImagem = (id,path) =>{
    console.log("string")
    return User
        .updateOne({ _id:  id},{image:path});
}

module.exports.alterarDescricao = (id,desc) =>{
    console.log("string")
    return User
        .updateOne({ _id:  id},{descricao:desc});  
}

module.exports.alterarLevel = (id,lvl) =>{
    console.log("string")
    return User
        .updateOne({ _id:  id},{level:lvl}); 
}

//adiciona um follower ao user
module.exports.addFollower = (id,follower) =>{
    console.log("string")
    return User
        .updateOne({ _id:  id},{ $addToSet: {followers: follower}}); 
}

//update fulll list of followers FAZER
module.exports.unFollower = (id,followers) =>{
    console.log("string")
    console.log(followers)
    return User
        .updateOne({ _id:  id},{followers: followers}); 
}


//Remover Users
//remove remove ou manter?
module.exports.removeUser = id =>{
    return User
        .deleteOne({ _id:  id});
}