const express = require('express');
const  verifEmailController  = require('../controllers/verifEmailController'); 

const router = express.Router();

router.post('/verifEmail', verifEmailController);

module.exports = router;
