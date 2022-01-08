//************************************************************************************//
//                                AUTHOR : VIKRAM SAHANI                              //
//************************************************************************************//

const Joi                                         = require('joi');
const _                                           = require('underscore');
const logging                                     = require('../logging/logging');
 
exports.validateFields                            = validateFields;
exports.trimFields                                = trimFields;
 
 
function validateFields(apiReference, req, schema, msg) {
    try {
      Joi.assert(req, schema);
      return true;
    } catch (error) {
      const errorReason = msg || error.details[0].message || 'Parameter missing or parameter type is wrong.';
      logging.log(apiReference, error.details);
      // you can add here any alert bot if required.
      return false;
    }
}
  
 

// middlewares to trim Fields if requireds.
function trimFields(req, res, next) {
    try {
      logging.log(req.apiReference, { EVENT: "Trimming Validator", REQUEST_BODY: req.body });
      if (req.body.email) {
        req.body.email = req.body.email.trim();
      }
      next();
    } catch (error) {
      logging.logError(req.apiReference, { EVENT: "Error in trimFields", ERROR: error });
      next(error);
    }
  }
  