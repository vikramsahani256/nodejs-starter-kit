//************************************************************************************//
//                                AUTHOR : VIKRAM SAHANI                              //
//************************************************************************************//


const dbHandler = require('../../database/MySQL/mysqlLib');
const constants = require('../../properties/constants');

exports.authenticateUserAccessToken = authenticateUserAccessToken ;


async function authenticateUserAccessToken (apiReference, opts) {
  try{
      const sql = `SELECT ${ opts.columns || '*' } FROM tb_users WHERE user_id = ? AND is_active = ? `;
      const params =  [ opts.userId , constants.userStatus.Active ] ;

      return await dbHandler.executeSlaveQuery(apiReference, "fetching user details", sql, params );
  } catch(error){
      logging.logError(apiReference, {
          MODULE : "authServices",
          METHOD : "authenticateUserAccessToken",
          ERROR  : error.message
      });
      throw new Error(err.message);
  }
}