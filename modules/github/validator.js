//************************************************************************************//
//                                AUTHOR : VIKRAM SAHANI                              //
//************************************************************************************//


const validator = require("../../validators/default");
const logging   = require("../../logging/logging");
const Joi       = require('joi');


const responses           = require('../../utilities/responses')

const apiReferenceModule = "Github";


exports.getUser  = function getUser(req, res, next) {
   try{
    req.apiReference = { module: apiReferenceModule, api: "getUser" };
    logging.log(req.apiReference, { EVENT: "REQ_RECEIVED", REQ_BODY: req.body, REQ_QUERY: req.query } );

    req.body.authorization      = req.headers.authorization       || null ;
    req.body.product_secret_key = req.headers.product_secret_key  || null ;

    const schema = Joi.object().keys({
      authorization         : Joi.string().required(),
      product_secret_key    : Joi.string().required(),
      user_id               : Joi.number().required(),
      github_user_name      : Joi.string().required(),
    });

    if(validator.validateFields(req.apiReference, req.body, schema)){
      next();
    }
   } catch(err){
    return responses.sendError(res,{},err.message);
   }
  }
  