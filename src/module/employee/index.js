const express = require('express');
const router = express.Router();
const employeeController = require('./controller/employeeController');
const adminController = require('../admin/controller/adminController');

const authHelper = require('../../util/auth/auth-helper');


router.get('/getTaskList',authHelper.verifyUserToken,employeeController.getTaskList);
router.post('/getRemainingWorkFromTaskId',authHelper.verifyUserToken,employeeController.getRemainingWorkByTaskId);


// router.post('/assignTaskToEmplyee',authHelper.verifyUserToken,adminController.assignTaskToEmployee);
// router.post('/getNoOfPiecewantToAssign',authHelper.verifyUserToken,adminController.getNoOfPiecewantToAssign);
// router.post('/saveDailyWorkStatus',authHelper.verifyUserToken,employeeController.saveDailyWork)
// router.post('/startWork',employeeController.login);

// router.post('/getRemainingTaskById',employeeController.login);

module.exports = router;