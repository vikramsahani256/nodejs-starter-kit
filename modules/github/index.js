//************************************************************************************//
//                                AUTHOR : VIKRAM SAHANI                              //
//************************************************************************************//


const githubUserController  = require('./controller')
const githubUserValidator   = require('./validator')
const Auth                  = require('../../middlewares/authenticator/authController')


app.post('/github/getUser', githubUserValidator.getUser, Auth.authenticateProductHit,  Auth.authenticateUserAccessToken, githubUserController.getUser);
