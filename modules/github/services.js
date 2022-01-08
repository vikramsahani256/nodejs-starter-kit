//************************************************************************************//
//                                AUTHOR : VIKRAM SAHANI                              //
//************************************************************************************//


const httpService = require('../../services/httpService')
const constants   = require('../../properties/constants')


exports.getUser  = async function getUser (apiReference, opts) {
  try{
    return httpService.sendAxiosRequest(apiReference,{
        url    : `https://api.github.com/users/${opts.githubUserName}` ,
        method : constants.requestMethod.GET,
        query  : { }
    })
  } catch(error){
      throw new Error(err.message);
  }
}