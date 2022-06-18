var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/:id', function(req, res) {
  console.log("entra")
  console.log("ID ==== ", req.params.id)
  console.log("TOKEN ==== ", req.cookies.data.token)
  //axios.post('http://localhost:7002/recursos?token='+ req.cookies.data.token)
  axios.get('http://localhost:7002/users/' + req.params.id+'?token='+ req.cookies.data.token)
    .then(dados => {
      console.log("guarda")
      console.log(req.cookies.data.userData)//dados.data)
      console.log("dados: ", dados.data)
      res.render('user', {navbar : req.cookies.data.userData, user : dados.data})
      })
    .catch(e => res.render('error', {error: e})) 
});

module.exports = router;
