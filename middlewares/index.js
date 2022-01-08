//************************************************************************************//
//                                AUTHOR : VIKRAM SAHANI                              //
//************************************************************************************//


const requestLogger  = require('./../logging/requestLogs');
const logger         = require('morgan');
const bodyParser     = require('body-parser');
const errorhandler   = require('errorhandler');
const cors           = require('cors');
const express        = require('express');
const path           = require('path');


app.set('port', process.env.PORT || config.get('PORT'));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use(function (error, req, res, next) {
  if (error instanceof SyntaxError) {
    return res.sendStatus(400);
  }
  next();
});


app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(cors());
app.use(requestLogger);

if ('development' === app.get('env')) {
  app.use(errorhandler());
}
console.log("App Environment Running at : ", app.get('env') );