var router = express.Router();
const Comments = require('../controllers/comments')
const Recurso = require('../controllers/recurso')
const User = require('../controllers/user')

//Get all users
router.get('/', function (req, res, next) {
    console.log(req.query)
    if (req.query['lvl'] != undefined && req.query['nome'] != undefined) { //com filtro para o nome e lvl
        User.getUserByNameAndlvl(req.query['nome'], req.query['lvl'])
            .then(dados => res.status(200).jsonp(dados))
            .catch(e => res.status(501).jsonp({ error: e }))
    } else
        if (req.query['lvl'] != undefined) { //com filtro para lvl
            User.getUserBylvl(req.query['lvl'])
                .then(dados => res.status(200).jsonp(dados))
                .catch(e => res.status(501).jsonp({ error: e }))
        } else
            if (req.query['nome'] != undefined) { //com filtro para nome
                User.getUserByName(req.query['nome'])
                    .then(dados => res.status(200).jsonp(dados))
                    .catch(e => res.status(501).jsonp({ error: e }))
            } else
                User.getAllUsers()
                    .then(dados => res.status(200).jsonp(dados))
                    .catch(e => res.status(501).jsonp({ error: e }))
});

router.get('/:id', function (req, res, next) {
    console.log(req.params.id)
    User.getUser(req.params.id)
        .then(dados => res.status(200).jsonp(dados))
        .catch(e => res.status(501).jsonp({ error: e }))
});

router.post('/atualizaDescricao/:id', function (req, res, next) {
    console.log(req.body.descricao)
    console.log(req.params.id)
    User.alterarDescricao(req.params.id, req.body.descricao)
        .then(dados => res.status(200).jsonp(dados))
        .catch(e => res.status(501).jsonp({ error: e }))
});

//LEVA TRATAMENTO ESPECIAL
router.post('/atualizaImagem/:id', function (req, res, next) {
    console.log(req.body.pathImage)
    console.log(req.params.id)
    User.alterarImagem(req.params.id, req.body.pathImage)
        .then(dados => res.status(200).jsonp(dados))
        .catch(e => res.status(501).jsonp({ error: e }))
});

router.post('/atualizalvl/:id', function (req, res, next) {
    console.log(req.body.level)
    console.log(req.params.id)
    if (req.level == 'admin') {
        User.alterarImagem(req.params.id, req.body.level)
            .then(dados => res.status(200).jsonp(dados))
            .catch(e => res.status(501).jsonp({ error: e }))
    } else {
        res.status(401).jsonp({ error: "Não tem premissões premissões, falar com o Admin" })
    }
});


//penso que vou trocar para um post com a info no body
router.get('/addFollower/:id', function (req, res, next) {
    if (req.query['follow'] != undefined) {
        console.log(req.query.follow)
        console.log(req.params.id)
        User.addFollower(req.params.id, req.body.follow)
            .then(dados => res.status(200).jsonp(dados))
            .catch(e => res.status(501).jsonp({ error: e }))
    } else
        res.status(501).jsonp({ error: "Query String inválida" })
});

//penso que vou trocar para um post com a info no body
router.get('/unfollow/:id', function (req, res, next) {
    if (req.query['follow'] != undefined) {
        console.log(req.query.follow)
        console.log(req.params.id)
        User.addFollower(req.params.id, req.body.follow)
            .then(dados => res.status(200).jsonp(dados))
            .catch(e => res.status(501).jsonp({ error: e }))
    } else
        res.status(501).jsonp({ error: "Query String inválida" })
});

if (req.level == 'admin') {
    User.alterarImagem(req.params.id, req.body.level)
        .then(dados => res.status(200).jsonp(dados))
        .catch(e => res.status(501).jsonp({ error: e }))
} else {
    res.status(401).jsonp({ error: "Não tem premissões premissões, falar com o Admin" })
}


router.get('/remove/:id', function (req, res, next) {
    console.log(req.params.id)
    if (req.level == 'admin') {
        User.removeUser(req.params.id)
            .then(dados => res.status(200).jsonp(dados))
            .catch(e => res.status(501).jsonp({ error: e }))
    } else {
        res.status(401).jsonp({ error: "Não tem premissões premissões, falar com o Admin" })
    }
});



module.exports = router;