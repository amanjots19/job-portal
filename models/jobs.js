const mongoose = require('mongoose')
const Schema = mongoose.Schema

const jobSchema = new Schema({
    jobId : String,
    recruiterName: {
        type: String,
    },
    recruiterEmail: {
        type: String,
    },
    title: {
        type: String,
        //required: true
    },
    description: {
        type: String,
    },
    status : {
        type:String,
        default : "Open"
    },
    salary: {
        type: Number,
    },
    skills: {
        type: [String],
        //required: true
    },
    dateOfPost: {
        type: Date,
        default: new Date()
    }
});

module.exports = Job =  mongoose.model('Job', jobSchema)