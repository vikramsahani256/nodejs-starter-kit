//************************************************************************************//
//                                AUTHOR : VIKRAM SAHANI                              //
//************************************************************************************//

const mysql  = require('mysql2');
const moment = require('moment');

const logging = require('../../logging/logging');

exports.initializeConnectionPool = initializeConnectionPool;
exports.executeSlaveQuery        = executeSlaveQuery;
exports.executeQuery             = executeQuery;

let formatedSQL = "";

async function initializeConnectionPool(dbConfig,connectionName) {
  try {
    console.log(`CALLING INITIALIZE POOL...${connectionName || 'connectionNameMissing' }`);
    let numConnectionsInPool = 0;
    let connection = mysql.createPool(dbConfig);
    connection.on('connection', function (connection) {
      numConnectionsInPool++;
      console.log('NUMBER OF CONNECTIONS IN POOL : ', numConnectionsInPool);
    });
    
    connection.on('error', (err) => {
      console.error('MySQL database connection error: ', err);
    });
    
    return connection.promise();
  } catch (error) {
    console.error('Error occurred while initializing connection pool :', error);
    throw error;
  }
}

function logSqlError(apiReference, opts) {
  try {
    const message = `Error in executing Query : \n
                     SQL   : ${opts.sql} \n
                     Event : ${opts.event} \n
                     Error : ${opts.err} \n
                     Reference  : Module - ${apiReference.module} | API - ${apiReference.api }\n
                     Timestamp  : ${ moment(new Date()).format('YYYY-MM-DD hh:mm:ss.SSS')}\n
                    `;
    console.error(message);
    // you can send any bot alert here like telegram bot for realtime SQL Error tracking
  } catch (error) {
    console.error(error);
  }
}



async function executeQuery(apiReference, event, queryString, params, noErrorlog) {
  try {
    apiReference = apiReference || { module: "mysqlLib", api: "executeQuery" };
    const [results,fields] = await connection.query(queryString,params);
    formatedSQL = mysql.format(queryString, params);
    logging.log(apiReference, {
      EVENT: "Executing query " + event, QUERY: formatedSQL , SQL_RESULT: results,
      SQL_RESULT_LENGTH: results && results.length
    });

    return results;
  } catch (error) {
      logSqlError(apiReference, {
        event  : event,
        err    : error,
        sql    : formatedSQL,
      });
    if (error.code === 'ER_LOCK_DEADLOCK' || error.code === 'ER_QUERY_INTERRUPTED') {
      setTimeout(() => executeQuery(apiReference, event, queryString, params), 50);
    } else {
      throw { ERROR : error, QUERY : formatedSQL, EVENT : event };
    }
  }
}


async function executeSlaveQuery(apiReference, event, queryString, params, noErrorlog) {
  try {
    apiReference = apiReference || { module: "mysqlLib", api: "executeSlaveQuery" };
    const [results,fields] = await slaveConnection.query(queryString,params);
    
    formatedSQL = mysql.format(queryString, params);

    logging.log(apiReference, {
      EVENT: "Executing query " + event, QUERY: formatedSQL , SQL_RESULT: results,
      SQL_RESULT_LENGTH: results && results.length
    });
    return results;
  } catch (error) {
      logSqlError(apiReference, {
        event  : event,
        err    : error,
        sql    : formatedSQL,
      });
    if (error.code === 'ER_LOCK_DEADLOCK' || error.code === 'ER_QUERY_INTERRUPTED') {
      setTimeout(() => executeSlaveQuery(apiReference, event, queryString, params), 50);
    } else {
      throw { ERROR : error, QUERY : formatedSQL, EVENT : event };
    }
  }
}

