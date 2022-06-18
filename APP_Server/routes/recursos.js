var express = require('express');
var router = express.Router();
var axios = require('axios')


router.get('/:id', function (req, res) {
    console.log("entra")
    console.log(req.cookies.data.token)
    //axios.post('http://localhost:7002/recursos?token='+ req.cookies.data.token)
    axios.get('http://localhost:7002/recursos/' + req.params.id + '?token=' + req.cookies.data.token)
        .then(dados => {
        axios.get('http://localhost:7002/comments/recurso/' + req.params.id + '?token=' + req.cookies.data.token)
        .then(dadosRec => {
            console.log("dados comments")
            console.log(dadosRec.data[0])
            var flagLevel
            if (req.cookies.data.userData.level == 'admin') {
            flagLevel = 'admin'
            res.render('recurso', { navbar: req.cookies.data.userData, userData: dados.data[0].utilizador[0], recurso: dados.data[0], flagLevel:flagLevel, comentarios:dadosRec.data})
            } else
            if (dados.data[0] == req.cookies.data.userData.id) {
                flagLevel = 'dono'
                res.render('recurso', { navbar: req.cookies.data.userData, userData: dados.data[0].utilizador[0], recurso: dados.data[0], flagLevel:flagLevel, comentarios:dadosRec.data })
            } else {
                flagLevel = 'visitante'
                res.render('recurso', { navbar: req.cookies.data.userData, userData: dados.data[0].utilizador[0], recurso: dados.data[0], flagLevel:flagLevel, comentarios:dadosRec.data })
            }
            // console.log("guarda")
            // console.log(dados.data[0])//dados.data
        })
        })
        .catch(e => res.render('error', { error: e }))
});
   

router.get('/deleteRecurso/:id', function (req, res) {

    console.log(req.body)
    axios.get('http://localhost:7002/recursos/remove/' + req.params.id + '?token=' + req.cookies.data.token, req.body)
        .then(dados => {
            console.log(dados.data)
            res.redirect('/users/' + req.query.recurso)
        })
        .catch(e => res.render('error', { error: e }))
})

module.exports = router;
    