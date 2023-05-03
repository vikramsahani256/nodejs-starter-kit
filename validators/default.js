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
      error.details[0].message = error.details[0].message || "SOME PARAMETER OR DATA TYPE IS MISS MATCHING."
      throw error?.details[0];
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
  