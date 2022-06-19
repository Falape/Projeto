var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET users listing. */
router.get('/', function (req, res) {
  axios.get('http://localhost:7002/users/?token=' + req.cookies.data.token)
    .then(users => {
      res.render('users', { navbar: req.cookies.data.userData, users: users.data, title:'Utilizadores' })
    })
    .catch(e => res.render('error', { error: e }))
});

router.get('/following/:id', function (req, res) {
  axios.get('http://localhost:7002/users/getFollowing/' + req.params.id + '?token=' + req.cookies.data.token)
    .then(users => {
      console.log(users.data[0].utilizador)
      res.render('users', { navbar: req.cookies.data.userData, users: users.data[0].utilizador, title:'Following' })
    })
    .catch(e => res.render('error', { error: e }))
});

router.get('/followers/:id', function (req, res) {
  axios.get('http://localhost:7002/users/getFollowers/'+ req.params.id+ '?token=' + req.cookies.data.token)
    .then(users => {
      console.log(users)
      res.render('users', { navbar: req.cookies.data.userData, users: users.data, title:"Followers" })
    })
    .catch(e => res.render('error', { error: e }))
});

//Não feito, Apenas rota
router.post('/editDados/:id', function (req, res) {
  axios.get('http://localhost:7002/users/?token=' + req.cookies.data.token)
    .then(users => {
      res.render('users', { navbar: req.cookies.data.userData, users: users.data, title:'Utilizadores' })
    })
    .catch(e => res.render('error', { error: e }))
});


router.get('/:id', function (req, res) {
  console.log("entra")
  console.log("ID ==== ", req.params.id)
  console.log("TOKEN ==== ", req.cookies.data.token)
  //axios.post('http://localhost:7002/recursos?token='+ req.cookies.data.token)
  axios.get('http://localhost:7002/users/' + req.params.id + '?token=' + req.cookies.data.token)
    .then(dados => {
      console.log("guarda")
      //console.log(req.cookies.data.userData)//dados.data)
      console.log("dados: ", dados.data)
      axios.get('http://localhost:7002/recursos/userRecurso/' + req.params.id + '?token=' + req.cookies.data.token)
        .then(recursos => {
          console.log("Consegui os dados dos recursos")
          console.log("dados: ", recursos.data)
          axios.get('http://localhost:7002/users/getFollowers/' + req.params.id + '?token=' + req.cookies.data.token)
            .then(myfollowers => {
              console.log("VER AQUII")
              console.log(myfollowers.data)
              var flagLevel
              if (req.cookies.data.userData.level == 'admin') {
                flagLevel = 'admin'
                res.render('user', { navbar: req.cookies.data.userData, user: dados.data, recursos: recursos.data, myfollowers: myfollowers.data, flagLevel:flagLevel })
              } else
                if (dados.data._id == req.cookies.data.userData.id) {
                  flagLevel = 'dono'
                  res.render('user', { navbar: req.cookies.data.userData, user: dados.data, recursos: recursos.data, myfollowers: myfollowers.data, flagLevel:flagLevel })
                } else {
                  flagLevel = 'visitante'
                  res.render('user', { navbar: req.cookies.data.userData, user: dados.data, recursos: recursos.data, myfollowers: myfollowers.data, flagLevel:flagLevel })
                }
            })
            .catch(e => res.render('error', { error: e }))
        })
        .catch(e => res.render('error', { error: e }))
    })
    .catch(e => res.render('error', { error: e }))
});

module.exports = router;
