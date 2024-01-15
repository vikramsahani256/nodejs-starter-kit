//************************************************************************************//
//                                AUTHOR : VIKRAM SAHANI                              //
//************************************************************************************//


const httpService               = require('./httpService');
const envProperties             = require('../properties/envProperties');
const mysqlLib                  = require('../database/MySQL/mysqlLib');
const logging                   = require('../logging/logging');

const apiReferenceModule        = 'startup'

exports.initializeServer = async function initializeServer() {
    let apiReference = {
        module  : apiReferenceModule,
        api     : "initialize"
    }
    try {
        connection      = await mysqlLib.initializeConnectionPool(envProperties.databaseSettings.mysql.master , "MASTER_DB");
        slaveConnection = await mysqlLib.initializeConnectionPool(envProperties.databaseSettings.mysql.slave  , "SLAVE_DB" );

        server          = await httpService.startServer(envProperties.port);
    } catch (error) {
        logging.logError(apiReference, {EVENT: "initializeServer", ERROR: error});
        throw new Error(error)
    }
}