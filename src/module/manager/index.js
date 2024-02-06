const express = require('express');
const router = express.Router();
const managerController = require('./controller/managerController');
const authHelper = require('../../util/auth/auth-helper');

const adminController = require('../admin/controller/adminController');
const employeeController = require('../employee/controller/employeeController');

router.get('/getTaskList',authHelper.verifyUserToken,employeeController.getTaskList);  
router.post('/assignTaskToEmployee',authHelper.verifyUserToken,adminController.assignTaskToEmployee);
router.post('/getNoOfPiecewantToAssign',authHelper.verifyUserToken,adminController.getNoOfPiecewantToAssign);
router.post('/saveDailyWork',authHelper.verifyUserToken,managerController.saveDailyWork);
router.post('/getOrderListToAssignEmployee',authHelper.verifyUserToken,managerController.getOrderListToAssignEmployee);
router.post('/getTotalSubmitWorkDetailByOrderId',authHelper.verifyUserToken,managerController.getTotalSubmitWorkDetailByOrderId)


// ------- FOR work type 2 - manufacture
// -- made product will add
router.post("/addProduction",authHelper.verifyUserToken,managerController.addProduction);
router.post("/getProductionDataFromOrderId",authHelper.verifyUserToken,managerController.getProductionDataFromOrderId);
//Old
//router.post("/addSelledProduct",authHelper.verifyUserToken,managerController.addSelledProduct)
router.post("/addSell",authHelper.verifyUserToken,managerController.addSell); // In thi api we will save data of sell, and make invoice for it.
router.post("/generateInvoiceOfSell",authHelper.verifyUserToken,managerController.generateInvoiceOfSell)
router.post("/generateInvoicePDF",managerController.generateInvoicePdf)
module.exports = router;