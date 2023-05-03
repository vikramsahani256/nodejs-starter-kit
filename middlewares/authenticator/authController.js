//************************************************************************************//
//                                AUTHOR : VIKRAM SAHANI                              //
//************************************************************************************//


const _         = require('underscore');
const authServices = require('./authServices')
const crypto = require('../../services/cryptoService')


exports.authenticateProductHit      = authenticateProductHit ;
exports.authenticateUserAccessToken = authenticateUserAccessToken ;

const productSecretKeys = {
  PRODUCT_SAAS  :  config.get('productSecretKeys.PRODUCT_SAAS') , 
  PRODUCT_FORK  :  config.get('productSecretKeys.PRODUCT_FORK'),
}

//change to ----> PRODUCT_SAAS => ${PRODUCT_NAME}+_SAAS
// Any other product level division in same company
const offerings = {
    1 : "PRODUCT_SAAS", 
    2 : "PRODUCT_FORK",
}

async function authenticateProductHit(req, res, next) {
  const response    = { status: 400, data: {} }
  try {
    const productSecretKey    = req.headers.product_secret_key ; // crypto hash
    const offeringId          = req.headers.offeringId || 1  ;
    const offering            = offerings[offeringId]
    const key                 = productSecretKeys[offering]

    const calculatedHash      = await crypto.HmacSHA256Encryption(req.apiReference,{ data : key });
    const compareHash         = await crypto.cryptoComparison(req.apiReference,{ hash1 : productSecretKey , hash2 : calculatedHash  });
    
    if ( compareHash ) {
      return next()
    }
    response.message = "PRODUCT AUTH : INVALID SECRET KEY"
    return res.send(response)
  } catch (error) {
    response.message = `PRODUCT AUTH : ${error.message}`
    return res.send(response)
  }
}

async function authenticateUserAccessToken(req, res, next) {
  const response    = { status: 400, data: {} }
  try {

    const encryptedAccessToken  = req.headers.authorization.split(" ")[1]  // removing Bearer => crypto_encrypted_authorization
    const userId                = req.body.user_id ;

    const userInfo       = await authServices.authenticateUserAccessToken(req.apiReference,{ userId : userId }) ;
    const calculatedHash = await crypto.HmacSHA256Encryption(req.apiReference,{ data : userInfo && userInfo[0] && userInfo[0]?.access_token || "" }) ;
    const compareHash    = await crypto.cryptoComparison(req.apiReference,{ hash1 : encryptedAccessToken  , hash2 : calculatedHash  }) ;

    if( !_.isEmpty(userInfo)  &&  compareHash ) {
      req.userInfo = userInfo && userInfo[0];
      return next()
    }
    response.message = "USER AUTH : INVALID ACCESS_TOKEN OR USER_ID"
    return res.send(response) 
  } catch (error) { 
    response.message = `USER AUTH : ${error.message} `
    return res.send(response)
  }
}
