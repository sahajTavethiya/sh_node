const express = require('express');
const router = express.Router();



const admin = require('./src/module/admin');
const employee = require('./src/module/employee');
const manager = require('./src/module/manager');
const common = require('./src/module/common');

router.use('/admin',admin);
router.use('/employee',employee);
router.use('/manager',manager);
router.use('/common',common)
// router.use('/trip',trip);
module.exports = router;