var express = require('express');
var router = express.Router();

//get pagina login
router.get('/', function(req, res) {
  res.render('login', { title: 'Express' });
});

//post do login
router.post('/', function(req, res) {
  console.log(req.body)
  axios.post('http://localhost:7001/login', req.body)
    .then(dados => {
      console.log(dados.data)
      res.cookie('token', dados.data.token, {   //guardar os dados num cookie
        expires: new Date(Date.now() + '60m'),  //validade
        secure: false, // set to true if your using https
        httpOnly: true
      });
      //res.redirect('/inicio')
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
      res.cookie('token', dados.data.token, {   //guardar os dados num cookie
        expires: new Date(Date.now() + '60m'),  //validade
        secure: false, // set to true if your using https
        httpOnly: true
      });
      res.redirect('/inicio')
    })
    .catch(e => res.render('error', {error: e})) 
});


//LIXADA, tem de 
router.post('/public', function(req, res) {
  axios.post('http://localhost:7002/public', req.body)
    .then(dados => {
      req
      res.render('public', {})
      })
    .catch(e => res.render('error', {error: e})) 
});


module.exports = router;
