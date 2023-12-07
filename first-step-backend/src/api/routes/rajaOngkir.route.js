const express = require('express');
const {getProvinceList, getCityList} = require('../controllers/rajaOngkir.controller');
const router = express.Router();

router.get('/provinces', getProvinceList);
router.get('/city', getCityList);
router.post('/city', getCityList);


module.exports = router;