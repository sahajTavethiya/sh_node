const express = require('express');
const router = express.Router();
const commonController = require('./controller/commonController');
const adminController = require('../admin/controller/adminController');

const authHelper = require('../../util/auth/auth-helper');

router.post('/getByCategory',authHelper.verifyUserToken,commonController.getByCategory);

module.exports = router;
