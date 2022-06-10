var createError = require('http-errors');
var express = require('express');
var path = require('path');
var jwt = require('jsonwebtoken')
var logger = require('morgan');

var mongoose = require("mongoose");
var bodyParser = require("body-parser");

var recursoRouter = require('./routes/recursos');
var usersRouter = require('./routes/users');


var app = express();

var mongoBD = 'mongodb://127.0.0.1:27017/RRD';
mongoose.connect(mongoBD, {useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console,'Erro de conexão ao MongoBD'));
db.once('open', function() {
  console.log("Conexão ao MongoBD realizada com sucesso!")
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(function(req, res, next){
  var myToken = req.query.token || req.body.token
  jwt.verify(myToken, "O Ramalho e fixe", function(e, payload){
    if(e) res.status(401).jsonp({error: 'Erro na verificação do token: ' + e})
    else{
      req.user = { level: payload.level, username: payload.username, _id: payload._id}
      next()
    } 
  })
  if(req.body['token'] != undefined){
    delete req.body['token']
  }
})


app.use('/recursos', recursoRouter);
app.use('/users', usersRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
