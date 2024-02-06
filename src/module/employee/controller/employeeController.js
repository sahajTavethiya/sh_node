const dbConnectHelper = require('../../../database/dbconnection');
const employee_Helper = require('../../../dbHelper/employee-db-helper');
const responses = require('../../../util/responses');
const constants = require('../../../util/constants');
const authHelper = require('../../../util/commonFunctions')


module.exports.getTaskList = async(req,res)=>{
    let db = await dbConnectHelper.getConnectionDefault();
    let loginRes = await employee_Helper.getTaskList(db,req.body);
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

// module.exports.saveDailyWork = async(req,res)=>{
//     let db = await dbConnectHelper.getConnectionDefault();
//     let loginRes = await employee_Helper.saveDailyWork(db,req.body);
//     console.log(loginRes)
//     // if(loginRes.statusCode == 400 ){
//     //     return responses.sendError(res, 'eng' || languageCode,{},  constants.responseMessageCode.INCORRECT_PASSWORD,constants.responseMessageCode.INCORRECT_PASSWORD);       
//     // }else if(loginRes.statusCode == 404){
//     //     return responses.sendError(res, 'eng' || languageCode,{},  constants.responseMessageCode.USER_NOT_EXIST,constants.responseMessageCode.USER_NOT_EXIST)
//     // }    
//     // else{
//     //     loginRes.userDetails.token = generateJWToken
//     //     return responses.actionCompleteResponse(res, 'eng' || languageCode,loginRes, constants.responseMessageCode.LOGIN_SUCCESSFULLY, constants.responseMessageCode.ACTION_COMPLETE)
//     // }
//     if(loginRes){
//         return responses.actionCompleteResponse(res, 'eng' || languageCode,loginRes,"Task get Successfully.", constants.responseMessageCode.ACTION_COMPLETE)
//     }
// };

module.exports.getRemainingWorkByTaskId = async(req,res)=>{
    let db = await dbConnectHelper.getConnectionDefault();
    let loginRes = await employee_Helper.getRemainingWorkOfTask(db,req.body);
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