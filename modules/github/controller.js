//************************************************************************************//
//                                AUTHOR : VIKRAM SAHANI                              //
//************************************************************************************//


const responses           = require('../../utilities/responses')
const githubUserServices  = require('./services')
const logging             = require('../../logging/logging')



exports.getUser  = async function getUser(req, res) {
  try {
    const githubUserName = req.body.github_user_name;
    const result = await githubUserServices.getUser(req.apiReference, {github_user_name : githubUserName });
    return responses.actionCompleteResponse(res, result);
  } catch (err) {
    return responses.sendError(res,{},err.message);
  }
};

