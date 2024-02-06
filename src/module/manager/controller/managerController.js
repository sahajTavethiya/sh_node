const dbConnectHelper = require('../../../database/dbconnection');
const manager_Helper = require('../../../dbHelper/manager-db-helper');
const responses = require('../../../util/responses');
const constants = require('../../../util/constants');
const authHelper = require('../../../util/commonFunctions')
const fs = require('fs');
const path = require('path');
const pdfCreator = require('pdf-creator-node');
module.exports.saveDailyWork = async(req,res)=>{
    try {

    let db = await dbConnectHelper.getConnectionDefault();
    let loginRes = await manager_Helper.saveDailyWork(db,req.body);
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
        return responses.actionCompleteResponse(res, 'eng' || languageCode,loginRes,"Task get Successfully.", constants.responseMessageCode.ACTION_COMPLETE)
    }}
    catch (error) {
      console.log(error);  
    }
};


module.exports.addProduction = async(req,res)=>{
    let db = await dbConnectHelper.getConnectionDefault();
    if(req.body.roleId == 1 || req.body.roleId == 2){
    let addedProducts = await manager_Helper.addProduction(db,req.body);
    console.log(addedProducts)
    
    if(addedProducts.statusCode == 200){
        return responses.actionCompleteResponse(res, 'eng' || languageCode,addedProducts, constants.responseMessageCode.PRODUCTION_DATA_GET_SUCCESSFULLY, constants.responseMessageCode.ACTION_COMPLETE)
    }else{
        return responses.sendError(res, 'eng' || languageCode,addedProducts, constants.responseMessageCode.ERROR_IN_EXECUTION, constants.responseMessageCode.ERROR_IN_EXECUTION)
    }
    }else{
        return responses.sendError(res, 'eng' || languageCode,{},  constants.responseMessageCode.NOT_PERMISSION_FOR_THIS_FUNCTIONALITY,constants.responseMessageCode.INVALID_CREDENTIALS)
    }
    // if(loginRes){
    //     return responses.actionCompleteResponse(res, 'eng' || languageCode,addedProducts,"Task get Successfully.", constants.responseMessageCode.ACTION_COMPLETE)
    // }
};

module.exports.addSell = async(req,res)=>{
    try {       
    
    let db = await dbConnectHelper.getConnectionDefault();
    if(req.body.roleId == 1 || req.body.roleId == 2){
    let addedSell = await manager_Helper.addSell(db,req.body);    
    console.log("selledData",addedSell);
    if(addedSell.statusCode == 200){
        let db = await dbConnectHelper.getConnectionDefault();
        let reqObj = {
            SellingMasterId : addedSell.SellingMasterId
        } 
        let DataForInvoice = await manager_Helper.getDataForMakeInvoiceForManufacture(db,reqObj);
        console.log("its invoice Data",DataForInvoice)
        return responses.actionCompleteResponse(res, 'eng' || languageCode,addedSell, constants.responseMessageCode.PRODUCTION_DATA_GET_SUCCESSFULLY, constants.responseMessageCode.ACTION_COMPLETE)
    }else{
        return responses.sendError(res, 'eng' || languageCode,addedSell, constants.responseMessageCode.ERROR_IN_EXECUTION, constants.responseMessageCode.ERROR_IN_EXECUTION)
    }
    }else{
        return responses.sendError(res, 'eng' || languageCode,{},  constants.responseMessageCode.NOT_PERMISSION_FOR_THIS_FUNCTIONALITY,constants.responseMessageCode.INVALID_CREDENTIALS)
    }
} catch (error) {
        console.log("error",error)
}
};
module.exports.generateInvoiceOfSell = async(req,res)=>{
    try {
        
    
    let db = await dbConnectHelper.getConnectionDefault();
    if(req.body.roleId == 1 || req.body.roleId == 2){
        let DataForInvoice = await manager_Helper.getDataForMakeInvoiceForManufacture(db,req.body); 
    if(DataForInvoice.errorMSG == null){        
        console.log("its invoice Data",DataForInvoice)





        return responses.actionCompleteResponse(res, 'eng' || languageCode,DataForInvoice, constants.responseMessageCode.PRODUCTION_DATA_GET_SUCCESSFULLY, constants.responseMessageCode.ACTION_COMPLETE)
    }else{
        return responses.sendError(res, 'eng' || languageCode,DataForInvoice, constants.responseMessageCode.ERROR_IN_EXECUTION, constants.responseMessageCode.ERROR_IN_EXECUTION)
    }
    }else{
        return responses.sendError(res, 'eng' || languageCode,{},  constants.responseMessageCode.NOT_PERMISSION_FOR_THIS_FUNCTIONALITY,constants.responseMessageCode.INVALID_CREDENTIALS)
    }
} catch (error) {
        console.log("error",error)
}
};

