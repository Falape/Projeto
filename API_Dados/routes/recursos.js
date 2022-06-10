var express = require('express');
var router = express.Router();
const Comments = require('../controllers/comments')
const Recurso = require('../controllers/recurso')
const User = require('../controllers/user')

//funciona
// ver todo tipo de publicações, apenas admin
router.get('/', function (req, res, next) {
  if (req.user.level == 'admin') {
    Recurso.getAll()
      .then(dados => res.status(200).jsonp(dados))
      .catch(e => res.status(501).jsonp({ error: e }))
  } else {
    res.status(401).jsonp({ error: "Não tem premissões premissões, falar com o Admin" })
  }
});

router.post('/', function(req, res) {
  console.log("entra no post com o res: ");
  console.log(req.body)
  Recurso.inserir(req.body)
    .then(dados => {
      res.status(201).jsonp(dados);
      console.log("saiu")//req.body)
    })
    .catch( e => {
      res.status(501).jsonp({erro:"erro :("})
    })
  //res.render('index', { title: 'Express' });
});

router.get('/Deleted', function (req, res, next) {
  if (req.user.level == 'admin') {
    Recurso.getAllDeleted()
      .then(dados => res.status(200).jsonp(dados))
      .catch(e => res.status(501).jsonp({ error: e }))
  } else {
    res.status(401).jsonp({ error: "Não tem premissões premissões, falar com o Admin" })
  }
});


router.get('/noDeleted', function (req, res, next) {
  if (req.user.level == 'admin') {
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
  if (req.query['titulo'] != undefined && req.query['tipo'] != undefined) { //com filtro para o nome e titulo
    Recurso.getAllPublicWithNameAndTipo(req.query['tipo'], req.query['titulo'])
      .then(dados => res.status(200).jsonp(dados))
      .catch(e => res.status(501).jsonp({ error: e }))
  } else
    if (req.query['titulo'] != undefined) { //com filtro para o titulo
      console.log("filtro titulo ", req.query['titulo'])
      Recurso.getAllPublicWithName(req.query['titulo'])
        .then(dados => res.status(200).jsonp(dados))
        .catch(e => res.status(501).jsonp({ error: e }))
    } else
      if (req.query['tipo'] != undefined) { //com filtro para tipo
        console.log("sem filtros")
        Recurso.getAllPublicWithTipo(req.query['tipo'])
          .then(dados => res.status(200).jsonp(dados))
          .catch(e => res.status(501).jsonp({ error: e }))
      } else{
        console.log("sem filtros")
        Recurso.getAllPublic()
          .then(dados => res.status(200).jsonp(dados))
          .catch(e => res.status(501).jsonp({ error: e }))}
});


//recursos publicados pelos a seguir
router.get('/following', function (req, res, next) {
  console.log(req.query)
  if (req.query['titulo'] != undefined && req.query['tipo'] != undefined) { //com filtro para o nome e titulo
    User.getFollowing(req.user._id)
      .then(dados =>
        Recurso.getAllFollowWithNameAndTipo(dados, req.query['tipo'], req.query['titulo'])
          .then(dadosRec => res.status(200).jsonp(dadosRec))
          .catch(e => res.status(501).jsonp({ error: e })))
      .catch(e => res.status(502).jsonp({ error: e }))
  } else
    if (req.query['titulo'] != undefined) { //com filtro para o titulo
      User.getFollowing(req.user._id)
        .then(dados =>
          Recurso.getAllPublicWithName(dados, req.query['titulo'])
            .then(dadosRec => res.status(200).jsonp(dadosRec))
            .catch(e => res.status(501).jsonp({ error: e })))
        .catch(e => res.status(502).jsonp({ error: e }))
    } else
      if (req.query['tipo'] != undefined) { //com filtro para tipo
        User.getFollowing(req.user._id)
          .then(dados =>
            Recurso.getAllPublicWithTipo(dados, req.query['tipo'])
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

//vai depender um pouco de como vai estar no html
router.post('/alteraEstado/:id', function (req, res, next) {
  console.log(req.params.id)
  Recurso.getRecurso(req.params.id)
    .then(dados => {
      if (dados.user == req.user._id || req.user.level == 'admin') {
        Recurso.alterarPublicoPrivato(req.params.id, req.body.estado)
          .then(dados => res.status(200).jsonp(dados))
          .catch(e => res.status(501).jsonp({ error: e }))
      } else
        res.status(401).jsonp({ error: "Não tem premissões premissões, falar com o Admin" })
    })
    .catch(e => res.status(501).jsonp({ error: e }))
});

router.post('/alteraTitulo/:id', function (req, res, next) {
  console.log(req.params.id)
  console.log(req.body.title)
  console.log(req.body)
  Recurso.getRecurso(req.params.id)
    .then(dados => {
      if (dados.user == req.user._id || req.user.level == 'admin') {
        Recurso.alterarTitle(req.params.id, req.body.title)
          .then(dados => res.status(200).jsonp(dados))
          .catch(e => res.status(501).jsonp({ error: e }))
      } else
        res.status(401).jsonp({ error: "Não tem premissões premissões, falar com o Admin" })
    })
    .catch(e => res.status(501).jsonp({ error: e }))
})

router.post('/alteraAuthor/:id', function (req, res, next) {
  console.log(req.params.id)
  console.log(req.body.author)
  Recurso.getRecurso(req.params.id)
    .then(dados => {
      if (dados.user == req.user._id || req.user.level == 'admin') {
        Recurso.alterarAuthor(req.params.id, req.body.author)
          .then(dados => res.status(200).jsonp(dados))
          .catch(e => res.status(501).jsonp({ error: e }))
      } else
        res.status(401).jsonp({ error: "Não tem premissões premissões, falar com o Admin" })
    })
    .catch(e => res.status(501).jsonp({ error: e }))
});

router.get('/remove/:id', function (req, res, next) {
  console.log(req.params.id)
  Recurso.getRecurso(req.params.id)
    .then(dados => {
      if (dados.user == req.user._id || req.user.level == 'admin') {
        Recurso.removeRecurso(req.params.id, req.user._id)
          .then(dados => res.status(200).jsonp(dados))
          .catch(e => res.status(501).jsonp({ error: e }))
      } else
        res.status(401).jsonp({ error: "Não tem premissões premissões, falar com o Admin" })
    })
    .catch(e => res.status(501).jsonp({ error: e }))
});

router.get('/:id', function (req, res, next) {
  console.log(req.params.id)
  Recurso.getRecursoAgr(req.params.id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(501).jsonp({ error: e }))
});


module.exports = router;
