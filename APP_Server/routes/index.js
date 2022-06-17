var express = require('express');
var router = express.Router();
var axios = require('axios')

//get pagina login
router.get('/', function(req, res) {
  res.render('login', { title: 'Express' });
});

//post do login
router.post('/', function(req, res) {
  //console.log(req.body)
  axios.post('http://localhost:7001/login', req.body)
    .then(dados => {
      //console.log(dados.data)
      res.cookie('token', dados.data, {   //guardar os dados num cookie
        expires: new Date(Date.now() + '60m'),  //validade
        secure: false, // set to true if your using https
        httpOnly: true
      });
      //console.log(dados.data.userData)
      res.redirect('/inicio')
    })
    .catch(e => res.render('error', {error: e})) 
});

//get página registo
router.get('/registo', function(req, res) {
  res.render('registo');
});

//post do registo
router.post('/registo', function(req, res) {
  axios.post('http://localhost:7001/registo', req.body)
    .then(dados => {
      console.log(dados.data)
      res.cookie('token', dados.data, {   //guardar os dados num cookie
        expires: new Date(Date.now() + '60m'),  //validade
        secure: false, // set to true if your using https
        httpOnly: true
      });
      res.redirect('/inicio')
    })
    .catch(e => res.render('error', {error: e})) 
});


//
router.get('/inicio', function(req, res) {
  console.log("entra")
  axios.post('http://localhost:7002/public', req.body)
    .then(dados => {
      console.log(req.cookies.userData)
      console.log("guarda")
      res.render('public', {user : req.cookies.userData})
      })
    .catch(e => res.render('error', {error: e})) 
});


module.exports = router;
