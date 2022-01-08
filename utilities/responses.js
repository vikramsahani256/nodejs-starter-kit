//************************************************************************************//
//                                AUTHOR : VIKRAM SAHANI                              //
//************************************************************************************//
 
 const constants   = require('../properties/constants');
 const zlib        = require('zlib');
  
 
 exports.parameterMissingResponse = function (res, err, data) {
     const response = {
         "message"  : err   || constants.responseMessages.PARAMETER_MISSING,
         "status"   : constants.responseFlags.PARAMETER_MISSING,
         "data"     : data  || {}
     };
     res.send(JSON.stringify(response));
 };
 
 exports.databaseError = function (res, err, data) {
     const response = {
         "message"  : err  || constants.responseMessages.PARAMETER_MISSING,
         "status"   : constants.responseFlags.DATABASE_ERROR,
         "data"     : data || {}
     };
    // you can perfome some action before send , like store some response in db;

     res.send(JSON.stringify(response));
 };
 

 exports.actionCompleteResponse = function (res, data, msg ) {
     const response = {
         "message"  : msg  || constants.responseMessages.ACTION_COMPLETE,
         "status"   : constants.responseFlags.ACTION_COMPLETE,
         "data"     : data || []
     };
    // you can perfome some action before send , like store some response in db;

     res.send(JSON.stringify(response));
 };

 exports.sendActionFailedResponse = function(res, data, msg){
     const response = {
         message    : msg || constants.responseMessages.SOMETHING_WENT_WRONG,
         status     : constants.responseFlags.ACTION_FAILED,
         data       : data || {}
     }
    // you can perfome some action before send , like store some response in db;
    res.send(response);
 };
 
 
 exports.sendError = function(res, data, msg){
    const response = {
        message    : msg || constants.responseMessages.SOMETHING_WENT_WRONG,
        status     : constants.responseFlags.ACTION_FAILED,
        data       : data || {}
    }
   // you can perfome some action before send , like store some response in db;
   res.send(response);
};
 
 exports.sendGzippedResponse = function (res, data, msg) {
     const response = {
         message : msg || constants.responseMessages.ACTION_COMPLETE,
         status : constants.responseFlags.ACTION_COMPLETE,
         data : data || []
     };
     zlib.gzip(JSON.stringify(response), function(err, zippedData) {
         if (err) {
             return res.send(response);
         }
         res.set({ 'Content-Encoding': 'gzip' });
         return res.send(zippedData);
     });
 }
 

 exports.redirectResponse = function (res, link) {
     res.redirect(link);
 };
 
 exports.customError = function (res, err, data, status) {
     const response = {
         "message"  : err    || constants.responseMessages.SOMETHING_WENT_WRONG,
         "status"   : status || constants.responseFlags.ERROR_IN_EXECUTION,
         "data"     : data   || {}
     };
     res.send(JSON.stringify(response));
 };