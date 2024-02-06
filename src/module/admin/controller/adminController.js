const dbConnectHelper = require('../../../database/dbconnection');
const adminDB_Helper = require('../../../dbHelper/admin-db-helper');
const responses = require('../../../util/responses');
const constants = require('../../../util/constants');
const authHelper = require('../../../util/commonFunctions')

// const {
//    // logger,
//     responses,
//     constants,
//    // commonFunctions
// } = require('../../../util');
module.exports.login = async(req,res)=>{
    let db = await dbConnectHelper.getConnectionDefault();
    try {
        
    if(!req.body.email){
        return responses.sendError(res, 'eng' || languageCode,{},  constants.responseMessageCode.PLEASE_ENTER_EMAIL,constants.responseMessageCode.CLIENT_ERROR);
    };
    if(!req.body.password){
        return responses.sendError(res, 'eng' || languageCode,{},  constants.responseMessageCode.PLEASE_ENTER_PASSWORD,constants.responseMessageCode.CLIENT_ERROR);
    }
    let loginRes = await adminDB_Helper.adminLogin(db,req.body);
    console.log(loginRes)
    if(loginRes.statusCode == 400 ){
        return responses.sendError(res, 'eng' || languageCode,{},  constants.responseMessageCode.INCORRECT_PASSWORD,constants.responseMessageCode.INCORRECT_PASSWORD);       
    }else if(loginRes.statusCode == 404){
        return responses.sendError(res, 'eng' || languageCode,{},  constants.responseMessageCode.USER_NOT_EXIST,constants.responseMessageCode.USER_NOT_EXIST)
    }    
    else{
        let generateJWToken = await authHelper.generateJWToken({user_id:loginRes.userDetails.id , RoleId : loginRes.userDetails.roleId,timestamp: new Date().getTime()});
        delete loginRes.statusCode,
        delete loginRes.StatusDescription,
        delete loginRes.userDetails.Password,
        delete loginRes.userDetails.BOD;
        delete loginRes.userDetails.IsActive;
        loginRes.userDetails.token = generateJWToken
        return responses.actionCompleteResponse(res, 'eng' || languageCode,loginRes, constants.responseMessageCode.LOGIN_SUCCESSFULLY, constants.responseMessageCode.ACTION_COMPLETE)
    }
} catch (error) {
    console.log(error);
}
};
// want to add validation Like fname , email is not null,
module.exports.addUser = async(req,res)=>{
    if(req.body.roleId == 1 || req.body.roleId == 2){
        let db = await dbConnectHelper.getConnectionDefault();
        let loginRes = await adminDB_Helper.addUser(db,req.body);
        if(loginRes.statusCode == 400 ){
            return responses.sendError(res, 'eng' || languageCode,{},  constants.responseMessageCode.USER_ALREADY_EXISTS,constants.responseMessageCode.USER_ALREADY_EXISTS);       
        }    
        else{
            return responses.actionCompleteResponse(res, 'eng' || languageCode,loginRes, loginRes.MSG, constants.responseMessageCode.USER_REGISTRED);
        }
    }else{
        return responses.sendError(res, 'eng' || languageCode,{},  constants.responseMessageCode.NOT_PERMISSION_FOR_CREATE_USER,constants.responseMessageCode.INVALID_CREDENTIALS)
    }
    
}

