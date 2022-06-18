var express = require('express');
var router = express.Router();
var axios = require('axios')

// get página de novo recurso
router.get('/new/new', function(req, res) {
    console.log("consegui chegar aqui")
    res.render('novo_recurso');
});

// post do novo recurso
// router.post('/new/new', function(req, res) {
//     req.body.user = req.cookies.data.userData.username
//     console.log("req.body " + JSON.stringify(req.body))
//     // pedido a server
//     axios.post('http://localhost:7002/recursos?token=' + req.cookies.data.token, req.body)
//         .then(dados => {
//             console.log("TESTE")
//             res.redirect('/inicio')
//         })
//         .catch(e => {
//             console.log(e)
//             res.render('error', {error: e})
//         })
// });

router.get('/:id', function (req, res) {
    console.log("entra")
    console.log(req.cookies.data.token)
    //axios.post('http://localhost:7002/recursos?token='+ req.cookies.data.token)
    axios.post('http://localhost:7002/recursos/' + req.params.id + '?token=' + req.cookies.data.token)
        .then(dados => {
            console.log("guarda")
            console.log(dados)//dados.data)
            res.render('recurso', { navbar: req.cookies.data.userData, recursos: dados.data })
        })
        .catch(e => res.render('error', { error: e }))
});

module.exports = router;





