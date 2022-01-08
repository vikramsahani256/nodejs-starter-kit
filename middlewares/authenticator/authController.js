//************************************************************************************//
//                                AUTHOR : VIKRAM SAHANI                              //
//************************************************************************************//


const _         = require('underscore');
const authServices = require('./authServices')
const crypto = require('../../services/cryptoService')


exports.authenticateProductHit      = authenticateProductHit ;
exports.authenticateUserAccessToken = authenticateUserAccessToken ;

const secretKeys = {
  PRODUCT_SAAS  :  config.get('secretKeys.PRODUCT_SAAS') , 
  PRODUCT_FORK  :  config.get('secretKeys.PRODUCT_FORK'),
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
    const productSecretKey    = req.headers.productSecretKey ; // crypto hash
    const offeringId          = req.headers.offeringId || 1  ;
    const offering            = offerings[offeringId]
    const key                 = secretKeys[offering]

    const calculatedHash      = crypto.HmacSHA256Encryption(req.apiReference,{ data : key });

    if ( crypto.cryptoComparison(apiReference,{ hash1 : productSecretKey , hash2 : calculatedHash  }) ) {
      return next()
    }
    response.message = "PRODUCT AUTH : INVALID SECRET KEY"
    return res.send(response)
  } catch (error) {
    response.message = "PRODUCT AUTH : SOMETHING WENT WRONG"
    return res.send(response)
  }
}

async function authenticateUserAccessToken(req, res, next) {
  const response    = { status: 400, data: {} }
  try {
    // req.headers.Authorization=  "Bearer crypto_encrypted_authorization"
    const encryptedAccessToken  = req.headers.Authorization.trim().split(' ')[1];  // removing Bearer => crypto_encrypted_authorization
    const userId                = req.body.userId ;
    
    const userInfo = await authServices.authenticateUserAccessToken(req.apiReference,{ userId : userId }) ;
    
    const calculatedHash = crypto.HmacSHA256Encryption(req.apiReference,{ data : userInfo[0]?.access_token });

    if( crypto.cryptoComparison(apiReference,{ hash1 : encryptedAccessToken , hash2 : calculatedHash }) ) {
      req.userInfo = userInfo[0];
      return next()
    }
    response.message = "USER AUTH : INVALID ACCESS_TOKEN OR USER_ID"
    return res.send(response) //failure Condition
  } catch (error) { 
    //failure Condition
    response.message = "USER AUTH : SOMETHING WENT WRONG"
    return res.send(response)
  }
}
