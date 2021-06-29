var express = require('express');
var router = express.Router();

const { validaResponseData } = require('../helper/validator');
const { filterData } = require('../controller');

router.route('/').post(validaResponseData, filterData);

module.exports = router;
