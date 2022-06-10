var User = require('../models/user')
var mongoose = require("mongoose");

module.exports.getAllUsers = () => {
    return User
        .findOne()  //mongoose.Types.ObjectId(id)
        .exec()
}


module.exports.getUser = id => {
    return User
        .findOne({_id: id})  //mongoose.Types.ObjectId(id)
        .exec()
}

module.exports.getFollowing = id => {
    return User
        .findOne({_id: id},{followers:1})  //mongoose.Types.ObjectId(id)
        .exec()
}

//query dificil mas valorizada
//preciso ir a todos os users ver se estão a dar follow no id dado
module.exports.getFollwers = id => {
    return User
        .findOne({_id: id})  //mongoose.Types.ObjectId(id)
        .exec()
}


//EDITAR Users
module.exports.alterarImagem = (id,path) =>{
    console.log("string")
    return User
        .updateOne({ _id:  id},{image:path});  //mongoose.Types.ObjectId(id)
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

//update fulll list of followers
module.exports.addFollower = (id,followers) =>{
    console.log("string")
    return User
        .updateOne({ _id:  id},{followers: followers}); 
}


//Remover Users
//remove remove ou manter?
module.exports.removeUser = id =>{
    return User
        .deleteOne({ _id:  id});  //mongoose.Types.ObjectId(id)
}