//************************************************************************************//
//                                AUTHOR : VIKRAM SAHANI                              //
//************************************************************************************//


const http        = require('http');
const _           = require('underscore');
const constants   = require('../properties/constants');
const logging     = require('./../logging/logging');
const axios       = require('axios')


exports.startHttpServer     = startHttpServer;
exports.sendAxiosRequest    = sendAxiosRequest;

async function startHttpServer(port){
    return new Promise((resolve, reject)=>{
        const server = http.createServer(app).listen(port,function(){
            console.log(`########## Express Connected ########## \n   PORT - ${app.get('port') || port} , ENV - ${app.get('env')}\n`);
            resolve(server)
        })
    });
}

async function sendAxiosRequest(apiReference, options) {
    try {
      const axiosOptions = { ...options }; // create a copy of options
      const { body, json, form, query } = axiosOptions;
  
      if (body) {
        axiosOptions.data = body;
        delete axiosOptions.body;
      } else if (json) {
        axiosOptions.data = json;
        delete axiosOptions.json;
        axiosOptions.headers = {
          ...axiosOptions.headers,
          'content-type': 'application/json',
        };
      } else if (form) {
        axiosOptions.data = form;
        delete axiosOptions.form;
        axiosOptions.headers = {
          ...axiosOptions.headers,
          'content-type': 'application/x-www-form-urlencoded',
        };
      } else if (query) {
        axiosOptions.data = query;
        delete axiosOptions.query;
      }
      
      const axiosResponse = await axios(axiosOptions);
  
      console.log("axiosResponse=====",axiosResponse);
      console.log("axiosResponse.data =====",axiosResponse.data );

      logging.log(apiReference, { RESPONSE : axiosResponse , BODY : axiosResponse.data });
  
      if (_.isEmpty(axiosResponse)) {
        throw new Error('Error sendAxiosRequest : Response is empty!');
      }
  
      //|| axiosResponse?.data?.status !== constants.responseFlags.ACTION_COMPLETE 
      if (axiosResponse.status < 200 || axiosResponse.status > 299 ) {
        const error = new Error('Couldn\'t request with external server.');
        error.code = axiosResponse.status;
        throw axiosResponse.data || error;
      }
  
      logging.log(apiReference, {
        EVENT: 'Response From External Server.',
        OPTIONS: axiosOptions,
        RESPONSE: axiosResponse,
        BODY: axiosResponse.data,
      });
      return axiosResponse.data;
    } catch (error) {
      logging.logError(apiReference, {
        EVENT: 'Error From External Server.',
        OPTIONS: options,
        ERROR: error,
      });
      throw error;
    }
  }
  


