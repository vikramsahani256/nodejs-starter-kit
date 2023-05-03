//************************************************************************************//
//                                AUTHOR : VIKRAM SAHANI                              //
//************************************************************************************//


const dbHandler = require('../../database/MySQL/mysqlLib');
const constants = require('../../properties/constants');
const logging = require('../../logging/logging');
const { result } = require('underscore');


exports.authenticateUserAccessToken = authenticateUserAccessToken ;


async function authenticateUserAccessToken (apiReference, opts) {
  try{
      const sql = ` SELECT ${ opts.columns || '*' } FROM tb_users WHERE user_id = ? AND is_active = ? AND is_blocked = ? `;
      const params =  [ opts.userId , constants.userStatus.Active ,  constants.userStatus.unBlocked ] ;
      const data =  await dbHandler.executeSlaveQuery(apiReference, "fetching user details", sql, params );
      return data;
  } catch(error){
    logging.logError(req.apiReference, {
          MODULE : "authServices",
          METHOD : "authenticateUserAccessToken",
          ERROR  : error.message
      });
      throw new Error(err.message);
  }
}