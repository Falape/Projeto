var express = require('express');
var router = express.Router();
const Comments = require('../controllers/comments')
const Recurso = require('../controllers/recurso')
const User = require('../controllers/user')


// ver todo tipo de publicações, apenas admin
router.get('/', function (req, res, next) {
  if (req.level == 'admin') {
    Recurso.getAll()
      .then(dados => res.status(200).jsonp(dados))
      .catch(e => res.status(501).jsonp({ error: e }))
  } else {
    res.status(401).jsonp({ error: "Não tem premissões premissões, falar com o Admin" })
  }
});

router.get('/Deleted', function (req, res, next) {
  if (req.level == 'admin') {
    Recurso.getAllDeleted()
      .then(dados => res.status(200).jsonp(dados))
      .catch(e => res.status(501).jsonp({ error: e }))
  } else {
    res.status(401).jsonp({ error: "Não tem premissões premissões, falar com o Admin" })
  }
});

router.get('/noDeleted', function (req, res, next) {
  if (req.level == 'admin') {
    Recurso.getAllNoDeleted()
      .then(dados => res.status(200).jsonp(dados))
      .catch(e => res.status(501).jsonp({ error: e }))
  } else {
    res.status(401).jsonp({ error: "Não tem premissões premissões, falar com o Admin" })
  }
});

//recursos públicos
router.get('/public', function (req, res, next) {
  console.log(req.query)
  if (req.query['q'] != undefined && req.query['tipo'] != undefined) { //com filtro para o nome e titulo
    Recurso.getAllPublicWithNameAndTipo(req.query['tipo'], req.query['q'])
      .then(dados => res.status(200).jsonp(dados))
      .catch(e => res.status(501).jsonp({ error: e }))
  } else
    if (req.query['q'] != undefined) { //com filtro para o titulo
      Recurso.getAllPublicWithName(req.query['q'])
        .then(dados => res.status(200).jsonp(dados))
        .catch(e => res.status(501).jsonp({ error: e }))
    } else
      if (req.query['tipo'] != undefined) { //com filtro para tipo
        Recurso.getAllPublicWithTipo(req.query['tipo'])
          .then(dados => res.status(200).jsonp(dados))
          .catch(e => res.status(501).jsonp({ error: e }))
      } else
        Recurso.getAllPublic()
          .then(dados => res.status(200).jsonp(dados))
          .catch(e => res.status(501).jsonp({ error: e }))
});


//recursos publicados pelos a seguir
router.get('/following', function (req, res, next) {
  console.log(req.query)
  if (req.query['q'] != undefined && req.query['tipo'] != undefined) { //com filtro para o nome e titulo
    User.getFollowing(req.user._id)
      .then(dados =>
        Recurso.getAllFollowWithNameAndTipo(dados, req.query['tipo'], req.query['q'])
          .then(dadosRec => res.status(200).jsonp(dadosRec))
          .catch(e => res.status(501).jsonp({ error: e })))
      .catch(e => res.status(502).jsonp({ error: e }))
  } else
    if (req.query['q'] != undefined) { //com filtro para o titulo
      User.getFollowing(req.user._id)
        .then(dados =>
          Recurso.getAllPublicWithName(dados,req.query['q'])
            .then(dadosRec => res.status(200).jsonp(dadosRec))
            .catch(e => res.status(501).jsonp({ error: e })))
        .catch(e => res.status(502).jsonp({ error: e }))
    } else
      if (req.query['tipo'] != undefined) { //com filtro para tipo
        User.getFollowing(req.user._id)
          .then(dados =>
            Recurso.getAllPublicWithTipo(dados,req.query['tipo'])
              .then(dadosRec => res.status(200).jsonp(dadosRec))
              .catch(e => res.status(501).jsonp({ error: e })))
          .catch(e => res.status(502).jsonp({ error: e }))
      } else
        User.getFollowing(req.user._id)
          .then(dados =>
            Recurso.getAllFollow(dados)
              .then(dadosRec => res.status(200).jsonp(dadosRec))
              .catch(e => res.status(501).jsonp({ error: e })))
          .catch(e => res.status(502).jsonp({ error: e }))

});




module.exports = router;
