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
  console.log("entra")
  axios.post('http://localhost:7001/registo', req.body)
    .then(dados => {
      console.log(dados.data)
      res.cookie('data', dados.data, {   //guardar os dados num cookie
        expires: new Date(Date.now() + '60m'),  //validade
        secure: false, // set to true if your using https
        httpOnly: true
      });
      console.log("chega?")
      res.redirect('/inicio')
    })
    .catch(e => res.render('error', { error: e }))
});


//
router.get('/public', function (req, res) {
  console.log("entra")
  console.log(req.cookies.data.token)
  //axios.post('http://localhost:7002/recursos?token='+ req.cookies.data.token)
  axios.post('http://localhost:7002/recursos/public?token=' + req.cookies.data.token,{})
    .then(dados => {
      console.log("guarda")
      console.log(req.cookies.data.userData)//dados.data)
      res.render('public', { navbar: req.cookies.data.userData, recursos: dados.data, title:'Feed Publico' })
    })
    .catch(e => res.render('error', { error: e }))
});

router.get('/inicio', function (req, res) {
  console.log("entra")
  console.log(req.cookies.data.token)
  //axios.post('http://localhost:7002/recursos?token='+ req.cookies.data.token)
  axios.post('http://localhost:7002/recursos/following?token=' + req.cookies.data.token,{})
    .then(dados => {
      console.log("guarda")
      console.log(req.cookies.data.userData)//dados.data)
      res.render('public', { navbar: req.cookies.data.userData, recursos: dados.data, title:'Feed Noticias' })
    })
    .catch(e => res.render('error', { error: e }))
});



module.exports = router;
