//************************************************************************************//
//                                AUTHOR : VIKRAM SAHANI                              //
//************************************************************************************//


const validator = require("../../validators/default");
const logging   = require("../../logging/logging");
const Joi       = require('joi');

const apiReferenceModule = "Github";


exports.getUser  = function getUser(req, res, next) {
    req.apiReference = { module: apiReferenceModule, api: "getUser" };
    logging.log(req.apiReference, { EVENT: "REQ_RECEIVED", REQ_BODY: req.body, REQ_QUERY: req.query } );
    const schema = Joi.object().keys({
      // user_id : Joi.string().required(),
      githubUserName :  Joi.string().required(),
    });
    if(validator.validateFields(req.apiReference, req.body, schema)){
      next();
    }
  }
  