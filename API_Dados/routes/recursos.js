var express = require('express');
var router = express.Router();
const Comments = require('../controllers/comments')
const Recurso = require('../controllers/recurso')
const User = require('../controllers/user')

//funciona
//ADMIN:ver todo tipo de publicações, apenas admin
router.get('/', function (req, res) {
  if (req.user.level == 'admin') {
    Recurso.getAll()
      .then(dados => res.status(200).jsonp(dados))
      .catch(e => res.status(501).jsonp({ error: e }))
  } else {
    res.status(401).jsonp({ error: "Não tem premissões premissões, falar com o Admin" })
  }
});


//inserir um recurso
router.post('/', function (req, res) {
  console.log("entra no post com o res: ");
  console.log(req.body)

  Recurso.inserir(req.body)
    .then(dados => {
      //criar comentário já associado ao recurso
      res.status(201).jsonp(dados);
      console.log("saiu")//req.body)
    })
    .catch(e => {
      res.status(501).jsonp({ erro: e })
    })
});


//ADMIN : ver todos os recursos não apagados
router.get('/Deleted', function (req, res) {
  if (req.user.level == 'admin') {
    Recurso.getAllDeleted()
      .then(dados => res.status(200).jsonp(dados))
      .catch(e => res.status(501).jsonp({ error: e }))
  } else {
    res.status(401).jsonp({ error: "Não tem premissões premissões, falar com o Admin" })
  }
});

//ADMIN : ver todos os recursos apagados
router.get('/noDeleted', function (req, res) {
  if (req.user.level == 'admin') {
    Recurso.getAllNoDeleted()
      .then(dados => res.status(200).jsonp(dados))
      .catch(e => res.status(501).jsonp({ error: e }))
  } else {
    res.status(401).jsonp({ error: "Não tem premissões premissões, falar com o Admin" })
  }
});

//Utilizador vẽs os seu recursos
router.get('/getMyRec', function (req, res) {
  Recurso.getMyRec(req.user._id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(501).jsonp({ error: e }))
});


// ver os recursos de um user dado o seu id, se o estiver seguir pode ver publicas
// e privadas, se não estiver a seguir apenas vê as publicas
router.get('/userRecurso/:id', function (req, res) {
  User.getUser(req.user._id)
    .then(dados => {
      if (dados.followers.contains(req.params.id) || req.user.level == 'admin') {
        Recurso.getRecFromUser(req.user._id)
          .then(dados => res.status(200).jsonp(dados))
          .catch(e => res.status(501).jsonp({ error: e }))
      } else {
        Recurso.getRecFromUserPublic(req.user._id)
          .then(dados => res.status(200).jsonp(dados))
          .catch(e => res.status(501).jsonp({ error: e }))
      }

    })
    .catch(e => res.status(501).jsonp({ error: e }))
});

//recursos públicos
router.get('/public', function (req, res) {
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
      } else {
        console.log("sem filtros")
        Recurso.getAllPublic()
          .then(dados => res.status(200).jsonp(dados))
          .catch(e => res.status(501).jsonp({ error: e }))
      }
});


//recursos publicados pelos a seguir
router.get('/following', function (req, res) {
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
          .then(dados => {
            console.log(dados)
            Recurso.getAllFollow(dados.followers)
              .then(dadosRec => res.status(200).jsonp(dadosRec))
              .catch(e => res.status(501).jsonp({ error: e }))
          })
          .catch(e => res.status(502).jsonp({ error: e }))

});

//altera o estado true == public false == private, vai no body
//apenas quem criou ou o admin pode alterar
router.post('/alteraEstado/:id', function (req, res) {
  console.log(req.params.id)
  Recurso.getRecurso(req.params.id)
    .then(dados => {
      if (dados[0].user == req.user._id || req.user.level == 'admin') {
        Recurso.alterarPublicoPrivato(req.params.id, req.body.estado)
          .then(dados => res.status(200).jsonp(dados))
          .catch(e => res.status(501).jsonp({ error: e }))
      } else
        res.status(401).jsonp({ error: "Não tem premissões premissões, falar com o Admin" })
    })
    .catch(e => res.status(501).jsonp({ error: e }))
});

//alterar o Título do trabalho
//apenas quem criou ou o admin pode alterar
router.post('/alteraTitulo/:id', function (req, res) {
  console.log(req.params.id)
  console.log(req.body.title)
  console.log(req.body)
  Recurso.getRecurso(req.params.id)
    .then(dados => {
      if (dados[0].user == req.user._id || req.user.level == 'admin') {
        Recurso.alterarTitle(req.params.id, req.body.title)
          .then(dados => res.status(200).jsonp(dados))
          .catch(e => res.status(501).jsonp({ error: e }))
      } else
        res.status(401).jsonp({ error: "Não tem premissões premissões, falar com o Admin" })
    })
    .catch(e => res.status(501).jsonp({ error: e }))
})

//alterar o author
//apenas quem criou ou o admin pode alterar
router.post('/alteraAuthor/:id', function (req, res) {
  console.log(req.params.id)
  console.log(req.body.author)
  Recurso.getRecurso(req.params.id)
    .then(dados => {
      if (dados[0].user == req.user._id || req.user.level == 'admin') {
        Recurso.alterarAuthor(req.params.id, req.body.author)
          .then(dados => res.status(200).jsonp(dados))
          .catch(e => res.status(501).jsonp({ error: e }))
      } else
        res.status(401).jsonp({ error: "Não tem premissões premissões, falar com o Admin" })
    })
    .catch(e => res.status(501).jsonp({ error: e }))
});


//remove um conteudo
//apenas quem criou ou o admin o pode fazer
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


//recupera um conteúdo
//se for um user a remover este pode recuperar se for o admin apenas 
//um admin pode recuperar
router.get('/recupera/:id', function (req, res) {
  console.log(req.params.id)
  Recurso.getRecurso(req.params.id)
    .then(dados => {
      console.log(dados[0].user)
      console.log(req.user._id)
      if (dados[0].deleteUser == req.user._id || req.user.level == 'admin') {
        Recurso.recuperaRecurso(req.params.id)
          .then(dados => res.status(200).jsonp(dados))
          .catch(e => res.status(501).jsonp({ error: e }))
      } else
        res.status(401).jsonp({ error: "Não tem premissões premissões, falar com o Admin" })
    })
    .catch(e => res.status(501).jsonp({ error: e }))
});

//ADMIN pode ver um recurso pelo seu id(pode não vir a ter utilidade)
router.get('/:id', function (req, res) {
  if (req.user.level == 'admin') {
    Recurso.getRecursoAgr(req.params.id)
      .then(dados => res.status(200).jsonp(dados))
      .catch(e => res.status(501).jsonp({ error: e }))
  }else
  res.status(401).jsonp({ error: "Não tem premissões premissões, falar com o Admin" })
});


module.exports = router;
