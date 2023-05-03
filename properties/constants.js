//************************************************************************************//
//                                AUTHOR : VIKRAM SAHANI                              //
//************************************************************************************//


exports.responseMessages = {
    "PARAMETER_MISSING"     : "PARAMETER_MISSING",
    "INVALID_ACCESS_TOKEN"  : "INVALID_ACCESS_TOKEN",
    "WRONG_PASSWORD"        : "WRONG_PASSWORD",
    "ACTION_COMPLETE"       : "ACTION_COMPLETE",
    "SHOW_ERROR_MESSAGE"    : "SHOW_ERROR_MESSAGE",
    "ERROR_IN_EXECUTION"    : "ERROR_IN_EXECUTION",
    "INVALID_ACCESS"        : "INVALID_ACCESS",
    "EMAIL_NOT_EXISTS"      : "EMAIL_NOT_EXISTS",
    "USER_NOT_FOUND"        : "USER_NOT_FOUND",
    "INVALID_API_KEY"       : "INVALID_API_KEY",
    "LOGIN_SUCCESSFULLY"    : "LOGIN_SUCCESSFULLY",
    "API_KEY_GENERATED"     : "API_KEY_GENERATED",
    "LOGIN_FAILED"          : "LOGIN_FAILED",
    "DATABASE_ERROR"        : "DATABASE_ERROR",
    "SOMETHING_WENT_WRONG"  : "SOMETHING_WENT_WRONG",
    "INVALID_PRODUCT"       : "INVALID_PRODUCT",
    "INVALID_HASH"          : "INVALID_HASH",

  };

  exports.responseFlags = {
    LOGIN_FAILED          : 401, 
    API_KEY_GENERATED     : 201, 
    PARAMETER_MISSING     : 400, 
    INVALID_ACCESS_TOKEN  : 401,  
    INVALID_ACCESS        : 401, 
    WRONG_PASSWORD        : 202, 
    ACTION_COMPLETE       : 200, 
    SHOW_ERROR_MESSAGE    : 400, 
    ERROR_IN_EXECUTION    : 400, 
    USER_NOT_FOUND        : 404, 
    EMAIL_NOT_EXISTS      : 404, 
    INVALID_API_KEY       : 401, 
    LOGIN_SUCCESSFULLY    : 200, 
    DATABASE_ERROR        : 401,
    SOMETHING_WENT_WRONG  : 401
  };
  
  exports.userStatus = {
    Active        : 1,
    inActive      : 0, 
    Blocked       : 1,
    unBlocked     : 0
  }

  exports.requestMethod = {
    GET        : "GET",
    POST       : "POST", 
    
  }