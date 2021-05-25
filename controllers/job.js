const Job = require("../models/jobs");
const Application = require("../models/application");
const uuidv5 = require("uuid/v5");

var JobController = {};

JobController.getJobs = async (req, res, next) => {
  try {
    let data = await Job.find();
    if (!data) {
      res.json({
        success: false,
        applications: "No Jobs Found",
      });
    }
    res.json({
      success: true,
      Jobs: data,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      err: error,
    });
  }
};
JobController.getPostedJob = async (req, res, next) => {
  try {
    let recruiterEmail = req.body.recruiterEmail;
    let jobs = await Job.find({ recruiterEmail: recruiterEmail });
    res.json({
      success: true,
      Jobs: jobs,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      err: error,
    });
  }
};

JobController.newJob = async (req, res, next) => {
  try {
    const {recruiterName,recruiterEmail,description} = req.body;
    let jobId = uuidv5(recruiterName + description,uuidv5.DNS).replace(/-/g, "");
    const newJob = new Job({
      jobId : jobId,
      recruiterName: recruiterName,
      recruiterEmail: recruiterEmail,
      title: req.body.title,
      description: description,
      salary: req.body.salary,
      skills: req.body.skills,
    });

    await newJob.save();

    res.json({
      success: true,
      msg: "New Job created Succefully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      err: error,
    });
  }
};

JobController.acceptOrReject = async(req,res,next) => {
  try {
      let email = req.body.email;
      let recruiterName = req.body.recruiterName;
      let jobId = req.body.jobId;
      let response = req.body.response;
      let applicantId = uuidv5(email + recruiterName,uuidv5.DNS).replace(/-/g, "");
      if(response == "1"){
          let data = await Application.findOneAndUpdate({applicantId : applicantId},{status: "Accepted"});
          let update  = await Job.findOneAndUpdate({jobId:jobId},{status: "Closed"});

          res.json({
            msg:"Application accepted by the recruiter"
          })
      }
      else if(response == "0"){
          let data = await Application.findOneAndUpdate({applicantId : applicantId},{status : "Rejected"});
          res.json({
            msg:"Application rejected by the recruiter"
          })
      }

  } catch (error) {
      console.log(error);
      res.json({
          success : false,
          err : error
      })
  }
}
module.exports = JobController;