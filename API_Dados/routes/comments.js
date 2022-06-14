var express = require('express');
var router = express.Router();
const Comments = require('../controllers/comments')
const Recurso = require('../controllers/recurso')
const User = require('../controllers/user')

//Fazer um commentário
//Tenho de pensar melhor, o id do recusro pode ir no body(Melhor)
//para bullet proof verificar se o userID do token é o mesmo que vai 
//no body
router.post('/:id', function (req, res) {
    console.log("entra no post com o res: ");
    req.body.user=req.user._id
    req.body.recurso=req.params.id
    console.log(req.body)
    Comments.inserir(req.body)
        .then(dados => {
            res.status(201).jsonp(dados);
            console.log("saiu")//req.body)
        })
        .catch(e => {
            res.status(501).jsonp({ erro: e })
        })
});


//obtem comentários de um recurso
router.get('/recurso/:id', function (req, res) {
    console.log(req.params.id)
    if (req.user.level == 'admin') {
        Comments.GetCommentsRecursoAdmin(req.params.id)
            .then(dados => res.status(200).jsonp(dados))
            .catch(e => res.status(501).jsonp({ error: e }))

    } else {
        Comments.GetCommentsRecurso(req.params.id)
            .then(dados => res.status(200).jsonp(dados))
            .catch(e => res.status(501).jsonp({ error: e }))
    }
});


//VER peço recurso ams não preciso de pedir....
router.get('/remove/:id', function (req, res) {
    console.log(req.params.id)
    Recurso.getRecurso(req.params.id)
        .then(dados => {
            console.log(dados[0].user)
            console.log(req.user._id)
            if (dados[0].user == req.user._id || req.user.level == 'admin') {
                Recurso.removeRecurso(req.params.id, req.user._id)
                    .then(dados => res.status(200).jsonp(dados))
                    .catch(e => res.status(501).jsonp({ error: e }))
            } else
                res.status(401).jsonp({ error: "Não tem premissões premissões, falar com o Admin" })
        })
        .catch(e => res.status(501).jsonp({ error: e }))
});


//Talvez não deva recuperar comments
router.get('/recuperar/:id', function (req, res) {
    console.log(req.params.id)
    Comments.getRecurso(req.params.id)
        .then(dados => {
            console.log(dados[0].user)
            console.log(req.user._id)
            if (dados[0].deleteUser == req.user._id || req.user.level == 'admin') {
                Recurso.removeRecurso(req.params.id, req.user._id)
                    .then(dados => res.status(200).jsonp(dados))
                    .catch(e => res.status(501).jsonp({ error: e }))
            } else
                res.status(401).jsonp({ error: "Não tem premissões premissões, falar com o Admin" })
        })
        .catch(e => res.status(501).jsonp({ error: e }))
});


//procurar comment especifico
router.get('/:id', function (req, res) {
    console.log(req.params.id)
    Comments.GetComment(req.params.id)
        .then(dados => res.status(200).jsonp(dados))
        .catch(e => res.status(501).jsonp({ error: e }))
});



module.exports = router;

