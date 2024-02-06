const express = require('express');
const router = express.Router();
const adminController = require('./controller/adminController');
const authHelper = require('../../util/auth/auth-helper');

// work type = 1 - job work
router.post('/login',adminController.login);
router.post('/addUser',authHelper.verifyUserToken,adminController.addUser); // want to add createdBy
router.post('/addOrder',authHelper.verifyUserToken,adminController.addOrder);// want to ask by SizeId , colourId
router.post('/addClient',authHelper.verifyUserToken,adminController.addClient);
//this api is not complete
router.post('/assignTaskToEmplyee',authHelper.verifyUserToken,adminController.assignTaskToEmployee);
router.post('/getNoOfPiecewantToAssign',authHelper.verifyUserToken,adminController.getNoOfPiecewantToAssign)
router.post('/addStock',authHelper.verifyUserToken,adminController.addStock);
// this api is use for get List which is Assigned (By OrderId And userId)
router.post('/getAssignListByOrderId',authHelper.verifyUserToken,adminController.getAssignListByOrderId);
router.get('/getOrderListForAdminToAssignManager',authHelper.verifyUserToken,adminController.getOrderListForAdminToAssignManager)
router.post('/OrderReport',authHelper.verifyUserToken,adminController.OrderReport);
router.post('/GetOrderDetailById',authHelper.verifyUserToken,adminController.GetOrderDetailById);
router.post('/GetClientReport',authHelper.verifyUserToken,adminController.GetClientReport);
router.post('/GetUserReport',authHelper.verifyUserToken,adminController.UserReport);
router.post('/GetUserDetailById',authHelper.verifyUserToken,adminController.GetUserDetailById);
router.post('/GetStockReport',authHelper.verifyUserToken,adminController.GetStockReport);
router.post('/AddSell',authHelper.verifyUserToken,adminController.AddSell);
router.post('/getCurrentAvailableSellProdcuts',authHelper.verifyUserToken,adminController.getCurrentAvailableSellProdcuts);
router.post('/GetSellListForGrid',authHelper.verifyUserToken,adminController.GetSellListForGrid);


module.exports = router;

