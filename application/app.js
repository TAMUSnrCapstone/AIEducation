var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

var input_ai = require('./application/routes/input_ai');
const {AIBattle,randomAI,alwaysPlaceAt1,codeReader,roundRobin,readTextFile,printAI} = require('./codeReader.js');

var app = express();

app.use(upload.array()); 
app.use(express.static('public'));


app.use('/input_ai', input_ai);

//Functionality for textbox
app.post('/input', function(req, res){

  let challenger = new codeReader(req.body.code2,"PlayerCode");
	let battleReport = roundRobin(challenger,1,1);
	res.redirect('/input_ai');


})

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