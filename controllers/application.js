const Application = require("../models/application");
const uuidv5 = require('uuid/v5');

var applicationController = {};

applicationController.getApplications = async (req,res) => {
    try{
        let email = req.body.email;
        let data = await Application.find({email : email});
        if(!data){
            res.json({
                success : false,
                applications : "No Applications Found" 
            })
        }
        res.json({
            success : true,
            applications : data
        })
    }
    catch(err){
        console.log(err);
        res.json({
            success : false,
            err : err
        })
    }
}

applicationController.addApplication = async (req,res,next) => {
    try {
        const{recruiterName,email,description} = req.body;
        let applicantId = uuidv5(email + recruiterName,uuidv5.DNS).replace(/-/g, "");
        const newApplication = new Application({
            email : email,
            applicantId: applicantId,
            recruiterEmail: req.body.recruiterEmail,
            salary: req.body.salary,
            recruiterName: recruiterName,
            description:description
        });
    
        await newApplication.save()
        res.json({
            success:true,
            msg : "Application succesfully submitted"
        })
    } catch (error) {
        console.log(error);
        res.json({
            success : false,
            err : error
        })
    }
}

applicationController.delete = async (req,res,next) => {
    try {
        console.log('hello')
        let email = req.body.email;
        let recruiterName = req.body.recruiterName;
        let applicantId = uuidv5(email + recruiterName,uuidv5.DNS).replace(/-/g, "");
        await Application.findOneAndDelete({applicantId: applicantId});

        res.json({
            success:true,
            msg:"Application DELETED Successfully"
        })
        
    } catch (error) {
        console.log(error);
        res.json({
            success : false,
            err : error
        })
    }
}

module.exports = applicationController;