var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET users listing. */
router.get('/', function(req, res, next) {
  axios.get('http://localhost:7002/users/?token='+ req.cookies.data.token)
          .then(users =>{
            res.render('users', {navbar : req.cookies.data.userData, users : users.data})
          })
          .catch(e => res.render('error', {error: e})) 
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
      axios.get('http://localhost:7002/recursos/userRecurso/' + req.params.id+'?token='+ req.cookies.data.token)
        .then(recursos =>{
          console.log("Consegui os dados dos recursos")
          console.log("dados: ", recursos.data)
          axios.get('http://localhost:7002/users/getFollowers/' + req.params.id+'?token='+ req.cookies.data.token)
          .then(myfollowers =>{
            res.render('user', {navbar : req.cookies.data.userData, user : dados.data, recursos: recursos.data, myfollowers: myfollowers.data})
          })
          .catch(e => res.render('error', {error: e})) 
        })
        .catch(e => res.render('error', {error: e})) 
      })
    .catch(e => res.render('error', {error: e})) 
});

module.exports = router;