module.exports.addOrder = async(req,res)=>{
    console.log(req.body.roleId);
    if(req.body.roleId == 1){
        let db = await dbConnectHelper.getConnectionDefault();
        let loginRes = await adminDB_Helper.addOrder(db,req.body);
        if(loginRes.statusCode == 400 ){
            return responses.sendError(res, 'eng' || languageCode,{},  constants.responseMessageCode.USER_ALREADY_EXISTS,constants.responseMessageCode.USER_ALREADY_EXISTS);       
        }    
        else{
            return responses.actionCompleteResponse(res, 'eng' || languageCode,loginRes, constants.responseMessageCode.ORDER_ADDED_SUCCESSFULLY, constants.responseMessageCode.USER_REGISTRED);
        }
    }else{
        return responses.sendError(res, 'eng' || languageCode,{},  constants.responseMessageCode.NOT_PERMISSION_FOR_CREATE_ORDER,constants.responseMessageCode.INVALID_CREDENTIALS)
    }
    
};
module.exports.addClient = async(req,res)=>{
    console.log(req.body.roleId);
    if(req.body.roleId == 1){
        let db = await dbConnectHelper.getConnectionDefault();
        let loginRes = await adminDB_Helper.addClient(db,req.body);
        if(loginRes.statusCode == 400 ){
            return responses.sendError(res, 'eng' || languageCode,{},  constants.responseMessageCode.USER_ALREADY_EXISTS,constants.responseMessageCode.USER_ALREADY_EXISTS);       
        }    
        else{
            return responses.actionCompleteResponse(res, 'eng' || languageCode,loginRes, constants.responseMessageCode.ORDER_ADDED_SUCCESSFULLY, constants.responseMessageCode.USER_REGISTRED);
        }
    }else{
        return responses.sendError(res, 'eng' || languageCode,{},  constants.responseMessageCode.NOT_PERMISSION_FOR_CREATE_ORDER,constants.responseMessageCode.INVALID_CREDENTIALS)
    }
    
};

module.exports.assignTaskToEmployee = async(req,res)=>{
    console.log(req.body.roleId);
    if(req.body.roleId == 1 || req.body.roleId == 2){
        let db = await dbConnectHelper.getConnectionDefault();
        console.log("salubhai");
        let loginRes = await adminDB_Helper.assignTaskToEmployee(db,req.body);
        if(loginRes.statusCode == 400){
            return responses.sendError(res, 'eng' || languageCode,{},  constants.responseMessageCode.USER_ALREADY_EXISTS,constants.responseMessageCode.CLIENT_ERROR);       
        }    
        else{
            return responses.actionCompleteResponse(res, 'eng' || languageCode,loginRes, constants.responseMessageCode.USER_REGISTRED, constants.responseMessageCode.USER_REGISTRED);
        }
    }else{
        return responses.sendError(res, 'eng' || languageCode,{},  constants.responseMessageCode.NOT_PERMISSION_FOR_CREATE_USER,constants.responseMessageCode.INVALID_CREDENTIALS)
    }    
};

module.exports.getNoOfPiecewantToAssign = async(req,res)=>{
    console.log(req.body.roleId);
    if(req.body.roleId == 1 || req.body.roleId == 2){
        let db = await dbConnectHelper.getConnectionDefault();
        let loginRes = await adminDB_Helper.getNoOfPiecewantToAssign(db,req.body);
        if(loginRes.statusCode == 400){
            return responses.sendError(res, 'eng' || languageCode,{},  constants.responseMessageCode.USER_ALREADY_EXISTS,constants.responseMessageCode.CLIENT_ERROR);       
        }    
        else{
            return responses.actionCompleteResponse(res, 'eng' || languageCode,loginRes, constants.responseMessageCode.ACTION_COMPLETE, constants.responseMessageCode.ACTION_COMPLETE);
        }
    }else{
        return responses.sendError(res, 'eng' || languageCode,{},  constants.responseMessageCode.NOT_PERMISSION_FOR_CREATE_USER,constants.responseMessageCode.INVALID_CREDENTIALS)
    }    
};

