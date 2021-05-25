var express = require("express");
var router = express.Router();

const controller = require('../controllers/application');

router.post('/getAll',controller.getApplications);

router.post('/add_application', controller.addApplication);

router.post("/delete", controller.delete)

module.exports = router;