module.exports.getProductionDataFromOrderId = async(req,res)=>{
    let db = await dbConnectHelper.getConnectionDefault();
    if(req.body.roleId == 1 || req.body.roleId == 2){
    let addedProducts = await manager_Helper.getProductionDataFromOrderId(db,req.body);
    console.log(addedProducts)
    
    if(addedProducts){
        return responses.actionCompleteResponse(res, 'eng' || languageCode,addedProducts, constants.responseMessageCode.PRODUCTION_DATA_GET_SUCCESSFULLY, constants.responseMessageCode.ACTION_COMPLETE)
    }else{
        return responses.sendError(res, 'eng' || languageCode,addedProducts, constants.responseMessageCode.ERROR_IN_EXECUTION, constants.responseMessageCode.ERROR_IN_EXECUTION)
    }
    }else{
        return responses.sendError(res, 'eng' || languageCode,{},  constants.responseMessageCode.NOT_PERMISSION_FOR_THIS_FUNCTIONALITY,constants.responseMessageCode.INVALID_CREDENTIALS)
    }
    // if(loginRes){
    //     return responses.actionCompleteResponse(res, 'eng' || languageCode,addedProducts,"Task get Successfully.", constants.responseMessageCode.ACTION_COMPLETE)
    // }
};
module.exports.addSelledProduct = async(req,res)=>{
    let db = await dbConnectHelper.getConnectionDefault();
    if(req.body.roleId == 1 || req.body.roleId == 2){
    let selledProducts = await manager_Helper.addSelledProduct(db,req.body);
    console.log(addedProducts)
    
    if(selledProducts.statusCode == 200){
        return responses.actionCompleteResponse(res, 'eng' || languageCode,selledProducts, constants.responseMessageCode.MANUFACTURED_ITEM_SUCCESSFULLY, constants.responseMessageCode.ACTION_COMPLETE)
    }else{
        return responses.sendError(res, 'eng' || languageCode,selledProducts, constants.responseMessageCode.ERROR_IN_EXECUTION, constants.responseMessageCode.ERROR_IN_EXECUTION)
    }
    }else{
        return responses.sendError(res, 'eng' || languageCode,{},  constants.responseMessageCode.NOT_PERMISSION_FOR_THIS_FUNCTIONALITY,constants.responseMessageCode.INVALID_CREDENTIALS)
    }
    // if(loginRes){
    //     return responses.actionCompleteResponse(res, 'eng' || languageCode,addedProducts,"Task get Successfully.", constants.responseMessageCode.ACTION_COMPLETE)
    // }
};
module.exports.getOrderListToAssignEmployee = async(req,res)=>{
    if(req.body.roleId == 2 ){
        let db = await dbConnectHelper.getConnectionDefault();
        let loginRes = await manager_Helper.getOrderListToAssignEmployee(db,req.body);
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
module.exports.getTotalSubmitWorkDetailByOrderId = async(req,res)=>{
    if(req.body.roleId == 2 ){
        let db = await dbConnectHelper.getConnectionDefault();
        let loginRes = await manager_Helper.getTotalSubmitWorkDetailByOrderId(db,req.body);
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
module.exports.generateInvoicePdf = () =>{
    // Example data
const data = {
    customerName: 'sahaj patel',
    content: 'This is an example of setting dynamic data in a PDF using Node.js.',
  };
  
  // Create a PDF from the template and data
  const options = {
    format: 'A4',
    orientation: 'portrait',
  };
    // Get the full path to the HTML template file
    const templatePath = path.join(__dirname, '../../../util/template/invoice.html');

    // Read the HTML template content
    const htmlTemplate = fs.readFileSync(templatePath, 'utf8');


let Array = [{
    productName : "cloth",
    hsnCode : 456789,
    quantity : 45,
    rate : 28.04
},{
    productName : "cloth",
    hsnCode : 456789,
    quantity : 45,
    rate : 28.04
}]
    const tableRows = Array.map(item => `
    <tr>
      <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #0EADF0; line-height: 18px; vertical-align: top; padding:10px 0;" class="article">${item.productName}</td>
      <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #646a6e; line-height: 18px; vertical-align: top; padding:10px 0;"><small>${item.hsnCode}</small></td>
      <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #646a6e; line-height: 18px; vertical-align: top; padding:10px 0;" align="center">${item.quantity}</td>
      <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #1e2b33; line-height: 18px; vertical-align: top; padding:10px 0;" align="right">${item.rate.toFixed(2)}</td>
    </tr>
    <tr>
      <td height="1" colspan="4" style="border-bottom:1px solid #e4e4e4"></td>
    </tr>
  `).join('');
console.log("tableRows",tableRows);
  const document = {
    html: htmlTemplate,
    data: {
      customerName: data.customerName,
      customerAddress : " C/o ,ASHTHA HOSPOTAL.OPP SARDAR BAUG.SANAIA ROAD MORBI-363641",
      customerPhone : "09898904690",
      customerGST : "24BKIPK8812P1ZM",
      invoiceNo : 1,
      date : "MARCH 4TH 2018",
      itemsTable : tableRows
    },
    path: 'output.pdf',
  };
  
  pdfCreator.create(document, options)
  .then(res => {
    console.log(res);
  })
  .catch(error => {
    console.error(error);
  });
}