module.exports.addStock = async(req,res)=>{
    try{
    if(req.body.roleId == 1 || req.body.roleId == 2){
        let db = await dbConnectHelper.getConnectionDefault();
        let loginRes = await adminDB_Helper.addStock(db,req.body);
        if(loginRes.statusCode == 400 ){
            return responses.sendError(res, 'eng' || languageCode,{},  constants.responseMessageCode.USER_ALREADY_EXISTS,constants.responseMessageCode.USER_ALREADY_EXISTS);       
        }    
        else{
            return responses.actionCompleteResponse(res, 'eng' || languageCode,loginRes, constants.responseMessageCode.USER_REGISTRED, constants.responseMessageCode.USER_REGISTRED);
        }
    }else{
        return responses.sendError(res, 'eng' || languageCode,{},  constants.responseMessageCode.NOT_PERMISSION_FOR_CREATE_USER,constants.responseMessageCode.INVALID_CREDENTIALS)
    }
}  catch (error) {
    // Handle any errors that occur during the operation
    console.error('Error in login:', error);
    throw error;
  }
    
} 
module.exports.getAssignListByOrderId = async(req,res)=>{
    try{
    if(req.body.roleId == 1 || req.body.roleId == 2){
        let db = await dbConnectHelper.getConnectionDefault();
        let loginRes = await adminDB_Helper.getAssignListByOrderId  (db,req.body);
        if(loginRes.statusCode == 400 ){
          return responses.sendError(res, 'eng' || languageCode,{},  constants.responseMessageCode.USER_ALREADY_EXISTS,constants.responseMessageCode.USER_ALREADY_EXISTS);       
        }    
     else{
            return responses.actionCompleteResponse(res, 'eng' || languageCode,loginRes, constants.responseMessageCode.USER_REGISTRED, constants.responseMessageCode.USER_REGISTRED);
     }
    }else{
        return responses.sendError(res, 'eng' || languageCode,{},  constants.responseMessageCode.NOT_PERMISSION_FOR_CREATE_USER,constants.responseMessageCode.INVALID_CREDENTIALS)
    }
}  catch (error) {
    // Handle any errors that occur during the operation
    console.error('Error in login:', error);
    throw error;
  }
    
} 
module.exports.OrderReport = async(req,res)=>{
    console.log("its RoleID",req.body.roleId)
    if(req.body.roleId == 1 ){
        let db = await dbConnectHelper.getConnectionDefault();
        let loginRes = await adminDB_Helper.OrderReport(db,req.body);
        if(loginRes.statusCode == 400 ){
            return responses.sendError(res, 'eng' || languageCode,{},  constants.responseMessageCode.USER_ALREADY_EXISTS,constants.responseMessageCode.USER_ALREADY_EXISTS);       
        }    
        else{
            return responses.actionCompleteResponse(res, 'eng' || languageCode,loginRes, constants.responseMessageCode.ACTION_COMPLETE, constants.responseMessageCode.USER_REGISTRED);
        }
    }else{
        return responses.sendError(res, 'eng' || languageCode,{},  constants.responseMessageCode.NOT_PERMISSION_FOR_CREATE_USER,constants.responseMessageCode.INVALID_CREDENTIALS)
    }
    
} 
module.exports.GetOrderDetailById = async(req,res)=>{
    console.log("its RoleID",req.body.roleId)
    if(req.body.roleId == 1 ){
        let db = await dbConnectHelper.getConnectionDefault();
        let loginRes = await adminDB_Helper.GetOrderDetailById(db,req.body);
        if(loginRes.statusCode == 400 ){
            return responses.sendError(res, 'eng' || languageCode,{},  constants.responseMessageCode.USER_ALREADY_EXISTS,constants.responseMessageCode.USER_ALREADY_EXISTS);       
        }    
        else{
            return responses.actionCompleteResponse(res, 'eng' || languageCode,loginRes, constants.responseMessageCode.ACTION_COMPLETE, constants.responseMessageCode.USER_REGISTRED);
        }
    }else{
        return responses.sendError(res, 'eng' || languageCode,{},  constants.responseMessageCode.NOT_PERMISSION_FOR_CREATE_USER,constants.responseMessageCode.INVALID_CREDENTIALS)
    }
    
};
module.exports.GetClientReport = async(req,res)=>{
    if(req.body.roleId == 1 ){
        let db = await dbConnectHelper.getConnectionDefault();
        let loginRes = await adminDB_Helper.getClientReport(db,req.body);
        if(loginRes.statusCode == 400 ){
            return responses.sendError(res, 'eng' || languageCode,{},  constants.responseMessageCode.USER_ALREADY_EXISTS,constants.responseMessageCode.USER_ALREADY_EXISTS);       
        }    
        else{
            return responses.actionCompleteResponse(res, 'eng' || languageCode,loginRes, constants.responseMessageCode.ACTION_COMPLETE, constants.responseMessageCode.USER_REGISTRED);
        }
    }else{
        return responses.sendError(res, 'eng' || languageCode,{},  constants.responseMessageCode.NOT_PERMISSION_FOR_CREATE_USER,constants.responseMessageCode.INVALID_CREDENTIALS)
    }
    
} 
module.exports.UserReport = async(req,res)=>{
    if(req.body.roleId == 1 ){
        let db = await dbConnectHelper.getConnectionDefault();
        let loginRes = await adminDB_Helper.UserReport(db,req.body);
        if(loginRes.statusCode == 400 ){
            return responses.sendError(res, 'eng' || languageCode,{},  constants.responseMessageCode.USER_ALREADY_EXISTS,constants.responseMessageCode.USER_ALREADY_EXISTS);       
        }    
        else{
            return responses.actionCompleteResponse(res, 'eng' || languageCode,loginRes, constants.responseMessageCode.ACTION_COMPLETE, constants.responseMessageCode.USER_REGISTRED);
        }
    }else{
        return responses.sendError(res, 'eng' || languageCode,{},  constants.responseMessageCode.NOT_PERMISSION_FOR_CREATE_USER,constants.responseMessageCode.INVALID_CREDENTIALS)
    }
    
} 
module.exports.GetUserDetailById = async(req,res)=>{
    if(req.body.roleId == 1 ){
        let db = await dbConnectHelper.getConnectionDefault();
        let loginRes = await adminDB_Helper.GetUserDetailById(db,req.body);
        if(loginRes.statusCode == 400 ){
            return responses.sendError(res, 'eng' || languageCode,{},  constants.responseMessageCode.USER_ALREADY_EXISTS,constants.responseMessageCode.USER_ALREADY_EXISTS);       
        }    
        else{
            return responses.actionCompleteResponse(res, 'eng' || languageCode,loginRes, constants.responseMessageCode.ACTION_COMPLETE, constants.responseMessageCode.USER_REGISTRED);
        }
    }else{
        return responses.sendError(res, 'eng' || languageCode,{},  constants.responseMessageCode.NOT_PERMISSION_FOR_CREATE_USER,constants.responseMessageCode.INVALID_CREDENTIALS)
    }
    
} 
module.exports.GetStockReport = async(req,res)=>{
    if(req.body.roleId == 1 ){
        let db = await dbConnectHelper.getConnectionDefault();
        let loginRes = await adminDB_Helper.GetStockReport(db,req.body);
        if(loginRes.statusCode == 400 ){
            return responses.sendError(res, 'eng' || languageCode,{},  constants.responseMessageCode.USER_ALREADY_EXISTS,constants.responseMessageCode.USER_ALREADY_EXISTS);       
        }    
        else{
            return responses.actionCompleteResponse(res, 'eng' || languageCode,loginRes, constants.responseMessageCode.ACTION_COMPLETE, constants.responseMessageCode.USER_REGISTRED);
        }
    }else{
        return responses.sendError(res, 'eng' || languageCode,{},  constants.responseMessageCode.NOT_PERMISSION_FOR_CREATE_USER,constants.responseMessageCode.INVALID_CREDENTIALS)
    }
    
} 
module.exports.getOrderListForAdminToAssignManager = async(req,res)=>{
    if(req.body.roleId == 1 ){
        let db = await dbConnectHelper.getConnectionDefault();
        let loginRes = await adminDB_Helper.getOrderListForAdminToAssignManager(db,req.body);
        if(loginRes.statusCode == 400 ){
            return responses.sendError(res, 'eng' || languageCode,{},  constants.responseMessageCode.USER_ALREADY_EXISTS,constants.responseMessageCode.USER_ALREADY_EXISTS);       
        }    
        else{
            return responses.actionCompleteResponse(res, 'eng' || languageCode,loginRes, constants.responseMessageCode.ACTION_COMPLETE, constants.responseMessageCode.USER_REGISTRED);
        }
    }else{
        return responses.sendError(res, 'eng' || languageCode,{},  constants.responseMessageCode.NOT_PERMISSION_FOR_CREATE_USER,constants.responseMessageCode.INVALID_CREDENTIALS)
    }
    
} 
module.exports.AddSell = async(req,res)=>{
    if(req.body.roleId == 1 || req.body.roleId == 2 ){
        let db = await dbConnectHelper.getConnectionDefault();
        let loginRes = await adminDB_Helper.AddSell(db,req.body);
        if(loginRes.statusCode == 400 ){
            return responses.sendError(res, 'eng' || languageCode,{},  constants.responseMessageCode.USER_ALREADY_EXISTS,constants.responseMessageCode.USER_ALREADY_EXISTS);       
        }    
        else{
            return responses.actionCompleteResponse(res, 'eng' || languageCode,loginRes, constants.responseMessageCode.ACTION_COMPLETE, constants.responseMessageCode.USER_REGISTRED);
        }
    }else{
        return responses.sendError(res, 'eng' || languageCode,{},  constants.responseMessageCode.NOT_PERMISSION_FOR_CREATE_USER,constants.responseMessageCode.INVALID_CREDENTIALS)
    }
    
} 
module.exports.getCurrentAvailableSellProdcuts = async(req,res)=>{
    if(req.body.roleId == 1 || req.body.roleId == 2 ){
        let db = await dbConnectHelper.getConnectionDefault();
        let loginRes = await adminDB_Helper.getCurrentAvailableSellProdcuts(db,req.body);
        if(loginRes.statusCode == 400 ){
            return responses.sendError(res, 'eng' || languageCode,{},  constants.responseMessageCode.USER_ALREADY_EXISTS,constants.responseMessageCode.USER_ALREADY_EXISTS);       
        }    
        else{
            return responses.actionCompleteResponse(res, 'eng' || languageCode,loginRes, constants.responseMessageCode.ACTION_COMPLETE, constants.responseMessageCode.USER_REGISTRED);
        }
    }else{
        return responses.sendError(res, 'eng' || languageCode,{},  constants.responseMessageCode.NOT_PERMISSION_FOR_CREATE_USER,constants.responseMessageCode.INVALID_CREDENTIALS)
    }
    
} 
module.exports.GetSellListForGrid = async(req,res)=>{
    if(req.body.roleId == 1 || req.body.roleId == 2 ){
        let db = await dbConnectHelper.getConnectionDefault();
        let loginRes = await adminDB_Helper.GetSellListForGrid(db,req.body);
        if(loginRes.statusCode == 400 ){
            return responses.sendError(res, 'eng' || languageCode,{},  constants.responseMessageCode.USER_ALREADY_EXISTS,constants.responseMessageCode.USER_ALREADY_EXISTS);       
        }    
        else{
            return responses.actionCompleteResponse(res, 'eng' || languageCode,loginRes, constants.responseMessageCode.ACTION_COMPLETE, constants.responseMessageCode.USER_REGISTRED);
        }
    }else{
        return responses.sendError(res, 'eng' || languageCode,{},  constants.responseMessageCode.NOT_PERMISSION_FOR_CREATE_USER,constants.responseMessageCode.INVALID_CREDENTIALS)
    }
    
} 