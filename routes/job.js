var express = require("express");
var router = express.Router();

const controller = require('../controllers/job');

router.get("/", controller.getJobs);

router.post("/posted/jobs", controller.getPostedJob);

router.post("/add/new-job",controller.newJob);

router.post("/result",controller.acceptOrReject);

module.exports = router;
