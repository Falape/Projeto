var express = require('express');
var router = express.Router();
var axios = require('axios')

//get pagina login
router.get('/', function (req, res) {
  res.render('login', { title: 'Express' });
});

//post do login
router.post('/', function (req, res) {
  console.log(req.body)
  axios.post('http://localhost:7001/login', req.body)
    .then(dados => {
      //console.log(dados.data)
      res.cookie('data', dados.data, {   //guardar os dados num cookie
        expires: new Date(Date.now() + '60m'),  //validade
        secure: false, // set to true if your using https
        httpOnly: true
      });
      //console.log(dados.data.userData)
      res.redirect('/inicio')
    })
    .catch(e => res.render('error', { error: e }))
});

//get página registo
router.get('/registar', function (req, res) {
  res.render('registo');
});

//post do registo
router.post('/registar', function (req, res) {
  axios.post('http://localhost:7001/registo', req.body)
    .then(dados => {
      console.log(dados.data)
      res.cookie('data', dados.data, {   //guardar os dados num cookie
        expires: new Date(Date.now() + '60m'),  //validade
        secure: false, // set to true if your using https
        httpOnly: true
      });
      res.redirect('/inicio')
    })
    .catch(e => res.render('error', { error: e }))
});


//
router.get('/inicio', function (req, res) {
  console.log("entra")
  console.log(req.cookies.data.token)
  //axios.post('http://localhost:7002/recursos?token='+ req.cookies.data.token)
  axios.post('http://localhost:7002/recursos/public?token=' + req.cookies.data.token)
    .then(dados => {
      console.log("guarda")
      console.log(req.cookies.data.userData)//dados.data)
      res.render('public', { navbar: req.cookies.data.userData, recursos: dados.data })
    })
    .catch(e => res.render('error', { error: e }))
});


router.get('/recursos/:id', function (req, res) {
  console.log("entra")
  console.log(req.cookies.data.token)
  //axios.post('http://localhost:7002/recursos?token='+ req.cookies.data.token)
  axios.get('http://localhost:7002/recursos/' + req.params.id + '?token=' + req.cookies.data.token)
    .then(dados => {
      axios.get('http://localhost:7002/comments/' + req.params.id + '?token=' + req.cookies.data.token)
      .then(dadosRec => {
        console.log(dadosRec.data)
        var flagLevel
        if (req.cookies.data.userData.level == 'admin') {
          flagLevel = 'admin'
          res.render('recurso', { navbar: req.cookies.data.userData, userData: dados.data[0].utilizador[0], recurso: dados.data[0], flagLevel:flagLevel })
        } else
          if (dados.data[0] == req.cookies.data.userData.id) {
            flagLevel = 'dono'
            res.render('recurso', { navbar: req.cookies.data.userData, userData: dados.data[0].utilizador[0], recurso: dados.data[0], flagLevel:flagLevel })
          } else {
            flagLevel = 'visitante'
            res.render('recurso', { navbar: req.cookies.data.userData, userData: dados.data[0].utilizador[0], recurso: dados.data[0], flagLevel:flagLevel })
          }
        // console.log("guarda")
        // console.log(dados.data[0])//dados.data
      })
    })
    .catch(e => res.render('error', { error: e }))
});

module.exports = router;
