//************************************************************************************//
//                                AUTHOR : VIKRAM SAHANI                              //
//************************************************************************************//

const moment = require('moment');
const envProperties = require('./../properties/envProperties');

exports.log      = log;
exports.logError = logError;

let debuggingEnabled = true ;


if (envProperties.isEnvLive() ) {
  debuggingEnabled = false;
}


function log(apiReference, log) {
  try {
    if (debuggingEnabled
      && apiReference?.module
      && apiReference?.api
      && fileSwitches?.[apiReference.module]
      && fileSwitches[apiReference.module] === true
      && modules?.[apiReference.module]?.[apiReference.api] === true) {

      try{ log = JSON.stringify(log) } catch(e){ } // for string handling

      const message = `Logging.Log ==>
                       Timestamp : ${moment(new Date()).format('YYYY-MM-DD hh:mm:ss.SSS')}
                       Reference : Module - ${apiReference.module} | API - ${apiReference.api}
                       Logs :  ${log}`

      console.log(message);
    }
  } catch (error) {
    console.error(`An error occurred while logging for API reference: ${JSON.stringify(apiReference)}`, error);
  }
}


function logError(apiReference, log) {
  try {
    if (apiReference?.module && apiReference?.api) {
      try{ log = JSON.stringify(log) } catch(e){ } // for string handling
      const message = `Logging.logError ==> 
                      Reference : ${apiReference.module} | ${apiReference.api}
                      Logs : ${log}
                      `;
      console.error(message);
    }
  } catch (error) {
    console.error(`An error occurred while logging error for API reference: ${JSON.stringify(apiReference)}`, error);
  }
}


const fileSwitches = {
  Github             : true,
  
};

const modules = {
  mysqlLib: {
    executeQuery     : true,
    executeSlaveQuery: true
  },
  startup: {
    initialize: true
  },
  Github: {
    getUser : true
  }
};