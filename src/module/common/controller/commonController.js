const dbConnectHelper = require('../../../database/dbconnection');
const employee_Helper = require('../../../dbHelper/employee-db-helper');
const common_Helper = require('../../../dbHelper/common-db-helper');

const responses = require('../../../util/responses');
const constants = require('../../../util/constants');
const authHelper = require('../../../util/commonFunctions')


module.exports.getByCategory = async(req,res)=>{
    let db = await dbConnectHelper.getConnectionDefault();
    let loginRes = await common_Helper.getByCategory(db,req.body);
    console.log(loginRes)
    // if(loginRes.statusCode == 400 ){
    //     return responses.sendError(res, 'eng' || languageCode,{},  constants.responseMessageCode.INCORRECT_PASSWORD,constants.responseMessageCode.INCORRECT_PASSWORD);       
    // }else if(loginRes.statusCode == 404){
    //     return responses.sendError(res, 'eng' || languageCode,{},  constants.responseMessageCode.USER_NOT_EXIST,constants.responseMessageCode.USER_NOT_EXIST)
    // }    
    // else{
    //     loginRes.userDetails.token = generateJWToken
    //     return responses.actionCompleteResponse(res, 'eng' || languageCode,loginRes, constants.responseMessageCode.LOGIN_SUCCESSFULLY, constants.responseMessageCode.ACTION_COMPLETE)
    // }
    if(loginRes){
        console.log("its Login res",loginRes);
        return responses.actionCompleteResponse(res, 'eng' || languageCode,loginRes,"Task get Successfully.", constants.responseMessageCode.ACTION_COMPLETE)
    }
};

module.exports.arrayToCommaSeparatedString =(arr) => {
    if(arr){
    if(arr.length > 0){
        return arr.join(',');
    }else {
        return '';
    }}else {
        return '';
    }
  }